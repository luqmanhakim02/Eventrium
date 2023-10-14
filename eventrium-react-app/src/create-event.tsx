import React from 'react';
import WalletAddress from './walletConnect'
import CreateEvent from './createEvent';
import { WalletAddressProvider } from './WalletAddressContext';

function App() {
  return (
    <WalletAddressProvider>
      <div>
        <h1>Your App</h1>
        <WalletAddress />
        <CreateEvent />
      </div>
    </WalletAddressProvider>
  );
}

export default App;
