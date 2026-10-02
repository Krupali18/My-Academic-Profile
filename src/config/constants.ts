/**
 * Centralized site constants and configuration parameters.
 * M58 FIX: Removed TIMEOUT_MS, RETRY_ATTEMPTS, CACHE_STALE_TIME_MS, CACHE_GC_TIME_MS —
 * these implied an async API with retry logic and caching, which does not exist in this
 * pure static site. They were dead constants from a previous feature concept.
 */
export const SITE_CONSTANTS = {
  SITE_NAME: 'Dr. Krupali Donda',
  SITE_TITLE: 'Dr. Krupali Donda | Metamaterials & AI Research — Adani University',
  INSTITUTION: 'Adani University',
  DEPARTMENT: 'Department of Information and Communication Technology',
  LOCATION: 'Ahmedabad, Gujarat, India',
  EMAIL: 'krupali.donda@adaniuni.ac.in',
  CANONICAL_URL: 'https://krupalidonda.com',
  GOOGLE_SCHOLAR_URL: 'https://scholar.google.com/citations?user=JRLRYokAAAAJ',
  RESEARCH_GATE_URL: 'https://www.researchgate.net/profile/Krupali-Donda-2',
  LINKEDIN_URL: 'https://www.linkedin.com/in/krupalidonda/',
  YOUTUBE_URL: 'https://www.youtube.com/@humansineducation4511',
  HEADER_SCROLL_THRESHOLD: 10,
} as const;
