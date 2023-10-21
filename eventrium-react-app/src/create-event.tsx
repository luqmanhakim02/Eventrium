import React from 'react';
import CreateEvent from './createEvent';
import { createRoot } from 'react-dom/client';
import { WalletAddressProvider } from './WalletAddressContext';

const rootElement = document.getElementById('create');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <WalletAddressProvider>
        <CreateEvent />
      </WalletAddressProvider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'create' not found.");
}
