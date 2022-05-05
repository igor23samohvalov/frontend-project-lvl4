import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setLogState] = useState(localStorage.getItem('userId') !== null);

  const logIn = () => setLogState(true);
  const logOut = () => setLogState(false);

  const [activeChannel, setActiveChannel] = useState(1);
  const setActiveChn = (id) => setActiveChannel(id);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isLogged, logIn, logOut, activeChannel, setActiveChn,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}
