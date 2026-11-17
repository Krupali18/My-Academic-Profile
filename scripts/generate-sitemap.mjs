/**
 * SEO-07 FIX: Auto-generate sitemap.xml with today's date as lastmod.
 * Run manually after content updates: `node scripts/generate-sitemap.mjs`
 * Or add to package.json scripts: "build": "node scripts/generate-sitemap.mjs && tsc --noEmit && vite build"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const routes = [
  { loc: 'https://krupalidonda.com/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://krupalidonda.com/about', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://krupalidonda.com/research', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://krupalidonda.com/publications', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://krupalidonda.com/teaching', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://krupalidonda.com/group', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://krupalidonda.com/honors', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://krupalidonda.com/news-outreach', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://krupalidonda.com/gallery', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://krupalidonda.com/contact', changefreq: 'yearly', priority: '0.7' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `
  <url>
    <loc>${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('')}

</urlset>
`;

const dest = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(dest, sitemap, 'utf-8');
console.log(`✅ sitemap.xml generated with lastmod=${today} → ${dest}`);
