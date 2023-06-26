import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Dumbbell Data</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link href="#" active>Weightlifting</Nav.Link>
          <Nav.Link href="#">Cardio</Nav.Link>
          <NavDropdown title="Graphs" id="navbarDropdownMenuLink">
            <NavDropdown.Item href="#">Weightlifting</NavDropdown.Item>
            <NavDropdown.Item href="#">Cardio</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
