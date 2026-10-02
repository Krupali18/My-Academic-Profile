import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { cn } from '@/lib/utils/cn';

export interface RichTextProps {
  content: string;
  className?: string;
}

/**
 * XSS-Safe Rich Text Renderer
 * Sanitizes raw HTML using DOMPurify and renders with Tailwind typography styling.
 */
export function RichText({ content, className }: RichTextProps): React.ReactElement {
  const cleanHtml = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'a',
      'ul',
      'ol',
      'li',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'sub',
      'sup',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });

  return (
    <div
      className={cn('prose prose-sm sm:prose max-w-none text-text-dark leading-relaxed', className)}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
