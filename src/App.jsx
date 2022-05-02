import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Header from './components/Header.jsx';
import Chatpage from './pages/Chatpage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Notfoundpage from './pages/Notfoundpage.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import SignupPage from './pages/SignupPage.jsx';

const rollbarConfig = {
  accessToken: '6f54a7d386864e24855fca370fa325c3',
  environment: 'production',
};

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<RequireAuth><Chatpage /></RequireAuth>} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/*" element={<Notfoundpage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
