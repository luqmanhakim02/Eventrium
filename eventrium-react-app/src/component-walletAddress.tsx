import React from 'react';
import ReactDOM from 'react-dom/client'
import { getwalletAddress } from './constants'; 

const WalletAddress = () => {
  return (
    <div className="header__cart__price">address: <span>{getwalletAddress()}</span></div>
  )
}

export default WalletAddress;

ReactDOM.createRoot(document.getElementById('walletAddress')!).render(
    <React.StrictMode>
      <WalletAddress />
    </React.StrictMode>,
)