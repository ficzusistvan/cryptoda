import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Row, Col, Button } from 'reactstrap'
import Zabo from 'zabo-sdk-js'
import config from '../config.json'

export default function Portfolio() {
  const [wallets, setWallets] = useState();
  const [cexes, setCexes] = useState();
  const [egld, setEgld] = useState();
  const [waves, setWaves] = useState();
  const [blockfi, setBlockfi] = useState();
  const [userExists, setUserExists] = useState(false);
  const [portfolioCoins, setPortfolioCoins] = useState([]);

  const THIS_USER = 'myliveuser';
  //const THIS_USER = 'mysandboxuser';

  let zabo = useRef();

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    const getData = async () => {
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(`useEffect 2 called...`);
    const getData = async () => {
      const respUserExists = await axios.get(`api/zabo/zabo-user-exists?userId=${THIS_USER}`);
      setUserExists(respUserExists.data ? true : false);
      if (!respUserExists.data) {
        console.log('init zabo')
        zabo.current = await Zabo.init({
          //clientId: config.zabo.sandbox.clientId,
          //env: 'sandbox'
          clientId: config.zabo.live.clientId,
          env: 'live'
        });
      } else {
        console.log('get balances')
        const respBalances = await axios.get(`api/zabo/balance?userId=${THIS_USER}`);
        setBlockfi(respBalances.data);
        /*for (const [symbol, value] of Object.entries(blockfi)) {
          if (!portfolioCoins.includes(symbol.toUpperCase())) {
            setPortfolioCoins(portfolioCoins => [...portfolioCoins, symbol.toUpperCase()]);
          }
        }*/
      }
    }
    getData();
  }, []);

  function zaboConnectToProvider(e) {
    zabo.current.connect({ provider: 'blockFi' }).onConnection(async (account) => {
      const respZaboUser = await axios.post('api/zabo/create-zabo-user', { userId: THIS_USER, account: account });
      console.log('Created user: ', respZaboUser.data);
      const respBalances = await axios.get(`api/zabo/balance?userId=${THIS_USER}`);
      setBlockfi(respBalances.data);
    }).onError(error => {
      console.error('account connection error:', error)
    })
  }

  return (
    <>
      <div>Coins: {portfolioCoins.join(',')}</div>
      <Row>
        <Col>
          <h1>Current Portfolio</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Wallets: {JSON.stringify(wallets)}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Cexes: {JSON.stringify(cexes)}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Elrond: {JSON.stringify(egld)}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Waves: {JSON.stringify(waves)}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          {blockfi && <div>BlockFi: {JSON.stringify(blockfi)}</div>}
          {!blockfi && <Button color="primary" onClick={zaboConnectToProvider}>Connect to Zabo for BlockFi access</Button>}
        </Col>
      </Row>
    </>
  )
}