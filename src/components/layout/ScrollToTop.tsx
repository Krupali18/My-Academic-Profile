import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Router middleware component
 * Automatically scrolls to top (0, 0) on route change in SPA mode,
 * or smoothly scrolls to an anchor element if a hash is present.
 */
export const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
