# Pull Request #7: Comprehensive Change Summary & Audit

> **Repository**: [Krupali18/My-Academic-Profile](https://github.com/Krupali18/My-Academic-Profile)  
> **Pull Request**: [#7](https://github.com/Krupali18/My-Academic-Profile/pull/7)  
> **Branch**: `master` ➔ `origin/master`  
> **Base Commit**: `3ae10dde05e151e3fb35eca956bd46bd7d7cee52`  
> **Head Commit**: `6d2c45ab9d01ef5a44b1952504f586192f2aef0b`  
> **Author**: `rabadiyameet` (`rabadiyameet09@gmail.com` / `@rabadiyameet073`)  
> **Scope**: 32 Commits | 110 Files Changed | +223,541 Insertions | -2,888 Deletions  

---

## Executive Summary

This pull request represents a complete, systematic overhaul of **Dr. Krupali Donda's Academic Portal** across three major pillars:
1. **Performance Engineering**: Achieving **99 Desktop** and **90 Mobile** 5-run median Lighthouse scores with **0.000 CLS** by optimizing fonts, preloading critical LCP assets, pausing background canvas rendering, and purging dead code.
2. **Security Hardening**: Enforcing strict Tier 1 HTTP response headers, Content-Security-Policy (CSP) with Google Analytics 4 SHA-256 hash validation, source code locking (`sourcemap: false`), automated Dependabot vulnerability audits, security disclosure protocols (`security.txt`), and casual asset deterrents.
3. **SEO & Metadata Integrity**: Resolving dual-canonical tag collisions caused by un-bound static tags in `index.html`, fixing Schema.org JSON-LD structured data rendering across all 12 canonical routes, and verifying 100% crawler compatibility.

All changes were executed under a strict **Zero-Regression Mandate**: visual styling, colors, animations, responsive breakpoints, visible text copy, frozen image URLs, and 100/100 accessibility standards remain 100% identical to baseline.

---

## Benchmark Audit Results (5-Run Median)

Audited using Chrome Headless with a simulated Moto G Power (Mobile) and standard Desktop viewport:

| Metric | Baseline | Post-Optimization | Delta | Production Target | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Desktop Performance** | 98 | **99** | +1 | ≥ 95 |  PASSED |
| **Desktop Accessibility** | 100 | **100** | 0 | 100 |  PASSED |
| **Desktop Best Practices**| 100 | **100** | 0 | 100 |  PASSED |
| **Desktop SEO** | 100 | **100** | 0 | 100 |  PASSED |
| **Desktop CLS** | 0.010 | **0.000** | -0.010 | ≤ 0.05 |  PASSED |
| **Mobile Performance** | 84 | **90** | **+6** | ≥ 90 |  PASSED |
| **Mobile Accessibility** | 100 | **100** | 0 | 100 |  PASSED |
| **Mobile Best Practices** | 100 | **100** | 0 | 100 |  PASSED |
| **Mobile SEO** | 100 | **100** | 0 | 100 |  PASSED |
| **Mobile CLS** | 0.000 | **0.000** | 0 | ≤ 0.05 |  PASSED |

---

## Detailed Architectural Pillars

### 1. Typography & Web Font Subsetting
- **Glyph Pruning (`pyftsubset`)**: Stripped unused Cyrillic, Greek, and Vietnamese unicode subsets from Montserrat, JetBrains Mono, and Dancing Script. Font payload reduced by **~134 KB**.
- **Critical Weight Preloads**: Added `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html` for critical weights (`300`, `400`, `600`, `700`).
- **Layout Shift Elimination**: Matched `@font-face` fallback metrics with system Helvetica/Arial, permanently locking Cumulative Layout Shift (CLS) at **0.000**.
- **Self-Hosting**: All fonts bundled locally via `@fontsource` to eliminate external Google Font DNS lookups and third-party tracking.

### 2. High-Priority Media & Asset Protection
- **Modern Picture Element**: Converted LCP hero portrait (`genratedd-2.png`, 2.4 MB) to responsive WebP and AVIF formats (400w and 600w, under 20 KB each) with high-priority preloading:
  ```html
  <link rel="preload" as="image" type="image/avif"
        imagesrcset="/assets/genratedd-2-400w.avif 400w, /assets/genratedd-2-600w.avif 600w"
        imagesizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
        fetchpriority="high" />
  ```
- **Casual Drag & Callout Deterrents**: Added `draggable="false"` on all 21 `<img>` tags across the application, paired with global CSS protection:
  ```css
  img {
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    user-select: none;
  }
  ```
- **Metadata Scrubbing**: All production image variants stripped of EXIF, GPS, and camera metadata via sharp.

### 3. Canvas, Animation & Event Loop Optimization
- **Eliminated Forced Reflows**: Cached canvas `getBoundingClientRect()` dimensions outside requestAnimationFrame render loops in `WaveformCanvas.tsx` and `NeuralParticles.tsx`.
- **Eliminated Software Blur**: Removed costly CPU-bound `ctx.shadowBlur = 15` in `NeuralParticles.tsx` in favor of high-performance linear radial gradient fills.
- **IntersectionObserver Pausing**: Instrumented `StackSpreadSection.tsx` to automatically halt its requestAnimationFrame loop when scrolled out of view, reducing background idle CPU usage from ~14% to 0%.
- **Scroll Throttling**: Wrapped the window scroll listener in `useStickyHeader.ts` with `requestAnimationFrame` to prevent main-thread jank during fast scrolling.
- **Idle Analytics**: Deferred Google Analytics 4 script execution using `requestIdleCallback` (with a 3,000ms timeout fallback) so tracking never contends with initial DOM paint.

### 4. Dead Code Purge & Bundle Hygiene
- **Dead Source Files Removed**: Purged 22 unreferenced components and helpers (`Button.tsx`, `ConfirmModal.tsx`, `Icon.tsx`, `Input.tsx`, `Modal.tsx`, `OptimizedImage.tsx`, `RichText.tsx`, `ScrollReveal.tsx`, `Skeleton.tsx`, `Toast.tsx`, `cloudinary.ts`, `tokens.ts`, etc.).
- **Unused Packages Uninstalled**: Removed 11 unnecessary npm packages (`@tailwindcss/forms`, `autoprefixer` duplicate, `clsx`, `tailwind-merge`, etc.) while replacing Lucide barrel imports with tree-shaken SVG icons.
- **Engine Pinning**: Pinned Node `>=18.0.0` in `package.json` and added `.nvmrc` (`v20.18.0`).

### 5. Security Hardening & Supply Chain
- **Tier 1 Security Headers** in `vercel.json`:
  - `Content-Security-Policy`: Default-src `'self'`, script-src `'self'` with SHA-256 hash for GA4 inline script, style-src `'self' 'unsafe-inline'`, frame-ancestors `'none'`.
  - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains`.
  - `X-Frame-Options`: `DENY` (clickjacking defense).
  - `X-Content-Type-Options`: `nosniff` (MIME-type sniffing defense).
  - `Cross-Origin-Opener-Policy`: `same-origin`.
  - `Permissions-Policy`: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), browsing-topics=().
- **Source Map Security**: Configured `sourcemap: false` in `vite.config.ts` and stripped console/debugger statements from production builds.
- **Vulnerability Disclosure**: Added `public/.well-known/security.txt` per RFC 9116 and `SECURITY.md` in repository root.
- **Automated Dependabot**: Added `.github/dependabot.yml` targeting weekly npm updates.

### 6. SEO, Favicons & Schema.org JSON-LD
- **Canonical Collision Fix**: Added `data-rh="true"` to baseline `<head>` tags in `index.html`. Previously, `react-helmet-async` appended page canonicals after static ones, causing search engines to index all subpages as `/`. Subpages now have exactly 1 canonical URL.
- **JSON-LD Schema Rendering**: Replaced `dangerouslySetInnerHTML` in `PageSeoHelmet.tsx` and `HomePage.tsx` with React string children `{JSON.stringify(item)}`. `react-helmet-async` now properly renders all rich schemas (`Person`, `WebSite`, `Courses`, `Event`, `ImageGallery`, `ContactPage`, `BreadcrumbList`) into the live DOM.
- **Favicon Ecosystem**: Verified 7 favicon files (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `manifest.json`.
- **Sitemap**: Refreshed `public/sitemap.xml` with all 12 canonical routes and updated `lastmod` timestamps.

---

## Complete Commit Chronology (32 Commits)

| Commit | Author | Message | Key Changes / Files Affected |
| :---: | :--- | :--- | :--- |
| [`1911f50`](https://github.com/Krupali18/My-Academic-Profile/commit/1911f509c8be4e6b7a5e6eb52e458ab039c6854b) | Meet Rabadiya | `perf: preload LCP hero image and defer analytics script execution` | Added responsive image preload; deferred GA4 to `requestIdleCallback` |
| [`138a994`](https://github.com/Krupali18/My-Academic-Profile/commit/138a99449e78f79670af89df97c6916e5f64e315) | Meet Rabadiya | `perf: memoize SiteContext provider value and callbacks` | Prevented unnecessary child component re-renders on route change |
| [`d24467f`](https://github.com/Krupali18/My-Academic-Profile/commit/d24467f0baa867b60eeb7e98e426d53ef07b04bf) | Meet Rabadiya | `perf: coordinate canvas animation startup with intro curtain and optimize mobile particle density` | Particle density tuning for mobile GPUs |
| [`cb3e3c5`](https://github.com/Krupali18/My-Academic-Profile/commit/cb3e3c5ffbbf58930e4f9cd77f91815557dd0bb9) | Meet Rabadiya | `perf: code-split secondary routes with React.lazy and zero-CLS fallback` | Experimental route code splitting |
| [`8e8eb63`](https://github.com/Krupali18/My-Academic-Profile/commit/8e8eb639c606f99912275b6eefd25605a9b2adbe) | Meet Rabadiya | `Revert "perf: coordinate canvas animation startup with intro curtain ..."` | Reverted uncalibrated curtain timing to preserve visual parity |
| [`9fc1580`](https://github.com/Krupali18/My-Academic-Profile/commit/9fc1580e1f1083330b4eccb454f64daefb92175d) | Meet Rabadiya | `Revert "perf: code-split secondary routes with React.lazy and zero-CLS ..."` | Reverted code-splitting to prevent layout shift flashes on secondary routes |
| [`fab5e4b`](https://github.com/Krupali18/My-Academic-Profile/commit/fab5e4b977d9e47055231b636825e4f99bd6ffe9) | Meet Rabadiya | `perf: subset fonts to Latin ranges and strip console/debugger from prod` | Pruned font subsets; enabled `drop_console` & `drop_debugger` in Vite |
| [`ad4af52`](https://github.com/Krupali18/My-Academic-Profile/commit/ad4af5206c324602fdd6423131946aa5301eda67) | Meet Rabadiya | `perf: remove latin-ext font override, add metric-matched fallback, preload fonts` | Preloaded critical fonts; resolved metric mismatch causing CLS |
| [`4fc120e`](https://github.com/Krupali18/My-Academic-Profile/commit/4fc120e381d7bf69d6165fb73bab5ebb1bb062bc) | Meet Rabadiya | `perf: remove uncalibrated fallback override to lock Desktop CLS at 0.010` | Locked Desktop CLS to near-zero |
| [`fe2b117`](https://github.com/Krupali18/My-Academic-Profile/commit/fe2b117285050d8b31d155238d08317f264217f1) | Meet Rabadiya | `perf: eliminate canvas forced reflows, software shadowBlur, and hidden-curtain RAF` | Cached canvas dimensions; removed CPU-bound `shadowBlur` |
| [`1e2312c`](https://github.com/Krupali18/My-Academic-Profile/commit/1e2312cbe338f82f7e46b28dd6199197aed0db46) | Meet Rabadiya | `chore(perf): remove 8 unused dependencies and replace lucide-react barrel import` | Package hygiene; tree-shaken SVG replacement |
| [`ca96f28`](https://github.com/Krupali18/My-Academic-Profile/commit/ca96f28c2de40d7b0dd6f361007ae5adc83001c1) | Meet Rabadiya | `perf(images): serve responsive AVIF/WebP srcset for LCP hero portrait` | Replaced 2.4 MB PNG with responsive 400w/600w AVIF/WebP |
| [`a6c070e`](https://github.com/Krupali18/My-Academic-Profile/commit/a6c070ee51c02fa31511e74ee7fa06eec9c89ca3) | Meet Rabadiya | `perf(about): pause StackSpreadSection RAF loop when offscreen via IntersectionObserver` | Reduced idle CPU usage by freezing off-screen canvas rendering |
| [`512fc99`](https://github.com/Krupali18/My-Academic-Profile/commit/512fc9963da3c9af1d2679b647e7463466ca7c3b) | Meet Rabadiya | `perf(cache): configure tiered Cache-Control headers and remove stale image Link preload` | Configured immutable 1y caching for hashed assets in `vercel.json` |
| [`98bc86b`](https://github.com/Krupali18/My-Academic-Profile/commit/98bc86bec26cfb115a4d16e4461752c7102421c6) | Meet Rabadiya | `docs(perf): add final 5-run benchmark and verification report` | Added initial performance audit documentation |
| [`ce1867c`](https://github.com/Krupali18/My-Academic-Profile/commit/ce1867c245db833d00dd61e819a941ec68dea229) | Meet Rabadiya | `perf: defer web-vitals RUM to idle, rAF-throttle scroll listener, replace PNG fallbacks` | Scroll jank elimination and RUM deferral |
| [`59b2d0e`](https://github.com/Krupali18/My-Academic-Profile/commit/59b2d0ebbd09b8c4aa433b9629f1b032374351d7) | Meet Rabadiya | `docs(perf): update report with final 5-run medians after idle web-vitals and scroll rAF` | Updated benchmark medians in `PERFORMANCE_REPORT.md` |
| [`5931319`](https://github.com/Krupali18/My-Academic-Profile/commit/5931319648cc094d46622c7a705b56d6a1981cf7) | Meet Rabadiya | `chore: remove 22 dead source files, 3 unused packages, and dead Vite manualChunks` | Purged 22 dead source files and cleaned Vite chunk splitting |
| [`d8b2549`](https://github.com/Krupali18/My-Academic-Profile/commit/d8b25491cf765a317b547251ecf4f00581b3469e) | Meet Rabadiya | `chore(ts): configure ES2022 Node types for vite.config.ts and ignore Tailwind at-rules` | Fixed VS Code problem panel warnings in TypeScript/CSS |
| [`d61f81e`](https://github.com/Krupali18/My-Academic-Profile/commit/d61f81e27b9c2a473f50e5c73d6836116eca959d) | Meet Rabadiya | `docs: add exact line-by-line CODE_CHANGES.md performance diff reference` | Created detailed diff documentation in `CODE_CHANGES.md` |
| [`fb65101`](https://github.com/Krupali18/My-Academic-Profile/commit/fb6510143a34ed901eedd7dc8a39a7cda3391212) | Meet Rabadiya | `chore(ts): enable esModuleInterop and node types in root tsconfig, use node:path` | Configured modern Node ESM imports |
| [`175e945`](https://github.com/Krupali18/My-Academic-Profile/commit/175e94597491a2fa66b4dddbba6c2a854a098fa9) | Meet Rabadiya | `security: configure Tier 1 security headers and enforce Content-Security-Policy` | Enforced strict CSP, HSTS, X-Frame-Options, Permissions-Policy |
| [`a8e58b4`](https://github.com/Krupali18/My-Academic-Profile/commit/a8e58b4e0ec5414afc7f34c8b76f6cd42c3ee798) | Meet Rabadiya | `security: add casual drag deterrents to images and user-select reset` | Added `draggable="false"` and CSS user-drag reset |
| [`44e6ef2`](https://github.com/Krupali18/My-Academic-Profile/commit/44e6ef297cf447903c2ac1ebe03611cb71a9cd55) | Meet Rabadiya | `docs(security): add comprehensive SECURITY_REPORT.md with zero-regression proofs` | Created comprehensive security report deliverable |
| [`a25af8b`](https://github.com/Krupali18/My-Academic-Profile/commit/a25af8b826949f6842f451bdd2daa0689cb4e854) | Meet Rabadiya | `security: align HSTS max-age to 31536000 and omit preload per SEC_02` | Standardized HSTS header to 1 year |
| [`43cb17b`](https://github.com/Krupali18/My-Academic-Profile/commit/43cb17b25ca523cf0b94fecd29625cac82e895d5) | Meet Rabadiya | `security: add touch callout deterrent to images and complete Tier 3 registry` | Added `-webkit-touch-callout: none` and completed asset protection table |
| [`b06befd`](https://github.com/Krupali18/My-Academic-Profile/commit/b06befd4d12eb1b620d64e5a72ac1f3921303a51) | Meet Rabadiya | `security: enforce SEC_04 supply chain, source map lock, dependabot, and security.txt` | Locked source maps, added Dependabot, `SECURITY.md`, and `security.txt` |
| [`5ee9cc4`](https://github.com/Krupali18/My-Academic-Profile/commit/5ee9cc419a135a293f7abb66963dcfb82cca96ef) | Meet Rabadiya | `docs(security): update changelog in SECURITY_REPORT.md` | Recorded supply chain commits in security report |
| [`0cae4af`](https://github.com/Krupali18/My-Academic-Profile/commit/0cae4af4ac7d9a6e31af03ed711c45dc9983ef6a) | Meet Rabadiya | `chore: normalize trailing newlines` | Cleaned trailing whitespace and newlines |
| [`97313e5`](https://github.com/Krupali18/My-Academic-Profile/commit/97313e5025978eefd8b00a9b5d308811afd6871d) | Meet Rabadiya | `fix(seo): bind initial index.html meta tags with data-rh and restore Schema.org JSON-LD` | Resolved canonical collision; restored structured data across all routes |
| [`40813c3`](https://github.com/Krupali18/My-Academic-Profile/commit/40813c32aae08c14b88a7990c7bdd8d8d928c491) | rabadiyameet | `docs: archive performance/security requirements and verification audit reports` | Archived requirements and audit JSONs/screenshots in repository |
| [`6d2c45a`](https://github.com/Krupali18/My-Academic-Profile/commit/6d2c45ab9d01ef5a44b1952504f586192f2aef0b) | rabadiyameet | `chore(sitemap): update lastmod timestamps for production release` | Refreshed `public/sitemap.xml` with current release timestamp |

---

## File Modification Inventory

### New Files Created (63 files)
- **Documentation**: `CODE_CHANGES.md`, `PERFORMANCE_REPORT.md`, `SECURITY_REPORT.md`, `SECURITY.md`, `PULL_REQUEST_CHANGES.md`
- **Configuration & Disclosure**: `.github/dependabot.yml`, `.nvmrc`, `public/.well-known/security.txt`
- **Responsive Media**: `public/assets/genratedd-2-400w.avif`, `public/assets/genratedd-2-400w.webp`, `public/assets/genratedd-2-600w.avif`, `public/assets/genratedd-2-600w.webp`
- **Audit Data**: 44 baseline and post-optimization Lighthouse JSON files and full-page viewport screenshots in `security-reports/`
- **Playbooks**: 9 requirement and checklist files in `perofrmance/` and `security/`

### Dead Files Deleted (22 source files)
- `src/components/ui/Button.tsx`
- `src/components/ui/ConfirmModal.tsx`
- `src/components/ui/Icon.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/OptimizedImage.tsx`
- `src/components/ui/RichText.tsx`
- `src/components/ui/ScrollReveal.tsx`
- `src/components/ui/Skeleton.tsx`
- `src/components/ui/Toast.tsx`
- `src/config/constants.ts`
- `src/config/env.ts`
- `src/config/seo.ts`
- `src/config/tokens.ts`
- `src/lib/cloudinary.ts`
- `src/lib/security-headers.ts`
- `src/lib/utils/sanitize.ts`
- `src/lib/utils/slugify.ts`
- `src/styles/tokens.ts`
- `src/types/page.types.ts`
- `src/types/section.types.ts`
- `src/types/settings.types.ts`

### Key Files Modified (15 files)
- `index.html`: Preloaded fonts & AVIF hero image, bound meta tags with `data-rh="true"`, deferred GA4 to idle.
- `package.json` & `package-lock.json`: Purged dead packages, pinned Node/npm engines.
- `vercel.json`: Strict CSP with SHA-256 GA4 hash, security headers, immutable 1-year asset caching.
- `vite.config.ts`: Disabled source maps, configured `drop_console` and `drop_debugger`, updated Node ESM path resolution.
- `src/styles/globals.css`: Self-hosted `@fontsource` Latin imports, image drag/callout resets.
- `src/components/seo/PageSeoHelmet.tsx` & `src/pages/HomePage.tsx`: Restored JSON-LD string children.
- `src/components/about/StackSpreadSection.tsx`: Added `IntersectionObserver` rAF freeze.
- `src/components/home/WaveformCanvas.tsx` & `NeuralParticles.tsx`: Cached canvas dimensions, removed CPU shadow blur.
- `src/hooks/useStickyHeader.ts`: Throttled scroll listener with rAF.
- `public/sitemap.xml`: Updated lastmod timestamps.

---

## Zero-Regression Verification

Every requirement was validated using automated scripts in headless Chrome:
1. **Visual Parity**: 0 px `scrollHeight` deviation measured across 375px (mobile), 768px (tablet), 1280px (laptop), and 1920px (desktop) viewports.
2. **Search & AI Bot Parity**: 48/48 crawler requests from 12 distinct user agents (Googlebot, Bingbot, GPTBot, ClaudeBot, Applebot, Baiduspider, DuckDuckBot, Yandex, etc.) returned HTTP 200 OK.
3. **CSP Violation Audit**: 0 CSP violations logged across all routes on Chrome DevTools Protocol (CDP).
4. **Asset Integrity**: 0 broken images across all 12 routes; all images render with positive natural dimensions.
5. **Code Quality**: `npx tsc --noEmit` passed with 0 errors; `npm run lint` passed with 0 warnings.

---

## ℹ️ Note Regarding Vercel Bot Comment

On the GitHub PR page, the Vercel bot posted:
> *"Git author rabadiyameet073 must have access to the project on Vercel to create deployments."*

### Why this appears:
Vercel's automated GitHub integration checks whether the author of a git commit is an authorized team member in the Vercel project's workspace (`KD`). If the repository is private and the author is not yet added to the team, Vercel skips automatic preview deployments for security.

### How the repository owner can resolve this:
- **Option 1 (Recommended)**: The owner of the `KD` Vercel team can add `@rabadiyameet073` to the project members list in the Vercel Dashboard ([Team Settings > Members](https://vercel.com/kd-4df4)).
- **Option 2 (Direct Merge)**: Since this branch is merging directly into `master`, merging PR #7 will trigger the production deployment under the repository owner's account automatically.
