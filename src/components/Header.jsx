import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';

function Header() {
  // const navigate = useNavigate();
  const { isLogged, logOut } = useAuth();
  const { t } = useTranslation();
  const handleClick = () => {
    logOut();
  };

  return (
    <>
      <Row style={{ height: '5%' }}>
        <Navbar bg="white" className="shadow-sm">
          <Container>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Navbar.Brand>
                Hexlet Chat
              </Navbar.Brand>
            </NavLink>
            {isLogged
              ? <Button variant="primary" className="align-self-end" onClick={handleClick}>{t('logOut')}</Button>
              : null}
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
