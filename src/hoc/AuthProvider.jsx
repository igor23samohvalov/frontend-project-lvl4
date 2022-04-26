import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogged, setLogState] = useState(false);
  const logIn = () => setLogState(true);
  const logOut = () => setLogState(false);

  const value = { isLogged, logIn, logOut };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};