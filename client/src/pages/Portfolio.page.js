import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Row, Col, Button } from 'reactstrap'
import Zabo from 'zabo-sdk-js'
import config from '../config.json'
import PortfolioTable from '../components/portfolioTable'
import NumberFormat from 'react-number-format';

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const THIS_USER = 'myliveuser';
  //const THIS_USER = 'mysandboxuser';

  let zabo = useRef();

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const resp = await axios.get('api/portfolio');
      let portf = [], tot = 0;
      for (const entity of resp.data) {
        const wallet = entity[0];
        let balances = entity[1];
        for (let balance of Object.values(balances)) {
          balance['wallet'] = wallet;
          portf.push(balance);
          tot += Number(balance.value);
        }
      }
      setPortfolio(portf);
      setTotal(tot);
    }
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`useEffect 2 called...`);
    const getData = async () => {
      // TODO: fix this, now zabo user is recreated every time the button is clicked
      //const respUserExists = await axios.get(`api/zabo/zabo-user-exists?userId=${THIS_USER}`);
      //if (!respUserExists.data) {
        console.log('init zabo')
        zabo.current = await Zabo.init({
          //clientId: config.zabo.sandbox.clientId,
          //env: 'sandbox'
          clientId: config.zabo.live.clientId,
          env: 'live'
        });
      //}
    }
    getData();
  }, []);

  function zaboConnectToProvider(e) {
    zabo.current.connect({ provider: 'blockFi' }).onConnection(async (account) => {
      const respZaboUser = await axios.post('api/zabo/create-zabo-user', { userId: THIS_USER, account: account });
      console.log('Created user: ', respZaboUser.data);
      const forcePortfolioUpdateResp = await axios.post('/api/portfolio', {});
      console.log('Portfolio update run');
    }).onError(error => {
      console.error('account connection error:', error)
    })
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Current Portfolio</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={zaboConnectToProvider}>Connect to Zabo for BlockFi access</Button>
        </Col>
      </Row>
      <PortfolioTable data={portfolio} loading={loading} />
      <Row>
        <Col>
          <span>Total balance: </span>
          <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
        </Col>
      </Row>
    </>
  )
}