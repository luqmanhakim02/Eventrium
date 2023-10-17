import React from 'react';
import EventList from './eventList'; // Import your EventList component
import { createRoot } from 'react-dom/client';
import { WalletAddressProvider } from './WalletAddressContext';

const rootElement = document.getElementById('event-list');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <WalletAddressProvider>
        <EventList />
      </WalletAddressProvider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'event-list' not found.");
}
