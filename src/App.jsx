import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Chatpage from './pages/Chatpage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Notfoundpage from './pages/Notfoundpage.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes path="/" element={<Nav />}>
        <Route path="/" element={<Chatpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/*" element={<Notfoundpage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
