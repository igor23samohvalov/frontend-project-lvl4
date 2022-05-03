import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
