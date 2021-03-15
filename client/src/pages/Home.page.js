import axios from "axios";
import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron } from 'reactstrap'
//import config from '../config.json'
import InvestmentsTable from '../components/investmentsTable'
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  
  return (
    <>
      <Row>
        <Col>
          <h1>HomePage</h1>
        </Col>
      </Row>
    </>
  )
}