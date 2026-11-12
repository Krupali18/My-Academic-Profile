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

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback(scheduleWebVitals, { timeout: 3000 });
  } else {
    setTimeout(scheduleWebVitals, 1500);
  }
}

