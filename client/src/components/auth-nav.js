import React from "react";
import AuthenticationButton from "./authentication-button";
import {
  Nav,
} from 'reactstrap';

const AuthNav = () => (
  <Nav className="me-auto" navbar>
    <AuthenticationButton />
  </Nav>
);

export default AuthNav;