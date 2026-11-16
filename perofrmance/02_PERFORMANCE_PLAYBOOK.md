# PERFORMANCE PLAYBOOK (React site, zero visual change)

Main problem: **Total Blocking Time 870 ms**. FCP/LCP/CLS are already good.
Priority is **reduce JavaScript work on the main thread during and right after load**, then **reduce image weight and offscreen work**.

Golden principle: **defer and optimise the work, never remove what the user sees.**

---

## TIER 1: Zero visual risk (do all)

### 1.1 Bundle hygiene
- Run a bundle visualizer (`vite-bundle-visualizer`, `webpack-bundle-analyzer`, `source-map-explorer`, or `@next/bundle-analyzer`).
- Fix **whole-library imports**:
  ```js
  // BAD
  import _ from 'lodash';
  import * as Icons from 'react-icons/fa';
  // GOOD
  import debounce from 'lodash/debounce';          // or lodash-es
  import { FaArrowRight } from 'react-icons/fa';
  ```
- Run `npx depcheck` and **remove dependencies that are not used anywhere**.
- Remove duplicate packages (check `npm ls <pkg>`), and dead code or unused components that are still bundled.
- Build target modern browsers (`es2020`) and remove unneeded polyfills (Vite: `build.target`; CRA/webpack: `browserslist`). Keep support at least as broad as the current `browserslist`, unless approved.
- Strip `console.*` and `debugger` from the production build.
- Confirm production minification and tree-shaking are on (`NODE_ENV=production`, `sideEffects` flags where safe).

### 1.2 Animation libraries: change the *import*, not the *effect*
- **Framer Motion:** use `LazyMotion` + the `m` component so the animation engine is not in the main chunk:
  ```jsx
  import { LazyMotion, domAnimation, m } from 'framer-motion';
  // wrap the app once; replace <motion.div> with <m.div> everywhere
  <LazyMotion features={domAnimation} strict>...</LazyMotion>
  ```
  If drag or layout animations are used, use `domMax`, or load features asynchronously. Keep all props (`initial`, `animate`, `transition`, `variants`) **exactly** the same.
- **GSAP:** import only the plugins that are used. Register them once. Kill ScrollTriggers and timelines on unmount (`gsap.context()` + `ctx.revert()`). Do not create many separate ScrollTriggers where `ScrollTrigger.batch` gives the same result.
- **Lottie:** `import('lottie-web/build/player/lottie_light')` dynamically when the animation is near the viewport, if the animation features allow the light build. Pause animations that are off-screen.
- **Three.js / canvas / particles / heavy visuals:** dynamic `import()` after first paint, and pause the render loop when off-screen or when the tab is hidden.
- Do not delay an animation *so much* that its start is visible to the user. Use `rootMargin` (e.g. `600px`) so work starts **before** the element scrolls into view.

### 1.3 Scroll / mouse / resize handlers
- Replace `window.addEventListener('scroll', …)` that only checks "is element visible" with **IntersectionObserver**.
- Remaining listeners must be `{ passive: true }` and throttled with `requestAnimationFrame`.
- **Never call `setState` on every scroll/mousemove event.** Write to a ref, or set a CSS variable (`el.style.setProperty('--x', v)`) and let CSS do the work.
- Don't read layout (`offsetHeight`, `getBoundingClientRect`) and write styles in the same loop. Batch reads, then writes.
- Remove observers/listeners in cleanup.

### 1.4 Break up long tasks (>50 ms)
- Anything heavy at startup (data parsing, large `.map()` renders, library init) should be:
  - moved after first paint: `requestIdleCallback` (with `setTimeout` fallback), or
  - split into chunks that yield to the browser: `await (scheduler.yield?.() ?? new Promise(r => setTimeout(r)))`, or
  - wrapped in `startTransition` if it is a non-urgent React update.
- Never defer anything the user needs to see or interact with in the first viewport.

