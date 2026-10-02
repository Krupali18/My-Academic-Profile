import DOMPurify from 'isomorphic-dompurify';

/**
 * Permitted HTML tags for safe rich text rendering in the CMS.
 * Matches TipTap Editor and Academic Section requirements.
 */
export const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'strike',
  // NOTE: 'h1' is intentionally excluded — body content must not create extra H1 tags.
  // Using h1 in rich text would produce multiple H1s per page, breaking SEO and a11y.
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'a',
  'blockquote',
  'code',
  'pre',
  'hr',
  'span',
  'div',
  'sub',
  'sup',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];

export const ALLOWED_ATTR = [
  'href',
  'target',
  'rel',
  'class',
  'id',
  'title',
  'aria-label',
  'aria-hidden',
  'src',
  'alt',
  'width',
  'height',
  // NOTE: 'style' is intentionally excluded — inline styles are an XSS/CSS-injection vector.
  // Use CSS classes instead of inline styles in rich text content.
];

/**
 * Sanitizes an untrusted HTML string using isomorphic-dompurify.
 * Strips script tags, inline javascript event handlers (onclick, onload), and malicious URLs.
 */
export function sanitizeHtml(untrustedHtml: string): string {
  if (!untrustedHtml || typeof untrustedHtml !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(untrustedHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target', 'rel'],
  });
}

/**
 * Recursively traverses and sanitizes strings inside an object or array.
 * Useful for sanitizing section content and settings JSON before saving.
 */
export function sanitizeDeep<T>(value: T): T {
  if (typeof value === 'string') {
    // Only sanitize strings that appear to contain HTML markup
    if (value.includes('<') && value.includes('>')) {
      return sanitizeHtml(value) as unknown as T;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDeep(item)) as unknown as T;
  }

  if (value !== null && typeof value === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      sanitizedObj[key] = sanitizeDeep(val);
    }
    return sanitizedObj as T;
  }

  return value;
}
