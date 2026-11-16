import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer Core Web Vitals RUM monitoring until idle after first paint
const scheduleWebVitals = () => {
  import('./lib/analytics')
    .then(({ initWebVitals }) => initWebVitals())
    .catch(() => {
      // Analytics non-critical
    });
};

// Register Service Worker for offline resilience and instant asset serving
const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration non-critical
    });
  }
};

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback(
        () => {
          scheduleWebVitals();
          registerServiceWorker();
        },
        { timeout: 3000 }
      );
  } else {
    setTimeout(() => {
      scheduleWebVitals();
      registerServiceWorker();
    }, 1500);
  }
}

