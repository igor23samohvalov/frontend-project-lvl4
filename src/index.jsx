/* eslint-disable react/jsx-filename-extension */
// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import App from './App.jsx';
import store from './slices/index.js';
import './hook/i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const root = document.querySelector('#chat');
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  root,
);
