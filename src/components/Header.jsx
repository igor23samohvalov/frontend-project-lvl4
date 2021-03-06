import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hook/useAuth.js';

function Header() {
  const { isLogged, logOut } = useAuth();
  const { t } = useTranslation();
  const handleClick = () => {
    localStorage.removeItem('userId');
    logOut();
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm navbar-light bg-white" style={{ height: '56px' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ textDecoration: 'none' }}>{t('brandLogo')}</Navbar.Brand>
        {isLogged
          ? <Button variant="primary" className="align-self-end" onClick={handleClick}>{t('logOut')}</Button>
          : null}
      </Container>
    </Navbar>
  );
}

export default Header;
