import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle
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
              <NavLink tag={Link} to='investments'>Investments</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Portfolio
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to='portfolio'>
                  Current
                </DropdownItem>
                <DropdownItem tag={Link} to='portfolio-history'>
                  History
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Configs
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to='dca-config'>
                  Fiat Currency Cost Averaging
                </DropdownItem>
                <DropdownItem tag={Link} to='wallets-config'>
                  Wallets
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;