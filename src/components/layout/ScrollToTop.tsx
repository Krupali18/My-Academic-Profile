import { useLayoutEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Router middleware component
 * Automatically scrolls to top (0, 0) before paint on route change in SPA mode,
 * or smoothly scrolls to an anchor element if a hash is present.
 * Bulletproof error handling ensures this never throws into the React tree.
 */
export const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    try {
      if (hash) {
        const id = hash.replace(/^#/, '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo(0, 0);
    } catch {
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch {
        // Safe no-op
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
