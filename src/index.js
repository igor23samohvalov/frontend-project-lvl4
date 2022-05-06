// @ts-nocheck
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import ReactDOM from 'react-dom';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = () => {
  const vdom = init();
  ReactDOM.render(vdom, document.querySelector('#chat'));

  return vdom;
};

app();

export default app;
