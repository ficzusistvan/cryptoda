import axios from "axios";
import { _fetchData } from "ethers/lib/utils";
import { useEffect, useState } from "react"
import { Row, Col, Button } from 'reactstrap'
import Zabo from 'zabo-sdk-js'
import config from '../config.json'

export default function Portfolio() {
  const [wallets, setWallets] = useState();
  const [cexes, setCexes] = useState();
  const [egld, setEgld] = useState();
  const [waves, setWaves] = useState();
  const [blockfi, setBlockfi] = useState();

  let zabo;

  const THIS_USER = 'myliveuser';
  //const THIS_USER = 'mysandboxuser';

  useEffect(() => {
    const getData = async () => {
      const walletsData = await axios.get('api/portfolio/wallets');
      console.log(walletsData.data);
      setWallets(walletsData.data);
      const cexesData = await axios.get('api/portfolio/cexes');
      console.log(cexesData.data);
      setCexes(cexesData.data);
      const egldData = await axios.get('api/portfolio/elrond');
      console.log(egldData.data);
      setEgld(egldData.data);
      const wavesData = await axios.get('api/portfolio/waves');
      console.log(wavesData.data);
      setWaves(wavesData.data);
      const respUserExists = await axios.get(`api/zabo/zabo-user-exists?userId=${THIS_USER}`);
      if (!respUserExists.data) {
        zabo = await Zabo.init({
          //clientId: config.zabo.sandbox.clientId,
          //env: 'sandbox'
          clientId: config.zabo.live.clientId,
          env: 'live'
        });
      } else {
        const respBalances = await axios.get(`api/zabo/balance?userId=${THIS_USER}`);
        setBlockfi(respBalances.data);
      }
    }
    getData();
  }, []);

  function zaboConnectToProvider(e) {
    zabo.connect({ provider: 'blockFi' }).onConnection(async (account) => {
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