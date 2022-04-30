import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setLogState] = useState(false);
  const logIn = () => setLogState(true);
  const logOut = () => setLogState(false);

  const [activeChannel, setActiveChannel] = useState(1);
  const setActiveChn = (id) => setActiveChannel(id);

  const value = { isLogged, logIn, logOut, activeChannel, setActiveChn };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};