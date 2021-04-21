import axios from "axios";
import { useEffect, useRef, useState, useMemo } from "react"
import { Row, Col, Button } from 'reactstrap'
//import Zabo from 'zabo-sdk-js'
import PortfolioTable from '../components/portfolio.table'
import NumberFormat from 'react-number-format';
import { useAuth0 } from "@auth0/auth0-react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalInUsd, setTotalInUsd] = useState(0);
  const [totalInEur, setTotalInEur] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  //let zabo = useRef();

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const resp = await axios.get(`api/portfolio/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let totInUsd = 0;
      let totInEur = 0;
      for (const entity of resp.data) {
        totInUsd += Number(entity.value_in_USD);
        totInEur += Number(entity.value_in_EUR);
      }
      setPortfolio(resp.data);
      setTotalInUsd(totInUsd);
      setTotalInEur(totInEur);
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
      //zabo.current = await Zabo.init({
        //clientId: config.zabo.sandbox.clientId,
        //env: 'sandbox'
      //  clientId: '',
      //  env: 'live'
      //});
      //}
    }
    getData();
  }, []);

  /*function zaboConnectToProvider(e) {
    zabo.current.connect({ provider: 'blockFi' }).onConnection(async (account) => {
      const respZaboUser = await axios.post('api/zabo/create-zabo-user', { userId: THIS_USER, account: account });
      console.log('Created user: ', respZaboUser.data);
      const forcePortfolioUpdateResp = await axios.post('/api/portfolio', {});
      console.log('Portfolio update run');
    }).onError(error => {
      console.error('account connection error:', error)
    })
  }*/

  return (
    <>
      <Row>
        <Col>
          <h1>Current Portfolio</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="alert alert-success">
            <p>Total balance in USD: <strong><NumberFormat value={totalInUsd} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></strong></p>
            <p>Total balance in Euro: <strong><NumberFormat value={totalInEur} displayType={'text'} thousandSeparator={true} suffix={' EUR'} decimalScale={2} /></strong></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {/*<Button color="primary" onClick={zaboConnectToProvider}>Connect to Zabo for BlockFi access</Button>*/}
        </Col>
      </Row>
      <PortfolioTable data={portfolio} loading={loading} />
    </>
  )
}