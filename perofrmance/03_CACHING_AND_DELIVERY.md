# CACHING & DELIVERY GUIDE

## Read this first (important expectations)
- Lighthouse always tests a **cold load** (empty cache). **Caching will NOT raise the Lighthouse score.**
  It makes **repeat visits and navigation much faster** for real users, which is still very valuable.
- The Lighthouse score will rise mainly from file `02` (less JS work, lighter images). Do both.
- Never cache `index.html` for a long time. If you do, users get stuck on old versions of the site.
- Detect the hosting first (Netlify / Vercel / Cloudflare Pages / Nginx / Apache / Firebase / S3+CloudFront / other) and use **only** that host's method below. If unknown, ask me.

---

## 1. Prerequisite: fingerprinted (hashed) filenames
Build output must look like `assets/index-3f9a1c.js`, so the filename changes when content changes.
Vite, CRA, Webpack production builds and Next.js do this by default. **Verify it** after building.
Only files with a content hash may receive `immutable` long-term caching.

## 2. Cache policy

| Resource | Cache-Control |
|---|---|
| `index.html` / all HTML | `no-cache` (revalidate every time, uses ETag, still fast) |
| Hashed JS / CSS (`/assets/*`, `/static/*`, `/_next/static/*`) | `public, max-age=31536000, immutable` |
| Fonts (`.woff2`) | `public, max-age=31536000, immutable` (+ CORS header if served cross-origin) |
| Images / SVG / video that have **hashed** names | `public, max-age=31536000, immutable` |
| Images that keep the **same name** when changed | `public, max-age=604800, stale-while-revalidate=86400` (1 week), or rename them with hashes |
| `sitemap.xml`, `robots.txt` | `public, max-age=3600` |
| `manifest.json`, `favicon` | `public, max-age=86400` |
| API responses | do not change unless I ask |

## 3. Compression
- Enable **Brotli** (preferred) and **gzip** fallback for HTML, CSS, JS, JSON, SVG, fonts that are not already compressed (not for WOFF2, images, video).
- Make sure `Vary: Accept-Encoding` is sent.
- Prefer pre-compressing at build time (`vite-plugin-compression`, `compression-webpack-plugin`) if the host supports serving `.br`/`.gz`, or rely on the host/CDN.

## 4. Host-specific snippets

### Netlify: `public/_headers`
```
/index.html
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/*.avif
  Cache-Control: public, max-age=31536000, immutable
/*.webp
  Cache-Control: public, max-age=31536000, immutable
```
(Only keep image rules if image filenames are hashed. Otherwise use the one-week rule.)

### Vercel: `vercel.json`
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*).woff2", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] }
  ]
}
```
(Adjust `/assets/` to the real build folder. Next.js on Vercel already caches `/_next/static` correctly.)

### Nginx
```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
# brotli on; brotli_types ...;   (if the module is installed)

location = /index.html { add_header Cache-Control "no-cache"; }
location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
  access_log off;
}
location ~* \.(woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
  add_header Access-Control-Allow-Origin "*";
}
```

### Apache: `.htaccess`
```apache
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2|avif|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
```
(Only apply the long cache to image types whose filenames are hashed.)

### Cloudflare / CDN in front
- Turn on Brotli, HTTP/2 and HTTP/3, "Always Online" is optional.
- Don't enable "Rocket Loader" or auto-minify that rewrites JS/HTML without approval (it can break animations).
- Make sure CDN cache rules don't override the origin's `no-cache` for HTML.

### Firebase Hosting / S3 + CloudFront / others
Apply the same table from section 2 using that platform's header configuration. Ask me if unclear.

## 5. HTTP delivery checks
- HTTP/2 or HTTP/3 enabled (HTTPS only).
- No redirect chains (`http → https → www → /`). Maximum 1 hop.
- Server response time (TTFB) for the HTML under about 300 ms from the target region; if not, tell me. It is a hosting/CDN issue, not code.
- Images, fonts and JS/CSS served from the **same origin or a CDN with preconnect**.

## 6. Service Worker / PWA caching: **OPTIONAL, Tier 3, DO NOT add unless I approve**
Headers give most of the benefit with no staleness risk. If I approve, then:
- Use **Workbox**. Precache **only hashed build assets**.
- HTML navigation: **network-first** (or stale-while-revalidate) with offline fallback. **Never cache-first for HTML.**
- Images: stale-while-revalidate with an expiration limit (e.g. 60 entries, 30 days).
- Never cache POST requests, auth endpoints, or analytics calls.
- Add a safe update flow (`skipWaiting` + notify / reload on next navigation) so users never get stuck on an old version.
- Must not alter SEO (crawlers should receive normal responses), must not use IndexedDB in a way that adds Lighthouse "stored data" warnings.
- Test: first visit, second visit, offline, a new deploy (old users receive the update), and Lighthouse again.

## 7. Verify caching
```bash
# HTML must be revalidated
curl -sI https://YOUR-SITE/ | grep -i -E "cache-control|content-encoding|etag"
# A hashed asset must be immutable and compressed
curl -sI -H "Accept-Encoding: br,gzip" https://YOUR-SITE/assets/<file>.js | grep -i -E "cache-control|content-encoding"
```
Then open DevTools → Network → reload twice: hashed assets should say `(disk cache)` / `(memory cache)` on the second load and HTML should be revalidated (304 or fast 200).
