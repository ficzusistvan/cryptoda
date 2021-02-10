import React from 'react';
import MainLayoutPart from './layout-parts/Main.layoutpart';
import { Container, Row, Col } from 'reactstrap';
import LeftSidebarRedux from './redux/containers/test.redux';
import LeftSidebarLayoutPart from './layout-parts/LeftSidebar.layoutpart';

const App = () => (
  <div>
    <Container fluid={true} >
      <Row>
        <Col sm="2">
          <LeftSidebarLayoutPart />
        </Col>
        <Col sm="10">
          <MainLayoutPart />
        </Col>
      </Row>
    </Container>
  </div>
)

export default App;