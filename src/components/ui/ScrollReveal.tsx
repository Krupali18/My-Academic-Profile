import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils/cn';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up';
  delayMs?: number;
}

/**
 * Scroll Reveal Animation Wrapper
 * Automatically animates children when scrolled into viewport using IntersectionObserver.
 */
export function ScrollReveal({
  children,
  className,
  animation = 'slide-up',
  delayMs = 0,
}: ScrollRevealProps): React.ReactElement {
  const [ref, isRevealed] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const animationClass =
    animation === 'slide-up' ? 'translate-y-6 opacity-0' : 'opacity-0';
  const revealedClass = 'translate-y-0 opacity-100';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        'transition-all duration-700 ease-out transform',
        isRevealed ? revealedClass : animationClass,
        className
      )}
    >
      {children}
    </div>
  );
}
