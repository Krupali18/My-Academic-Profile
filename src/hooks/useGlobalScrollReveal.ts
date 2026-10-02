import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global Scroll Reveal Hook
 * High-FPS Cinematic IntersectionObserver for .reveal and .stagger-item elements
 */
export function useGlobalScrollReveal(): void {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // Small delay to let React render the new page's DOM
    const timer = setTimeout(() => {
      const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>('.reveal:not(.active), .stagger-item:not(.active)')
      );

      if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add('active'));
        return;
      }

      if (!revealElements.length) return;

      const windowHeight = window.innerHeight;
      const initialElements: HTMLElement[] = [];
      const scrollElements: HTMLElement[] = [];

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.88) {
          initialElements.push(el);
        } else {
          scrollElements.push(el);
        }
      });

      // Rapidly cascade in elements already in viewport on mount/page change
      initialElements.forEach((el, idx) => {
        el.style.transitionDelay = `${Math.min(idx * 0.04, 0.28)}s`;
        requestAnimationFrame(() => {
          el.classList.add('active');
        });
      });

      if (!scrollElements.length) return;

      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;

            // Dynamic fluid stagger delay for stagger-item grid cards
            if (el.classList.contains('stagger-item')) {
              const parent = el.parentElement;
              if (parent) {
                const siblings = Array.from(parent.querySelectorAll('.stagger-item:not(.active)'));
                const idx = siblings.indexOf(el);
                if (idx !== -1) {
                  if (parent.classList.contains('gs-members-grid')) {
                    const width = window.innerWidth;
                    const cols = width <= 576 ? 1 : width <= 992 ? 2 : 4;
                    const col = idx % cols;
                    el.style.transitionDelay = `${col * 0.08}s`;
                  } else {
                    el.style.transitionDelay = `${Math.min(idx * 0.06, 0.36)}s`;
                  }
                }
              }
            }

            el.classList.add('active');
            observer.unobserve(el);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      scrollElements.forEach((el) => revealObserver.observe(el));

      return () => revealObserver.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}

export function GlobalScrollReveal(): null {
  useGlobalScrollReveal();
  return null;
}
