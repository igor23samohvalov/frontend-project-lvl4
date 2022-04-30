import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth.js';

function RequireAuth({ children }) {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return children;
}

export default RequireAuth;
