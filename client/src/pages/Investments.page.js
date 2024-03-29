import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron } from 'reactstrap'
import InvestmentsTable from '../components/investments.table'
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";

import "react-datepicker/dist/react-datepicker.css";

export default function Investments() {
  const [investments, setInvestments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [to, setTo] = useState('binance');
  const [investmentDate, setInvestmentDate] = useState(new Date());
  const [addInvestmentResponse, setAddInvestmentResponse] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  const addInvestment = async () => {
    const resp = await axios.post(`api/portfolio/investment/${user.sub}`, { amount: amount, currency: currency, to: to, timestamp: investmentDate })
    setAddInvestmentResponse(resp.data);
  }

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const resp1 = await axios.get('http://api.exchangeratesapi.io/latest?symbols=USD,EUR,RON&access_key=17881812858dd74e212685251cfffebf');
      console.log(resp1.data);
      const rates = resp1.data.rates;
      const token = await getAccessTokenSilently();
      const resp2 = await axios.get(`api/portfolio/investment/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let invs = [], tot = 0;
      for (const entity of resp2.data) {
        let inv = entity;
        let rate = rates[entity.currency] / rates['USD'];
        inv['inUSD'] = Number(entity.amount) / rate;
        invs.push(inv)
        tot += inv['inUSD'];
      }
      setInvestments(invs);
      setTotal(tot);
    }
    getData();
    setLoading(false);
  }, [addInvestmentResponse]);

  return (
    <>
      <Row>
        <Col>
          <h1>Investments</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="alert alert-success">
            Total invested: <strong><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></strong>
          </div>
        </Col>
      </Row>
      <InvestmentsTable data={investments} loading={loading} />
      <Jumbotron>
        <Form>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input type="number" name="amount" id="amount" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Currency</Label>
            <Input type="currency" name="text" id="currency" placeholder="EUR" value={currency} onChange={e => setCurrency(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="to">To</Label>
            <Input type="to" name="text" id="to" placeholder="Binance" value={to} onChange={e => setTo(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="investmentDate">Investment date</Label>
            <DatePicker selected={investmentDate} onChange={date => setInvestmentDate(date)} />
          </FormGroup>
          <Button onClick={addInvestment}>Add investment</Button>
        </Form>
      </Jumbotron>
    </>
  )
}