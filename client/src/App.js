import React from 'react';
import LeftSidebarRedux from './redux/containers/test.redux';
import { Container, Row, Col } from 'reactstrap';
import Main from './layout-parts/Main';
import Navigation from './layout-parts/Navigation';
import ContextMenu from './layout-parts/ContextMenu';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/loading";

const App = () => {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
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
}

export default App;