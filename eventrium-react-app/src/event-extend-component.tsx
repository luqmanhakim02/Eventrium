import React from 'react';
import { createRoot } from 'react-dom/client';
import EventExtend from './eventExtend';

const rootElement = document.getElementById('event-extend');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
        <EventExtend />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'event-extend' not found.");
}
