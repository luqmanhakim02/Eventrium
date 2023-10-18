import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import MyComponent from './myComponent';

const rootElement = document.getElementById('component');

if (rootElement) {
    const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <MyComponent />
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
