import { useEffect, useRef, useState } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export type UseScrollRevealReturn<T extends HTMLElement = HTMLDivElement> = [
  React.RefObject<T>,
  boolean
] & {
  ref: React.RefObject<T>;
  isVisible: boolean;
  isRevealed: boolean;
};

/**
 * Custom hook for scroll-triggered reveal animations via IntersectionObserver.
 * Implements MD File 09 specifications:
 * - Return: { ref, isVisible } with tuple destructuring support [ref, isRevealed]
 * - threshold: 0.1, rootMargin: '0px 0px -50px 0px', triggerOnce: true
 * - Disconnects observer on first trigger when triggerOnce is true
 * - Checks prefers-reduced-motion to reveal immediately without observer
 * - Complete observer cleanup on unmount
 *
 * @param options Configuration for threshold, rootMargin, and triggerOnce
 * @returns Object with ref and isVisible (also supports array destructuring)
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn<T> {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. If user prefers reduced motion, reveal immediately without animation delay
    const prefersReducedMotion = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // 2. IntersectionObserver for viewport entry
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  const tuple = [ref, isVisible] as [React.RefObject<T>, boolean];
  const returnObj = Object.assign(tuple, {
    ref,
    isVisible,
    isRevealed: isVisible,
  }) as UseScrollRevealReturn<T>;

  return returnObj;
}
