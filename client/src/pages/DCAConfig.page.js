import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron, Container } from 'reactstrap'
import BalancerTable from "../components/balancer.table";
import { useAuth0 } from "@auth0/auth0-react";

export default function DCAConfig() {
  const [config, setConfig] = useState({});
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const resp1 = await axios.get(`api/dca/config/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp1.data);
      setConfig(resp1.data.dcaConfig);
      setEntries(resp1.data.entries);
    }
    getData();
    setLoading(false);
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>Fiat currency cost averaging configuration</h1>
        </Col>
      </Row>
      <Form>
        <h3>Configure bot</h3>
        <FormGroup check>
          <Input type="checkbox" name="enable-bot-check" id="enable-bot-check" checked={config.is_enabled} />
          <Label for="enable-bot-check" check>Enable bot</Label>
        </FormGroup>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="amount-to-spend">Amount to spend</Label>
              <Input type="number" name="amount-to-spend" id="amount-to-spend" value={config.amount_to_spend} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="currency-to-spend">Currency to spend</Label>
              <Input type="text" name="currency-to-spend" id="currency-to-spend" value={config.currency_to_spend} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="buying-frequency">Buying frequency</Label>
              <Input type="text" name="buying-frequency" id="buying-frequency" value={config.buying_frequency} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="exchange-to-use">Exchange to use</Label>
              <Input type="select" name="select" id="exchange-to-use">
                <option value="binance" selected={config.exchange_to_use === 'binance'}>Binance</option>
                <option value="coinbase" selected={config.exchange_to_use === 'coinbase'}>Coinbase</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <h3>Configure buying strategy</h3>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="strategy">Select strategy:</Label>
              <Input type="select" name="select" id="strategy">
                <option value="top 5 crypto by market cap" selected={config.strategy_to_use === 'top 5 crypto by market cap'}>Top 5 crypto by market cap</option>
                <option value="selected cryptos" selected={config.strategy_to_use === 'selected cryptos'}>Selected cryptos</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={3}>
            <Button block color="primary">Save configuration</Button>
          </Col>
        </Row>
      </Form>
      <h4>Strategy current result:</h4>
      <BalancerTable data={entries} loading={loading} />
    </>
  )
}