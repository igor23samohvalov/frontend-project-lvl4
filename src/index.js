// @ts-nocheck
import 'core-js/stable/index.js';
import './main.css';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  ReactDOM.render(vdom, document.querySelector('#chat'));

  return vdom;
};

app();

export default app;
