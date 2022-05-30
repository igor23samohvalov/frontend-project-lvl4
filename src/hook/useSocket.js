import { useContext } from 'react';
import { SocketContext } from '../hoc/SocketProvider.jsx';

export default function useSocket() {
  return useContext(SocketContext);
}
