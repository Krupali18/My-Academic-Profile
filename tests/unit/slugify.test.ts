import { describe, it, expect } from 'vitest';
import { slugify } from '@/lib/utils/slugify';

describe('slugify utility', () => {
  it('converts standard titles to kebab-case slugs', () => {
    expect(slugify('About Page')).toBe('about-page');
    expect(slugify('Research Highlights')).toBe('research-highlights');
  });

  it('strips special characters and symbols', () => {
    expect(slugify('News & Outreach')).toBe('news-and-outreach');
    expect(slugify('Metamaterials: 2026 Breakthroughs!')).toBe('metamaterials-2026-breakthroughs');
    expect(slugify('Dr. Krupali Donda @ Adani Univ')).toBe('dr-krupali-donda-adani-univ');
  });

  it('handles multiple consecutive spaces and whitespace padding', () => {
    expect(slugify('  Hello   World  ')).toBe('hello-world');
  });

  it('handles already-hyphenated strings without redundant hyphens', () => {
    expect(slugify('deep-learning-physics')).toBe('deep-learning-physics');
    expect(slugify('deep--learning---physics')).toBe('deep-learning-physics');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });
});
