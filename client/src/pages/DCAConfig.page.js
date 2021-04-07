import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron, Container } from 'reactstrap'
import BalancerTable from "../components/balancer.table";

export default function DCAConfig() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const resp1 = await axios.get('api/balancer');
      setResult(resp1.data);
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
          <Input type="checkbox" name="enable-bot-check" id="enable-bot-check" />
          <Label for="enable-bot-check" check>Enable bot</Label>
        </FormGroup>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="amount-to-spend">Amount to spend</Label>
              <Input type="number" name="amount-to-spend" id="amount-to-spend" placeholder="100" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="currency-to-spend">Currency to spend</Label>
              <Input type="text" name="currency-to-spend" id="currency-to-spend" placeholder="EUR" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="buying-frequency">Buying frequency</Label>
              <Input type="select" name="select" id="buying-frequency">
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Monthly</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="exchange-to-use">Exchange to use</Label>
              <Input type="select" name="select" id="exchange-to-use">
                <option value="1">Binance</option>
                <option value="2">Coinbase</option>
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
                <option value="1">Top 5 crypto by market cap</option>
                <option value="2">Selected cryptos</option>
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
      <BalancerTable data={result} loading={loading} />
    </>
  )
}