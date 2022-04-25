import React from 'react';
import { Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <Nav activeKey="/" onSelect={() => console.log('selected a navbar item')}>
        <Nav.Item>
          <Nav.Link href="/">Hexlet Chat</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </>
  );
}

export default Navbar;
