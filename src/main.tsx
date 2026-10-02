import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { initWebVitals } from './lib/analytics';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Start Core Web Vitals RUM monitoring
initWebVitals();

