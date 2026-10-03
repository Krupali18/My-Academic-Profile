import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global Scroll Reveal Hook - Zero-Latency Direct Presentation
 * Ensures all elements are instantly active and visible upon route changes
 * with bulletproof error isolation.
 */
export function useGlobalScrollReveal(): void {
  const location = useLocation();

  useEffect(() => {
    const activateAll = () => {
      try {
        const elements = document.querySelectorAll<HTMLElement>(
          '.reveal:not(.active), .stagger-item:not(.active)'
        );
        elements.forEach((el) => {
          el.classList.add('active');
        });
      } catch {
        // Safe no-op
      }
    };

    // 1. Activate immediately on mount
    activateAll();

    // 2. Next animation frame to catch any immediate sub-render
    let frameId: number | null = null;
    try {
      frameId = requestAnimationFrame(activateAll);
    } catch {
      // Safe no-op
    }

    // 3. One lightweight timer check for dynamically rendered components
    const timer = setTimeout(activateAll, 80);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [location.pathname]);
}

export function GlobalScrollReveal(): null {
  useGlobalScrollReveal();
  return null;
}

export default useGlobalScrollReveal;
