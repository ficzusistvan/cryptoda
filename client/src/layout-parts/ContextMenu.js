import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './ContextMenu.css';
import { Link } from 'react-router-dom';

class ContextMenu extends React.Component {

  render() {
    return (
      <>
        <Row className='left-sidebar-1'>
          <Col>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="primary" tag={Link} to='/'>Home</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='rates'>Rates</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='investments'>Investments</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='portfolio'>Portfolio</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='balancer'>Balancer</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default ContextMenu;