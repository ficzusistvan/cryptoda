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
import ProtectedRoute from '../auth/protected-route';
import ProfilePage from '../pages/Profile.page';

const Main = () => (
  <Row className='main'>
    <Col>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/rates' component={RatesPage} />
        <ProtectedRoute exact path='/portfolio' component={PortfolioPage} />
        <ProtectedRoute exact path='/portfolio-history' component={PortfolioHistoryPage} />
        <ProtectedRoute exact path='/investments' component={InvestmentsPage} />
        <ProtectedRoute exact path='/dca-config' component={DCAConfigPage} />
        <ProtectedRoute exact path='/wallets-config' component={WalletsConfigPage} />
        <ProtectedRoute exact path='/profile' component={ProfilePage} />
      </Switch>
    </Col>
  </Row>
)

export default Main;