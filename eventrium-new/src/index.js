import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WalletAddress from './component-walletAddress';
import TransactionID from './component-transactionID';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const walletAddress = ReactDOM.createRoot(document.getElementById('walletAddress'));
walletAddress.render(
  <React.StrictMode>
    <WalletAddress />
  </React.StrictMode>
);

const transactionID = ReactDOM.createRoot(document.getElementById('transactionID'));
transactionID.render(
  <React.StrictMode>
    <TransactionID />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
