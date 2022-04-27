import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

function Header() {
  return (
    <>
      <Row style={{ height: '5%' }}>
        <Navbar bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand href="#home">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row className="justify-content-md-center align-items-center" style={{ height: '95%' }}>
        <Col md="auto">
          <Outlet />
        </Col>
      </Row>
    </>
  );
}

export default Header;
