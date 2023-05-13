import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { RequestProvider } from 'react-request-hook'
import GlobalStateProvider from './provider';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

ReactDOM.render(
  <RequestProvider value={axiosInstance}>
    <GlobalStateProvider>
      <App/>
    </GlobalStateProvider>
  </RequestProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
