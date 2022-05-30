import React, { createContext } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    newMessage: (socket, message, channelId, setSubmitState) => {
      socket.emit('newMessage', {
        text: message,
        username: JSON.parse(localStorage.getItem('userId')).username,
        channelId,
      });
    },
    newChannel: (socket, { newChannel }, setDisabled) => {
      setDisabled(true);
      socket.timeout(2000).emit('newChannel', {
        name: newChannel,
      });
    },
    renameChannel: (socket, { renamedChannel }, id, setDisabled) => {
      socket.timeout(2000).emit('renameChannel', {
        id,
        name: renamedChannel,
      });
    },
    removeChannel: (socket, id) => {
      socket.timeout(2000).emit('removeChannel', { id });
    },
  };

  return (
    <SocketContext.Provider value={value}>
      { children }
    </SocketContext.Provider>
  );
}