### 1.5 Images: loading behaviour (no change to what is shown)
- **Hero / LCP image:** never lazy. Add `fetchpriority="high"` and `<link rel="preload" as="image" … fetchpriority="high">` in the HTML head (with `imagesrcset`/`imagesizes` if responsive).
- **Every below-the-fold `<img>`:** `loading="lazy"` and `decoding="async"`.
- **Every `<img>`:** explicit `width` and `height` attributes (or CSS `aspect-ratio`) that match the displayed ratio, so no layout shift appears.
- Images in **CSS `background-image`** are not lazy-loaded by the browser. For below-the-fold ones, use an IntersectionObserver that adds a class when near the viewport, or move to `<img>` only if it is visually identical.
- Don't change `alt` text, object-fit or the displayed size.

### 1.6 Fonts (same fonts, loaded better)
- Self-host fonts as **WOFF2**; avoid blocking third-party font CSS where possible.
- `font-display: swap` (or `optional` only if approved, because it can change the look).
- Preload only the 1 to 2 critical fonts used above the fold:
  `<link rel="preload" as="font" type="font/woff2" crossorigin href="…">`
- Subset to the used character ranges (e.g. Latin) **only if** every used character stays covered.
- Add a metric-matched fallback (`size-adjust`, `ascent-override`) to avoid font-swap layout shift.

### 1.7 Third-party scripts (analytics, chat, pixels, embeds)
- Load with `async` or `defer`, or inject after the `load` event / on first interaction / idle.
- Heavy embeds (YouTube, maps, social feeds): use a **facade** (a static preview with identical look that loads the real embed on click/near viewport), only if the visual is identical. Otherwise lazy-load the iframe (`loading="lazy"`).
- Add `preconnect` only for origins that are used early (max 3 to 4).
- Remove third-party scripts that are no longer used (ask first if unsure).

### 1.8 CSS
- Remove unused CSS (PurgeCSS / Tailwind content config) **only after verifying with screenshots**, including hover/focus/active states and dynamic classes.
- Inline critical CSS only if the framework does it safely. Avoid render-blocking CSS imports that are not needed for first paint.
- **`content-visibility: auto` + `contain-intrinsic-size`** on large below-the-fold sections is one of the biggest wins for rendering/Speed Index and does not change the look:
  ```css
  .below-fold-section {
    content-visibility: auto;
    contain-intrinsic-size: auto 800px; /* use the REAL measured height */
  }
  ```
  Content stays in the DOM, so it stays searchable and accessible. Use accurate heights, or the scrollbar will jump. Do **not** apply to sections that contain in-page anchor targets or sticky/fixed children without testing.

### 1.9 Best Practices (96 → 100) if safe
Open the Lighthouse "Best Practices" audit, find the failed item(s) (commonly: console errors, deprecated APIs, images with wrong aspect ratio, missing source maps, `http` resources, third-party cookies), and fix **only** the safe ones.

---

## TIER 2: Low risk (do, but verify each one with screenshot diff + CLS)

### 2.1 Route / section code-splitting
- `React.lazy` + `Suspense` for routes and heavy **below-the-fold** sections.
- Fallback must have the **same height** as the real section to avoid CLS:
  ```jsx
  const Testimonials = lazy(() => import('./sections/Testimonials'));
  <Suspense fallback={<div style={{ minHeight: 640 }} aria-hidden="true" />}>
    <Testimonials />
  </Suspense>
  ```
- **SEO guard:** if a section holds important text or headings, **don't** gate it behind scroll visibility. Code-split it but mount it on idle after load (`requestIdleCallback`) so the text is in the DOM without scrolling. For pure visual or decorative sections, mount near-viewport (IntersectionObserver with a generous `rootMargin` such as `800px`).
- Reusable helper:
  ```jsx
  function MountWhenNear({ children, minHeight, rootMargin = '800px' }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setShow(true); io.disconnect(); }
      }, { rootMargin });
      io.observe(ref.current);
      return () => io.disconnect();
    }, [rootMargin]);
    return <div ref={ref} style={show ? undefined : { minHeight }}>{show ? children : null}</div>;
  }
  ```

