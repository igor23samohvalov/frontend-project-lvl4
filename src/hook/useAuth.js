import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider.jsx';

export default function useAuth() {
  return useContext(AuthContext);
}
