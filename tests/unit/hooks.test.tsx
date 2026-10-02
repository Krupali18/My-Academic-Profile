import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStickyHeader } from '@/hooks/useStickyHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

describe('Custom Hooks Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = '';
  });

  describe('useStickyHeader hook', () => {
    it('returns isScrolled: false initially and true when scrollY > threshold', () => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      const { result } = renderHook(() => useStickyHeader(10, 8));

      expect(result.current.isScrolled).toBe(false);

      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 15, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current.isScrolled).toBe(true);

      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current.isScrolled).toBe(false);
    });

    it('cleans up scroll listener on unmount', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useStickyHeader());

      unmount();
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('useScrollReveal hook', () => {
    it('supports both object and tuple destructuring', () => {
      const { result } = renderHook(() => useScrollReveal<HTMLDivElement>({ threshold: 0.1 }));

      // Object access
      expect(result.current.ref).toBeDefined();
      expect(typeof result.current.isVisible).toBe('boolean');

      // Tuple access
      const [ref, isRevealed] = result.current;
      expect(ref).toBe(result.current.ref);
      expect(isRevealed).toBe(result.current.isVisible);
    });
  });
});
