import React from 'react';
import './hook/i18n.js';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import App from './App.jsx';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

export default async function init(socket = io()) {
  const notify = (phrase, state) => toast[state](phrase, { autoClose: 2000 });

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
    notify('Канал создан', 'success');
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
    notify('Канал удалён', 'success');
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.renameChannel({ id, changes: { name } }));
    notify('Канал переименован', 'success');
  });
  socket.on('disconnect', () => console.log('user disconnected'));

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App socket={socket} />
          <ToastContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