### 2.2 Start animations only when visible
- Heavy continuous animations (looping Lottie, canvas, marquee, parallax) should start when they approach the viewport and pause when they leave. The look when visible must be identical.
- Animate only `transform` and `opacity`. If an existing animation uses `top/left/width/height/margin`, flag it in the report. Converting it is Tier 3 unless the result is pixel-identical.
- Use `will-change` only on elements that are actually animating, and remove it afterwards. Don't put it on dozens of elements.

### 2.3 Image encoding (visually lossless)
- Keep the **original file in backup**. Generate **AVIF + WebP + original fallback** with `<picture>`, or the framework's image pipeline if one already exists:
  ```html
  <picture>
    <source type="image/avif" srcset="a-480.avif 480w, a-960.avif 960w, a-1600.avif 1600w" sizes="(min-width:1024px) 50vw, 100vw">
    <source type="image/webp" srcset="a-480.webp 480w, a-960.webp 960w, a-1600.webp 1600w" sizes="(min-width:1024px) 50vw, 100vw">
    <img src="a-960.jpg" width="960" height="640" alt="(unchanged alt)" loading="lazy" decoding="async">
  </picture>
  ```
- Quality guide: WebP q≈80–85, AVIF q≈60–70 (cq-level ≈ 20–28), mozjpeg q≈80–85. **Compare against the original at 100% zoom** (SSIM ≥ 0.98 or visual diff). If any image shows banding, blur or artifacts, increase quality or keep the original.
- Never serve an image **larger** than its displayed size × device pixel ratio (max 2x). Provide `srcset` + correct `sizes`.
- Keep transparency, colour profile and sharpness for logos/illustrations. Prefer SVG optimisation (SVGO, **keeping `viewBox`, `title`, `desc`, ids needed by CSS/JS**) for vector art.

### 2.3b Re-render control (only where the profiler proves it)
- Use React DevTools Profiler. Fix only *measured* hot spots:
  `React.memo`, `useMemo`/`useCallback` for stable props, splitting a huge context so unrelated consumers don't re-render, moving state down, stable `key`s, virtualising very long lists.
- Don't sprinkle memoisation everywhere. It adds cost.

### 2.4 Resource hints
- `preconnect` to the CDN/font/analytics origins used in the first seconds; `dns-prefetch` for the rest.
- `modulepreload` for critical chunks if the bundler doesn't do it.
- Avoid preloading more than 2 to 3 things (it competes with the LCP image).

---

## TIER 3: NEEDS APPROVAL (describe only, do NOT implement)

- Replacing an animation library or rewriting JS animations as CSS.
- Converting GIF → MP4/WebM `<video>` (the element changes, even if the look is the same).
- Moving to SSR/SSG/prerendering (Next.js, `react-snap`, `vite-ssg`), or changing the framework.
- Reducing the number of animated elements, simplifying parallax, or changing animation timing.
- Lowering image dimensions below what the layout shows, or any lossy change that is visible at 100% zoom.
- Removing a third-party script or dependency whose purpose is unclear.
- Changing `font-display` to `optional`, or removing a font weight.
- A service worker (see `03_CACHING_AND_DELIVERY.md`).

For each, write: *what, expected gain, risk, how to verify.*

---

## What most likely causes TBT 870 ms here (investigate in this order)
1. Animation libraries initialising everything at once (GSAP/Framer/AOS/Lottie/particles).
2. All home-page sections hydrating/mounting immediately, including ones far below the fold.
3. Big vendor chunk (unused library code, whole icon sets, lodash/moment).
4. Many scroll/mouse listeners or `setState` per scroll event.
5. Third-party scripts (analytics, chat, pixels).
6. Large JSON/data processed or many components rendered in one go.
7. Decoding a very large number of big images at once.
8. Dev-only code or extra polyfills in the production bundle.

Always confirm with the trace/profiler before fixing. Don't guess.
