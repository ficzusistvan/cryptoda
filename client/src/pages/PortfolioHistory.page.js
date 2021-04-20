import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { Row, Col } from 'reactstrap'
import { Chart } from "react-charts";
import ResizableBox from "../components/ResizableBox";
import { LTTB } from 'downsample';
import { useAuth0 } from "@auth0/auth0-react";

export default function Portfolio() {
  const [historyInUsd, setHistoryInUsd] = useState([]);
  const [historyInEur, setHistoryInEur] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const THIS_USER = 'myliveuser';
  //const THIS_USER = 'mysandboxuser';

  useEffect(() => {
    console.log(`useEffect 1 called...`);
    setLoading(true);
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const resp = await axios.get('api/portfolio/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // in USD
      const origHistInUsd = resp.data.map(el => {
        return [el.timestamp, el.portfolio_in_USD ]
      });
      const downSampledHistInUsd = LTTB(origHistInUsd, 10);
      const chartHistInUsd = downSampledHistInUsd.map(el => {
        const thisDate = new Date(el[0]);
        thisDate.setMinutes(0);
        thisDate.setSeconds(0);
        thisDate.setMilliseconds(0);
        return { primary: thisDate, secondary: el[1] }
      });
      setHistoryInUsd(chartHistInUsd);
      // in EUR
      const origHistInEur = resp.data.map(el => {
        return [el.timestamp, el.portfolio_in_EUR ]
      });
      const downSampledHistInEur = LTTB(origHistInEur, 10);
      const chartHistInEur = downSampledHistInEur.map(el => {
        const thisDate = new Date(el[0]);
        thisDate.setMinutes(0);
        thisDate.setSeconds(0);
        thisDate.setMilliseconds(0);
        return { primary: thisDate, secondary: el[1] }
      });
      setHistoryInEur(chartHistInEur);
    }
    getData();
    setLoading(false);
  }, []);

  const data = useMemo(
    () => [
      {
        label: 'USD price',
        data: historyInUsd
      },
      {
        label: 'EUR price',
        data: historyInEur
      }
    ],
    [historyInUsd, historyInEur]
  )

  const series = useMemo(
    () => ({
      showPoints: true,
    }),
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <>
      <Row>
        <Col>
          <h1>Portfolio History</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {historyInUsd.length > 0 && historyInEur.length > 0 && <ResizableBox>
            <Chart data={data} series={series} axes={axes} tooltip />
          </ResizableBox>}
        </Col>
      </Row>
    </>
  )
}