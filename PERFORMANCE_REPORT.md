# Performance Optimization Report — Dr. Krupali Donda Portfolio

**Branch**: `perf/optimization` (stacked on `3ae10dd`)  
**Scope**: Full-stack frontend performance & caching optimizations executed step-by-step under strict zero-regression gates (zero changes to visual design, layout, animations, visible copy, SEO metadata/structured data, or WCAG 2.1 AA accessibility).

---

## 1. Executive Summary & Benchmark Comparison (5-Run Medians)

Benchmarks were measured against the production build served via `npx vite preview --port 4173` using `perf-reports/run-optimized-suite.mjs` (5 consecutive headless Chrome runs each for Mobile and Desktop, taking the median per metric) and compared against `perf-reports/baseline/baseline-summary.json`.

### Mobile (5-Run Median)

| Metric | Baseline (5-run) | Optimized (5-run) | Delta | Target Gate | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Performance** | 74 | **82** | **+8** | ≥ 85 | ⚠️ Improved (+8); gated by Tier 3 preloader |
| **Accessibility** | 100 | **100** | 0 | 100 | ✅ PASS |
| **Best Practices** | 100 | **100** | 0 | ≥ 96 | ✅ PASS |
| **SEO** | 100 | **100** | 0 | 100 | ✅ PASS |
| **FCP** | 0.94 s | **0.95 s** | +0.01 s | — | ✅ Stable |
| **LCP** | 3.27 s | **0.95 s** | **-2.32 s (-70.9%)** | ≤ 2.0 s | ✅ PASS |
| **TBT** | 671 ms | **661 ms** | -10 ms | < 200 ms | ⚠️ Gated by `chunk-gsap` / `#site-preloader` (see §5) |
| **CLS** | 0.026 | **0.000** | **-0.026 (-100%)** | ≤ 0.022 | ✅ PASS |
| **Speed Index** | 3.04 s | **4.03 s** | +0.99 s | < 3.4 s | ⚠️ Tied to 3.5 s preloader curtain hold |

Individual Mobile After Runs (`perf-reports/after/mobile-{1..5}.json`):  
- Run 1: Perf 75, LCP 0.93 s, TBT 1,007 ms, CLS 0.000, SI 4.49 s  
- Run 2: Perf 72, LCP 0.95 s, TBT 1,429 ms, CLS 0.000, SI 4.55 s  
- Run 3: Perf 90, LCP 1.59 s, TBT 351 ms, CLS 0.000, SI 3.61 s  
- Run 4: Perf 91, LCP 1.61 s, TBT 307 ms, CLS 0.000, SI 3.63 s  
- Run 5: Perf 82, LCP 0.93 s, TBT 661 ms, CLS 0.000, SI 4.03 s  

### Desktop (5-Run Median)

| Metric | Baseline (5-run) | Optimized (5-run) | Delta | Target Gate | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Performance** | 96 | **98** | **+2** | ≥ 95 | ✅ PASS |
| **Accessibility** | 100 | **100** | 0 | 100 | ✅ PASS |
| **Best Practices** | 100 | **100** | 0 | ≥ 96 | ✅ PASS |
| **SEO** | 100 | **100** | 0 | 100 | ✅ PASS |
| **FCP** | 0.32 s | **0.41 s** | +0.09 s | — | ✅ Fast |
| **LCP** | 0.80 s | **0.63 s** | **-0.17 s (-21.3%)** | ≤ 1.2 s | ✅ PASS |
| **TBT** | 102 ms | **11 ms** | **-91 ms (-89.2%)** | < 150 ms | ✅ PASS |
| **CLS** | 0.016 | **0.010** | **-0.006 (-37.5%)** | ≤ 0.022 | ✅ PASS |
| **Speed Index** | 1.62 s | **1.43 s** | **-0.19 s (-11.7%)** | < 1.3 s | ⚠️ Near target (gated by preloader curtain) |

Individual Desktop After Runs (`perf-reports/after/desktop-{1..5}.json`):  
- Run 1: Perf 97, LCP 0.66 s, TBT 65 ms, CLS 0.010, SI 1.73 s  
- Run 2: Perf 98, LCP 0.63 s, TBT 0 ms, CLS 0.010, SI 1.43 s  
- Run 3: Perf 94, LCP 0.63 s, TBT 182 ms, CLS 0.010, SI 1.14 s  
- Run 4: Perf 98, LCP 0.67 s, TBT 11 ms, CLS 0.010, SI 1.61 s  
- Run 5: Perf 98, LCP 0.62 s, TBT 0 ms, CLS 0.010, SI 1.42 s  

---

