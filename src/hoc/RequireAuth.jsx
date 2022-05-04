import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth.js';

function RequireAuth({ children }) {
  const { isLogged } = useAuth();

  if (!isLogged) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
