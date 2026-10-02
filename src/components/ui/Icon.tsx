import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface IconProps {
  name?: string;
  className?: string;
  size?: number;
}

/**
 * Universal SVG Icon component:
 * 1. Checks custom academic & scholarly brand icons (scholar, researchgate, linkedin, etc.)
 * 2. Checks Lucide icon library dynamically for UI and scientific icons
 * 3. Fallbacks gracefully
 */
export function Icon({ name = '', className, size = 20 }: IconProps): React.ReactElement | null {
  const sizeProps = { width: size, height: size };
  const normalized = (name || '').trim().toLowerCase();

  switch (normalized) {
    case 'linkedin':
      return (
        <span className={cn('font-bold text-sm leading-none inline-block', className)} aria-hidden="true">
          in
        </span>
      );

    case 'scholar':
    case 'googlescholar':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...sizeProps} className={className} aria-hidden="true">
          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.4l3 .9v8h18v-8l3-.9L12 0z" />
        </svg>
      );

    case 'researchgate':
      return (
        <span className={cn('font-bold text-sm tracking-tighter leading-none inline-block', className)} aria-hidden="true">
          R<sup className="text-[10px]">G</sup>
        </span>
      );

    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...sizeProps} className={className} aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );

    case 'close':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...sizeProps} className={className} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );

    case 'menu':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...sizeProps} className={className} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );

    case 'external':
    case 'externallink':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} {...sizeProps} className={className} aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      );

    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...sizeProps} className={className} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      );
  }

  // Lookup in Lucide icons
  const lucideMap = (LucideIcons as unknown) as Record<string, React.ElementType>;
  
  // Exact match
  let Component = lucideMap[name];

  // Try PascalCase match if not found
  if (!Component && name) {
    const pascalName = name
      .split(/[-_\s]+/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
    Component = lucideMap[pascalName];
  }

  if (Component) {
    return <Component size={size} className={className} aria-hidden="true" />;
  }

  // Fallback to Sparkles
  const Fallback = LucideIcons.Sparkles;
  return <Fallback size={size} className={className} aria-hidden="true" />;
}
