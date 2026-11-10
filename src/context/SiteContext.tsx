import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface SiteContextType {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      // Debounce: only update state 150ms after the last resize event
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 150);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);


  const openModal = useCallback((modalId: string) => {
    setActiveModal(modalId);
    // RELIABILITY-03 FIX: Use class instead of inline style to avoid conflicts
    // with AcademicIntro's own body overflow control
    document.body.classList.add('modal-open');
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
  }, []);

  const contextValue = useMemo(
    () => ({
      isMobile,
      prefersReducedMotion,
      activeModal,
      openModal,
      closeModal,
    }),
    [isMobile, prefersReducedMotion, activeModal, openModal, closeModal]
  );

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};

const defaultSiteContext: SiteContextType = {
  isMobile: false,
  prefersReducedMotion: false,
  activeModal: null,
  openModal: () => {},
  closeModal: () => {},
};

export const useSite = (): SiteContextType => {
  const context = useContext(SiteContext);
  return context || defaultSiteContext;
};

export default SiteContext;
