import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to='/'>Cryptoda</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='rates'>Rates</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='portfolio'>Portfolio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='investments'>Investments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='balancer'>Balancer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='dca'>DCA</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;