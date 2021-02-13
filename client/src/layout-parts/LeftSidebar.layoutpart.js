import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './LeftSidebar.layoutpart.css';
import { Link } from 'react-router-dom';

class LeftSidebarLayoutPart extends React.Component {

  render() {
    return (
      <>
        <Row className='left-sidebar-1'>
          <Col>
          <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='rates'>Rates</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='portfolio'>Portfolio</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default LeftSidebarLayoutPart;