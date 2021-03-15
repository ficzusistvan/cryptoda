import React from 'react';
import LeftSidebarRedux from './redux/containers/test.redux';
import { Container, Row, Col } from 'reactstrap';
import Main from './layout-parts/Main';
import Navigation from './layout-parts/Navigation';
import ContextMenu from './layout-parts/ContextMenu';

const App = () => (
  <div>
    <Navigation />
    <Container fluid={true} >
      <Row>
        <Col sm="2">
          <ContextMenu />
        </Col>
        <Col sm="10">
          <Main />
        </Col>
      </Row>
    </Container>
  </div>
)

export default App;