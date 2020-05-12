import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default () => {
  return (
    <>
      <Navbar
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
        sticky="top"
        bg="dark"
        variant="dark"
      >
        <LinkContainer to="/entertainme">
          <Navbar.Brand href="#">EntertainMe</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/movies">
            <Nav.Link href="#">Movies</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tv">
            <Nav.Link href="#">TV Series</Nav.Link>
          </LinkContainer>
        </Nav>
        <LinkContainer to="/favorites">
          <Button variant="outline-warning">
            <i className="fa fa-heart"></i> My Favorites
          </Button>
        </LinkContainer>
      </Navbar>
    </>
  );
};
