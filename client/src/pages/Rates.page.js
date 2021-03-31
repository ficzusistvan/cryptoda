import { React, useCallback, useRef, useState } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'
import RatesTable from '../components/rates.table'

export default function RatesComponent() {

  const [listingsData, setListingsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const fetchIdRef = useRef(0)

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true);
    const listings = await axios.get('api/rates', {
      params: {
        pageIndex,
        pageSize
      }
    });
    setListingsData(listings.data);
    setPageCount(Math.ceil(1000 / pageSize));
    setLoading(false);
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>Today's Cryptocurrency Prices by Market Cap</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <RatesTable data={listingsData} fetchData={fetchData} loading={loading} pageCount={pageCount} />
        </Col>
      </Row>
    </>
  )
}