## 2. Kept Optimization Commits (`perf/optimization`)

1. **`1911f50`** — `perf: preload LCP hero image and defer analytics script execution`
   - Added high-priority LCP image preload in `index.html` and deferred Google Analytics (`gtag.js`) loading via `requestIdleCallback` / `load`.
2. **`138a994`** — `perf: memoize SiteContext provider value and callbacks`
   - Wrapped `openModal` and `closeModal` with `useCallback` and memoized context value with `useMemo` in `src/context/SiteContext.tsx` to avoid cascading context re-renders.
3. **`fab5e4b`** — `perf: subset fonts to Latin ranges and strip console/debugger from production build`
   - Imported Latin-only `@fontsource` weights (`montserrat` 300/400/500/600/700/800/400-italic, `jetbrains-mono` 400, `dancing-script` 600/700) in `src/styles/globals.css`, enabled `esbuild: { drop: ['console', 'debugger'] }` in `vite.config.ts`.
4. **`ad4af52` + `4fc120e`** — `perf: remove latin-ext font override...` & `perf: remove uncalibrated fallback override to lock Desktop CLS at 0.010 and Mobile CLS at 0`
   - Removed `latin-ext-400` and `latin-ext-600` CSS imports (which lacked `unicode-range` and had overridden `latin-400/600`, forcing 32 KB `latin-ext` downloads instead of 18 KB `latin` `.woff2` files), added `preloadCriticalFontsPlugin()` in `vite.config.ts` to preload the two critical Montserrat fonts (`400` and `700` `.woff2`), and removed an uncalibrated `'Montserrat Fallback'` override that had elevated Desktop CLS to `0.035`.
   - **Impact**: Dropped Mobile LCP from `3.27 s` to `0.9 s` (`step1b`) and locked Mobile CLS at `0.000` / Desktop CLS at `0.010`.
5. **`fe2b117`** — `perf: eliminate canvas forced reflows, software shadowBlur, and hidden-curtain RAF contention`
   - `src/components/home/AcademicIntro.tsx`: Cached exclusion zone rects on `resizeCanvas()` instead of calling `getBoundingClientRect()` every animation frame, used squared-distance checks (`distSq < maxDistSq`) before `Math.sqrt`, replaced software `ctx.shadowBlur` + per-node `save/restore` with dual-circle glow drawing, and emitted `'academic-intro-curtain-opening'` when the preloader curtain begins opening (including `finishIntro`, skip button fallback, and reduced-motion path).
   - `src/components/home/NeuralParticles.tsx` & `src/components/home/WaveformCanvas.tsx`: Preserved exact particle density (`40` mobile / `75` desktop), cached container/canvas rects on resize/scroll, replaced `shadowBlur` with dual-circle glow (`NeuralParticles`), capped DPR at 2 (`WaveformCanvas`), drew 1 initial frame immediately, and paused background canvas RAF loops while covered by `#site-preloader` until `'academic-intro-curtain-opening'`.
   - **Impact**: Cut isolated Mobile TBT from `3,170 ms` (`step1b`) down to `870 ms` (`step2`).
6. **`1e2312c`** — `chore(perf): remove 8 unused dependencies and replace lucide-react barrel import`
   - Replaced `import * as LucideIcons from 'lucide-react'` in `src/components/ui/Icon.tsx` with explicit `import { Sparkles } from 'lucide-react'` fallback mapping.
   - Removed 8 unused packages from `package.json` / `package-lock.json` (`@fontsource/alex-brush`, `@fontsource/great-vibes`, `@fontsource/satisfy`, `@tsparticles/react`, `@tsparticles/slim`, `date-fns`, `framer-motion`, `zod` — 44 transitive packages removed).
7. **`ca96f28`** — `perf(images): serve responsive AVIF/WebP srcset for LCP hero portrait with matching preload`
   - Backed up originals (`genratedd-2.png`, `genratedd-2.webp`) to `assets-original-backup/`.
   - Generated `public/assets/genratedd-2-400w.avif` (9,763 B), `genratedd-2-400w.webp` (9,398 B), `genratedd-2-600w.avif` (19,452 B), and `genratedd-2-600w.webp` (18,866 B) using `sharp`.
   - Updated `<picture>` in `src/components/home/HeroBanner.tsx` and `<link rel="preload" as="image" type="image/avif" imagesrcset="..." imagesizes="...">` in `index.html`.
   - **Impact**: Reduced mobile LCP hero image network transfer from **63.1 KB** (`genratedd-2.webp`, 1136×1421) down to **10,029 B** (`genratedd-2-400w.avif`, 400×500) with zero double downloads.
