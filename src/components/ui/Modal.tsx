import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  /** ARIA role — use 'alertdialog' for destructive confirmations */
  role?: 'dialog' | 'alertdialog';
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Fully Accessible Modal Dialog
 * MD File 16 H3 compliance:
 * - Focus trap: Tab and Shift+Tab cycle within the modal
 * - Escape key closes modal
 * - Focus returns to trigger element on close
 * - aria-modal, aria-labelledby for screen readers
 * - Body scroll locked while open
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = 'lg',
  role = 'dialog',
}: ModalProps): React.ReactElement | null {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  // Return focus to the element that opened the modal
  const returnFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement;
      // Focus the first focusable element inside the modal
      setTimeout(() => {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        focusable?.[0]?.focus();
      }, 50);
    } else {
      // Return focus to trigger element when modal closes (MD H3)
      if (returnFocusRef.current instanceof HTMLElement) {
        returnFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: cycle through focusable elements (MD H3)
      if (e.key === 'Tab') {
        const focusable = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ?? []
        );
        if (focusable.length === 0) return;

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses: Record<NonNullable<ModalProps['maxWidth']>, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role={role}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={cn(
          'w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 animate-slide-up',
          maxWidthClasses[maxWidth],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {title ? (
            <h3 id={titleId} className="text-lg font-bold text-brand-navy">
              {title}
            </h3>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md text-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
