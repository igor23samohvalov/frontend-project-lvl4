import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Layout from './components/Layout.jsx';
import Chatpage from './pages/Chatpage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Notfoundpage from './pages/Notfoundpage.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { SocketProvider } from './hoc/SocketProvider.jsx';

const rollbarConfig = {
  accessToken: '6f54a7d386864e24855fca370fa325c3',
  environment: 'production',
};

function App({ socket }) {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <SocketProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="/" element={<RequireAuth><Chatpage socket={socket} /></RequireAuth>} />
                <Route path="login" element={<Loginpage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="*" element={<Notfoundpage />} />
              </Route>
            </Routes>
          </SocketProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
