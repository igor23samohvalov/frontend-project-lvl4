import React from 'react';
import './hook/i18n.js';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './slices/index.js';

export default async function init(socket = io()) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App socket={socket} />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
