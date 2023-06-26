import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Dumbbell Data</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/weightlifting" exact activeClassName="active">Weightlifting</Nav.Link>
          <Nav.Link as={NavLink} to="/cardio" activeClassName="active">Cardio</Nav.Link>
          <NavDropdown title="Graphs/Stats" id="navbarDropdownMenuLink">
            <NavDropdown.Item as={NavLink} to="/wl-stats" activeClassName="active">Weightlifting</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/cardio-stats" activeClassName="active">Cardio</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
