import { useState, useEffect } from 'react';

export interface UseStickyHeaderReturn {
  isScrolled: boolean;
}

export interface UseStickyHeaderOptions {
  threshold?: number;
  resetThreshold?: number;
}

export function useStickyHeader(
  thresholdOrOptions: number | UseStickyHeaderOptions = 10,
  resetThresholdArg?: number
): UseStickyHeaderReturn {
  const threshold =
    typeof thresholdOrOptions === 'object' && thresholdOrOptions !== null
      ? thresholdOrOptions.threshold ?? 10
      : thresholdOrOptions;

  const resetThreshold =
    typeof thresholdOrOptions === 'object' && thresholdOrOptions !== null
      ? thresholdOrOptions.resetThreshold ?? threshold
      : resetThresholdArg ?? threshold;

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && scrollY > threshold) return true;
        if (prev && scrollY < resetThreshold) return false;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, resetThreshold]);

  return { isScrolled };
}
