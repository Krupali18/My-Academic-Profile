# Vercel Deployment & Production Operations Guide
## Dr. Krupali Donda Academic Portfolio

### 1. Overview
This project is an optimized React (Vite + TypeScript) single-page application built for static CDN-edge delivery on Vercel. With pre-rendered assets, code-split route chunks, and long-term immutable caching headers, it easily sustains 50,000+ concurrent visitors without origin server strain.

---

### 2. Vercel Project Setup Steps

1. **Connect Repository**:
   - In your [Vercel Dashboard](https://vercel.com/dashboard), click **Add New** → **Project**.
   - Select your GitHub repository (`krupali-donda-site`).

2. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `tsc --noEmit && vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
   - **Node.js Version**: `20.x` (LTS)

3. **Configure Environment Variables**:
   Add the following in Vercel **Settings** → **Environment Variables**:
   | Variable | Target | Purpose |
   |---|---|---|
   | `VITE_SITE_URL` | Production / Preview / Dev | Canonical URL: `https://krupalidonda.com` |
   | `VITE_GA_ID` | Production | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |
   | `VITE_SENTRY_DSN` | Production / Preview | Sentry error monitoring DSN (optional) |
   | `ANALYZE` | Dev only | Set `false` |

4. **Add Custom Domain & SSL**:
   - Navigate to **Settings** → **Domains**.
   - Add `krupalidonda.com` and `www.krupalidonda.com`.
   - Configure DNS records with your registrar:
     - **Apex domain (`@`)**: A record pointing to `76.76.21.21`
     - **Subdomain (`www`)**: CNAME record pointing to `cname.vercel-dns.com`
   - Vercel automatically provisions and renews Let's Encrypt Wildcard SSL certificates.

---

### 3. Edge CDN Caching Strategy (`vercel.json`)

All cache controls are enforced at Vercel's global edge:
- **`dist/assets/*`** (hashed JS, CSS, WebP): `public, max-age=31536000, immutable`
- **`fonts/*`** (woff2 font files): `public, max-age=31536000, immutable`
- **`index.html` & HTML routes**: `public, max-age=0, must-revalidate`
- **`sitemap.xml` & `robots.txt`**: Served directly from CDN root with daily freshness revalidation.

---

### 4. Continuous Integration & Safe Deployments

- Every branch push creates an isolated **Preview Deployment**.
- Merges to `main` automatically deploy to **Production**.
- Automatic rollbacks can be performed in under 5 seconds from the Vercel dashboard.
