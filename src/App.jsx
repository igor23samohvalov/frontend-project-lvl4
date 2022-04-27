import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Chatpage from './pages/Chatpage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Notfoundpage from './pages/Notfoundpage.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Chatpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
