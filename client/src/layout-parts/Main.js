import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TestRedux from '../redux/containers/test.redux';
import { Row, Col } from 'reactstrap';
import './Main.css';
import HomePage from '../pages/Home.page';
import RatesPage from '../pages/Rates.page';
import PortfolioPage from '../pages/Portfolio.page';
import PortfolioHistoryPage from '../pages/PortfolioHistory.page';
import InvestmentsPage from '../pages/Investments.page';
import DCAConfigPage from '../pages/DCAConfig.page';
import WalletsConfigPage from '../pages/WalletsConfig.page';

const Main = () => (
  <Row className='main'>
    <Col>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/rates' component={RatesPage} />
        <Route exact path='/portfolio' component={PortfolioPage} />
        <Route exact path='/portfolio-history' component={PortfolioHistoryPage} />
        <Route exact path='/investments' component={InvestmentsPage} />
        <Route exact path='/dca-config' component={DCAConfigPage} />
        <Route exact path='/wallets-config' component={WalletsConfigPage} />
      </Switch>
    </Col>
  </Row>
)

export default Main;