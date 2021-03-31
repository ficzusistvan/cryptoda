import axios from "axios";
import { React, useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Row, Col, Button, Jumbotron } from 'reactstrap'
import NumberFormat from 'react-number-format';
import WalletsTable from '../components/wallets.table';

import "react-datepicker/dist/react-datepicker.css";

export default function WalletsConfig() {

  const USER = `myliveuser`;

  const [loading, setLoading] = useState(false)
  const [userWallets, setUserWallets] = useState([])
  const [supportedWallets, setSupportedWallets] = useState([])

  const [originalData] = useState(userWallets)
  const [skipPageReset, setSkipPageReset] = useState(false)

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const resp = await axios.get(`api/wallet/user/${USER}`);
      console.log(resp.data);
      setUserWallets(resp.data);
    }
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const resp = await axios.get(`api/wallet/supported`);
      setSupportedWallets(resp.data);
    }
    getData();
    setLoading(false);
  }, []);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setUserWallets(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false)
  }, [userWallets])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setUserWallets(originalData)

  return (
    <>
      <Row>
        <Col>
          <h1>WalletPage</h1>
        </Col>
      </Row>
      <Row>
        <button onClick={resetData}>Reset Data</button>
      </Row>
      <WalletsTable
        data={userWallets}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Row>
        <Col>
          {JSON.stringify(userWallets)};
        </Col>
        <Col>
          {JSON.stringify(supportedWallets)};
        </Col>
      </Row>
    </>
  )
}