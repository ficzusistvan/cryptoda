import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron } from 'reactstrap'
//import config from '../config.json'
import InvestmentsTable from '../components/investmentsTable'
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Balancer() {
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
          <h1>Balancer</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="alert alert-success">
            {JSON.stringify(result)}
          </div>
        </Col>
      </Row>
    </>
  )
}