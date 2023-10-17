import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import EventDetails from './EventDetails';

const rootElement = document.getElementById('detail');

if (rootElement) {
    const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <EventDetails />
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