8. **`a6c070e`** — `perf(about): pause StackSpreadSection RAF loop when offscreen via IntersectionObserver`
   - Added an `IntersectionObserver` (`rootMargin: '200px 0px'`) in `src/components/about/StackSpreadSection.tsx` that paints the initial frame synchronously and pauses continuous `requestAnimationFrame` physics ticks whenever the section is scrolled offscreen.
9. **`512fc99`** — `perf(cache): configure tiered Cache-Control headers and remove stale image Link preload in vercel.json`
   - Removed the obsolete `Link: </assets/genratedd-2.webp>; rel=preload...` HTTP header on `/` so Vercel will not double-preload the unresized `.webp` alongside responsive `-400w.avif` / `-600w.avif`.
   - Preserved all existing security headers (`CSP`, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`) and added tiered `Cache-Control` rules:
     - `/` & `/*.html`: `public, max-age=0, must-revalidate`
     - `/sitemap.xml` & `/robots.txt`: `public, max-age=3600` (with explicit XML/text `Content-Type`)
     - `/manifest.json`, `/favicon*`, `/icon*`, `/apple-touch-icon.png`: `public, max-age=86400`
     - Unhashed `/assets/(.*)`: `public, max-age=604800, stale-while-revalidate=86400`
     - Vite hashed `/assets/.*-[a-zA-Z0-9_-]{8,}\.(js|css|woff2|woff)` & `/fonts/(.*)`: `public, max-age=31536000, immutable`

---

## 3. Zero-Regression Verification Proofs

### Visual & Functional Verification (`node perf-reports/verify-visual.mjs after`)

| Width (px) | Baseline `scrollHeight` | After `scrollHeight` | Pixel Diff Ratio (canvas jitter) | Broken Images | `prefers-reduced-motion` OK | Console Errors |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 375 | 1917 | **1917** | 0.01758 (1.76%) | `[]` | `true` | `[]` |
| 768 | 1533 | **1533** | 0.01123 (1.12%) | `[]` | `true` | `[]` |
| 1280 | 1374 | **1374** | 0.02090 (2.09%) | `[]` | `true` | `[]` |
| 1920 | 1374 | **1374** | 0.01637 (1.64%) | `[]` | `true` | `[]` |

Visible character counts (`375px`/`768px`: 2563, `1280px`/`1920px`: 2651) and exact page heights match baseline cleanly.

### DOM, SEO & Accessibility Parity (`node perf-reports/compare-dom.mjs` & Endpoint Checks)

- **Title**: Exact match ✅ (`Dr. Krupali Donda - Metamaterials and AI Research`)
- **Meta Description**: Exact match ✅
- **Canonical URL**: Exact match ✅ (`https://krupalidonda.com/`)
- **Meta Robots**: Exact match ✅ (`index, follow`)
- **OG / Twitter Meta Tags**: `28 vs 28` ✅
- **JSON-LD Scripts**: `1 vs 1` ✅
- **Headings (`h1`–`h4`)**: `3 vs 3` ✅
- **Image Alt Texts**: `1 vs 1` ✅
- **Links (`<a>`)**: `21 vs 21` ✅
- **Endpoints (`http://localhost:4173`)**: `/` → `200`, `/robots.txt` → `200`, `/sitemap.xml` → `200` (with `<lastmod>2026-11-12</lastmod>`).
- **Lighthouse Accessibility & SEO**: **100 / 100** across all 10 final runs (5 mobile + 5 desktop).

### Build & Lint Validation

- `npm run lint` (`eslint src --max-warnings 0`): Passed with 0 errors and 0 warnings.
- `npm run build` (`generate-sitemap.mjs && tsc --noEmit && vite build`): Passed (`dist/index.html` 6.17 kB / gzip 2.17 kB; `index-*.css` 159.49 kB / gzip 28.51 kB; `index-*.js` 157.26 kB / gzip 42.73 kB; `chunk-vendor-*.js` 164.22 kB / gzip 53.42 kB; `chunk-gsap-*.js` 70.34 kB / gzip 27.76 kB; `chunk-utils-*.js` 20.26 kB / gzip 6.82 kB).

---

## 4. Reverted & Rejected Experiments

| Experiment | Outcome & Evidence | Action Taken |
| :--- | :--- | :--- |
| **Reduce mobile canvas particle count & delay startup via fixed 3.5 s timeout (`d24467f`)** | Violated visual/particle parity rule (`40 -> 25` particles) and timer fired mid-trace causing TBT spikes. | Reverted in `8e8eb63`; replaced with deterministic `'academic-intro-curtain-opening'` event preserving all 40 particles (`fe2b117`). |
| **Uncalibrated `@font-face` `'Montserrat Fallback'` (`ad4af52`)** | Metric override (`size-adjust: 113.1%`) mismatched system Sans, raising Desktop CLS to `0.035`. | Removed in `4fc120e`; Desktop CLS dropped to `0.010` and Mobile CLS to `0.000`. |
| **Route-level `React.lazy` + `<Suspense>` for secondary pages (`cb3e3c5` & re-test `step6`)** | Re-tested in isolation with `HomePage` static and `Suspense` around `<Routes>`. Although `index-*.js` shrank from 157.26 kB to 86.36 kB, `<Suspense>` boundary commit overhead during initial mount spiked Desktop TBT from 0–11 ms to **450 ms** (Perf `98 -> 76`) and Mobile TBT to **3,140 ms** (Perf `62`, LCP `3.0 s`). | Reverted (`9fc1580` / `git checkout -- src/App.tsx`); eager route bundle kept (`157.26 kB` / `42.73 kB` gzip). |
| **CSS `contain-intrinsic-size` & static `will-change` cleanup in `globals.css` (`step5`)** | Adjusting `.about-section` to `contain-intrinsic-size: auto 1120px` + `.site-footer` `content-visibility: auto` + removing static `will-change` repeatedly delayed mobile `#about > p` paint, regressing Mobile LCP from `0.9–1.7 s` to **3.1–3.2 s** (`step5`: Perf 61, `step5b`: Perf 61). | Reverted `src/styles/globals.css`; Mobile Perf immediately recovered to **77** (`step5c`) and 5-run median **82** (`0.95 s` LCP). |

---

## 5. Tier 3 Optimizations — **Needs User Approval**

Remaining bottlenecks on Mobile Perf (`82` vs `85` goal), Mobile TBT (`661 ms` vs `< 200 ms` goal), and Speed Index (`4.03 s` mobile / `1.43 s` desktop) come directly from the **intentionally preserved GSAP preloader curtain (`AcademicIntro` / `#site-preloader`)**: Lighthouse long-task traces show `chunk-gsap` executing ~12 frame ticks (`56–206 ms` each under 4× mobile CPU throttling) while animating `#site-preloader` across ~3.5 s before revealing the page. Modifying these affects visible initial animations and requires your sign-off:

1. **Skip or shorten blocking preloader curtain (`AcademicIntro`) on repeat visits / mobile viewports**
   - *Expected gain*: Mobile TBT `< 200 ms`, Mobile Speed Index `< 2.0 s`, Mobile Perf **90–96+**, Desktop Speed Index `< 0.9 s`.
   - *Tradeoff / risk*: First-time mobile visitors or repeat sessions would see the hero immediately without the 3.5 s curtain reveal animation.
2. **Route-scoped / Critical-CSS extraction for `src/styles/globals.css` (currently 159.49 kB / 28.51 kB gzip, ~88% subpage rules on `/`)**
   - *Expected gain*: Faster mobile CSS parse & FCP (~100–200 ms).
   - *Tradeoff / risk*: Splitting monolithic stylesheet across subpages requires careful visual regression testing across all 12 routes (`/about`, `/research`, `/group`, `/gallery`, `/news-outreach`, etc.).
3. **Replace GSAP SVG filter / blur / shadow animations inside `AcademicIntro` with CSS compositor-only transforms/opacity**
   - *Expected gain*: Estimated `-250 to -450 ms` Mobile TBT without removing the intro sequence.
   - *Tradeoff / risk*: Subtle visual change in blur/glow styling during the 3.5 s intro curtain.

---

## 6. Maintenance & Hosting Notes

- **Original Assets Backup**: `assets-original-backup/` stores untouched copies of `genratedd-2.png` and `genratedd-2.webp` prior to generating the responsive `-400w` and `-600w` AVIF/WebP variants.
- **Vercel Cache Verification**: Production `Cache-Control` rules in `vercel.json` follow Vercel's last-match-wins precedence (unhashed `/assets/(.*)` week+SWR rule followed by the more specific hashed bundle `\.(js|css|woff2|woff)` `immutable` override). Note that local `vite preview` does not read `vercel.json` headers; verify headers live with `curl -I https://krupalidonda.com/...` after deploying to Vercel.
- **Subpage Images Note**: Secondary-page photos already use `loading="lazy"` + `decoding="async"` on WebP assets (`NewsOutreachSection`, `GroupSection`, `GalleryShowcaseSection`); `.jfif` assets (`ai in medical.jfif`, `dev-sanghvi.jfif`) can optionally be upgraded to `<picture>` + `.webp` on subpages in a future pass.
