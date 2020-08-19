import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const test = window.reactData;
console.log(test);
ReactDOM.render(
  <React.StrictMode>
    <App data={test} />
  </React.StrictMode>,
  document.getElementById(test.documentId)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
