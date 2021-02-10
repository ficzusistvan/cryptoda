import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TestRedux from '../redux/containers/test.redux';
import { Row, Col } from 'reactstrap';
import './Main.layoutpart.css';
import RatesPage from '../pages/Rates.page';
import PortfolioPage from '../pages/Portfolio.page';

const MainLayoutPart = () => (
  <Row className='main'>
    <Col>
      <Switch>
        <Route exact path='/rates' component={RatesPage} />
        <Route exact path='/portfolio' component={PortfolioPage} />
      </Switch>
    </Col>
  </Row>
)

export default MainLayoutPart;