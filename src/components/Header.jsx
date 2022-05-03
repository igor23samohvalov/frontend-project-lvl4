import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
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
    <Navbar bg="white" expand="lg" className="shadow-sm navbar-light bg-white" style={{ height: '56px' }}>
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
  );
}

export default Header;
