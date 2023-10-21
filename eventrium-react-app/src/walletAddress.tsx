import React from 'react';
import { createRoot } from 'react-dom/client';

import WalletAddress from './walletConnect';

const rootElement = document.getElementById('walletAddress');

if (rootElement) {
  const handleAddressChange = (address: any) => {
    // Handle the address change logic here
    console.log('Address changed:', address);
  };

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <WalletAddress onAddressChange={handleAddressChange} />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'walletAddress' not found.");
}
