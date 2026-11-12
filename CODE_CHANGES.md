# Code Changes Reference — Performance Optimization (`perf/optimization`)

Exact line-by-line code diffs applied across the codebase (commits `1911f50` through `d8b2549`), plus deleted dead modules and optional Tier 3 snippets.

---

## 1. `index.html`

Preload the responsive AVIF LCP hero portrait with matching `imagesrcset`/`imagesizes` and defer GA4 initialization until `requestIdleCallback` / `load`.

```diff
--- a/index.html
+++ b/index.html
@@ -29,6 +29,16 @@
     <link rel="preconnect" href="https://formspree.io" crossorigin />
     <link rel="dns-prefetch" href="https://res.cloudinary.com" />
 
+    <!-- Preload LCP hero portrait image with responsive AVIF srcset and high fetchpriority -->
+    <link
+      rel="preload"
+      as="image"
+      type="image/avif"
+      imagesrcset="/assets/genratedd-2-400w.avif 400w, /assets/genratedd-2-600w.avif 600w"
+      imagesizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
+      fetchpriority="high"
+    />
+
     <!-- Open Graph Defaults (homepage) -->
     <meta property="og:type" content="profile" />
     <meta property="og:site_name" content="Dr. Krupali Donda" />
@@ -79,21 +89,27 @@
       }
     </style>
 
-    <!-- Google Analytics 4 — loads async, non-blocking -->
+    <!-- Google Analytics 4 — deferred to idle time to protect main thread during initial load -->
     <script>
-      // Read GA ID from meta tag or fall back gracefully if not configured
       (function() {
         var gaId = 'G-XXXXXXXXXX'; // Replace with your real GA4 Measurement ID
         if (!gaId || gaId === 'G-XXXXXXXXXX') return; // Skip if not configured
-        var s = document.createElement('script');
-        s.async = true;
-        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
-        document.head.appendChild(s);
-        window.dataLayer = window.dataLayer || [];
-        function gtag(){dataLayer.push(arguments);}
-        window.gtag = gtag;
-        gtag('js', new Date());
-        gtag('config', gaId);
+        function loadGA() {
+          var s = document.createElement('script');
+          s.async = true;
+          s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
+          document.head.appendChild(s);
+          window.dataLayer = window.dataLayer || [];
+          function gtag(){dataLayer.push(arguments);}
+          window.gtag = gtag;
+          gtag('js', new Date());
+          gtag('config', gaId);
+        }
+        if ('requestIdleCallback' in window) {
+          window.requestIdleCallback(loadGA, { timeout: 3000 });
+        } else {
+          window.addEventListener('load', loadGA, { once: true });
+        }
       })();
     </script>
   </head>
```

---

## 2. `src/components/home/HeroBanner.tsx`

Serve `400w` / `600w` AVIF + WebP sources matched to the rendered portrait slot (`135px` / `180px` / `280px`).

```diff
--- a/src/components/home/HeroBanner.tsx
+++ b/src/components/home/HeroBanner.tsx
@@ -12,16 +12,24 @@ export const HeroBanner: React.FC = () => {
       <div className="hero-banner-content">
         <div className="hero-banner-image reveal active">
           <picture>
-            <source srcSet="/assets/genratedd-2.webp" type="image/webp" />
+            <source
+              srcSet="/assets/genratedd-2-400w.avif 400w, /assets/genratedd-2-600w.avif 600w"
+              sizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
+              type="image/avif"
+            />
+            <source
+              srcSet="/assets/genratedd-2-400w.webp 400w, /assets/genratedd-2-600w.webp 600w"
+              sizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
+              type="image/webp"
+            />
             <img
-              src="/assets/genratedd-2.webp"
+              src="/assets/genratedd-2-600w.webp"
               alt="Dr. Krupali Donda — Assistant Professor at Adani University"
               decoding="async"
               loading="eager"
               fetchPriority="high"
               width={280}
               height={380}
-              sizes="(max-width: 768px) 200px, 280px"
             />
           </picture>
         </div>
```

Generated image files in `public/assets/`:
- `genratedd-2-400w.avif` (9,763 B)
- `genratedd-2-400w.webp` (9,398 B)
- `genratedd-2-600w.avif` (19,452 B)
- `genratedd-2-600w.webp` (18,866 B)

---

## 3. `src/styles/globals.css`

Subset `@fontsource` imports to Latin character ranges (eliminating non-Latin glyph files and un-ranged `latin-ext` overrides).

```diff
--- a/src/styles/globals.css
+++ b/src/styles/globals.css
@@ -1,15 +1,15 @@
-/* PERF-01: Self-hosted fonts via @fontsource — eliminates Google Fonts network request.
-   Fonts are bundled with the app: no external DNS lookup, no FOIT, no CORS overhead. */
-@import '@fontsource/montserrat/300.css';
-@import '@fontsource/montserrat/400.css';
-@import '@fontsource/montserrat/500.css';
-@import '@fontsource/montserrat/600.css';
-@import '@fontsource/montserrat/700.css';
-@import '@fontsource/montserrat/800.css';
-@import '@fontsource/montserrat/400-italic.css';
-@import '@fontsource/jetbrains-mono/400.css';
-@import '@fontsource/dancing-script/600.css';
-@import '@fontsource/dancing-script/700.css';
+/* PERF-01: Self-hosted fonts via @fontsource (Latin subsets).
+   Eliminates unused Cyrillic/Greek/Vietnamese and avoids un-ranged latin-ext overrides. */
+@import '@fontsource/montserrat/latin-300.css';
+@import '@fontsource/montserrat/latin-400.css';
+@import '@fontsource/montserrat/latin-500.css';
+@import '@fontsource/montserrat/latin-600.css';
+@import '@fontsource/montserrat/latin-700.css';
+@import '@fontsource/montserrat/latin-800.css';
+@import '@fontsource/montserrat/latin-400-italic.css';
+@import '@fontsource/jetbrains-mono/latin-400.css';
+@import '@fontsource/dancing-script/latin-600.css';
+@import '@fontsource/dancing-script/latin-700.css';
```

---

## 4. `vite.config.ts` & `tsconfig.node.json`

Preload the 2 critical Montserrat Latin `.woff2` files, drop `console.*`/`debugger` in production, remove dead chunk splits, and configure ES2022 + Node types for Vite config.

```diff
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -1,12 +1,44 @@
-import { defineConfig } from 'vite';
+import { defineConfig, type Plugin } from 'vite';
 import react from '@vitejs/plugin-react';
 import path from 'path';
 import { visualizer } from 'rollup-plugin-visualizer';
 
+/**
+ * Injects <link rel="preload" as="font"> tags for the 2 critical above-the-fold
+ * Latin Montserrat WOFF2 weights so they start downloading before CSS is parsed.
+ */
+function preloadCriticalFontsPlugin(): Plugin {
+  return {
+    name: 'preload-critical-fonts',
+    enforce: 'post',
+    transformIndexHtml: {
+      order: 'post',
+      handler(html, ctx) {
+        if (!ctx.bundle) return html;
+        const criticalPatterns = [
+          /montserrat-latin-400-normal-[^/]+\.woff2$/,
+          /montserrat-latin-700-normal-[^/]+\.woff2$/,
+        ];
+        const links: string[] = [];
+        for (const fileName of Object.keys(ctx.bundle)) {
+          if (criticalPatterns.some((re) => re.test(fileName))) {
+            links.push(
+              `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/${fileName}" />`
+            );
+          }
+        }
+        if (links.length === 0) return html;
+        return html.replace('</head>', `${links.join('\n')}\n  </head>`);
+      },
+    },
+  };
+}
+
 // https://vitejs.dev/config/
 export default defineConfig({
   plugins: [
     react(),
+    preloadCriticalFontsPlugin(),
     ...(process.env.ANALYZE === 'true'
       ? [
           visualizer({
@@ -28,6 +60,9 @@ export default defineConfig({
     port: 3000,
     open: false,
   },
+  esbuild: {
+    drop: ['console', 'debugger'],
+  },
   build: {
     target: 'esnext',
     // H10 FIX: Lowered from 800 to 500 — this forces us to notice if chunks get too big
@@ -37,24 +72,9 @@ export default defineConfig({
       output: {
         manualChunks(id: string) {
           if (id.includes('node_modules')) {
-            // H11 FIX: Split the monolithic 'animations' chunk into three separate
-            // lazy-loadable chunks (gsap / framer-motion / tsparticles).
-            // Previously all 3 were bundled together into one ~880KB raw chunk.
-            // Now each page only loads the animation library it actually needs.
             if (id.includes('gsap')) {
               return 'chunk-gsap';
             }
-            if (id.includes('framer-motion')) {
-              return 'chunk-framer';
-            }
-            if (id.includes('@tsparticles') || id.includes('tsparticles')) {
-              return 'chunk-particles';
-            }
-
-            // Core UI icons — Lucide is tree-shaken but put in a stable chunk
-            if (id.includes('lucide-react')) {
-              return 'chunk-icons';
-            }
 
             // Core React runtime + routing — always needed, cache-stable
             if (
@@ -66,17 +86,8 @@ export default defineConfig({
               return 'chunk-vendor';
             }
 
-            // DOMPurify — security utility, stable cache fingerprint
-            if (id.includes('isomorphic-dompurify') || id.includes('dompurify')) {
-              return 'chunk-dompurify';
-            }
-
             // Utility libraries — infrequently updated, good caching
-            if (
-              id.includes('date-fns') ||
-              id.includes('clsx') ||
-              id.includes('tailwind-merge')
-            ) {
+            if (id.includes('clsx') || id.includes('tailwind-merge')) {
               return 'chunk-utils';
             }
           }
```

```diff
--- a/tsconfig.node.json
+++ b/tsconfig.node.json
@@ -2,8 +2,11 @@
   "compilerOptions": {
     "composite": true,
     "skipLibCheck": true,
+    "target": "ES2022",
+    "lib": ["ES2022"],
     "module": "ESNext",
     "moduleResolution": "bundler",
+    "types": ["node"],
     "allowSyntheticDefaultImports": true,
     "strict": true
   },
```

---

## 5. `src/components/home/AcademicIntro.tsx`, `NeuralParticles.tsx`, & `WaveformCanvas.tsx`

Eliminate per-frame `getBoundingClientRect()` reflows, guard `Math.sqrt` with squared distance checks, replace software `ctx.shadowBlur` + per-node `save()/restore()` with dual-circle rendering, cap DPR at 2, and pause background canvases behind `#site-preloader` until `'academic-intro-curtain-opening'`.

```diff
--- a/src/components/home/AcademicIntro.tsx
+++ b/src/components/home/AcademicIntro.tsx
@@ -57,6 +57,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
       }
       document.body.style.removeProperty('overflow');
       onComplete?.();
+      window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
       return;
     }
 
@@ -93,6 +94,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
     let xPoints: number[] = [];
     let envelopes: number[] = [];
     let baseFreqs: number[] = [];
+    let cachedZone = { left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0 };
 
     function getExclusionZone() {
       if (!identityRef.current) return { left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0 };
@@ -123,6 +125,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
       canvas.width = canvasW * dpr;
       canvas.height = canvasH * dpr;
       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
+      cachedZone = getExclusionZone();
 
       xPoints = [];
       envelopes = [];
@@ -203,7 +206,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
       }
 
       const warpFactor = animState.warp;
-      const zone = getExclusionZone();
+      const zone = cachedZone;
 
       // ── 1. 3D Metamaterial Acoustic Waveform ──────────────────────────────
       if (animState.waveAlpha > 0.005 && xPoints.length > 0) {
@@ -279,6 +282,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
 
       // ── 2. Neural Constellation & Synaptic Mesh ───────────────────────────
       const maxDist = 180;
+      const maxDistSq = maxDist * maxDist;
       const activeLinks: Array<{ a: NeuralNode; b: NeuralNode }> = [];
 
       for (let i = 0; i < nodes.length; i++) {
@@ -306,16 +310,17 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
         if (isMouseActive) {
           const mdx = a.x - mouseX;
           const mdy = a.y - mouseY;
-          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
+          const mDistSq = mdx * mdx + mdy * mdy;
 
-          if (mdist < 160) {
-            const factor = 1 - mdist / 160;
-            a.currentRadius = a.radius + factor * 2.2;
-          } else {
-            a.currentRadius += (a.radius - a.currentRadius) * 0.1;
-          }
+          if (mDistSq < 36100) {
+            const mdist = Math.sqrt(mDistSq);
+            if (mdist < 160) {
+              const factor = 1 - mdist / 160;
+              a.currentRadius = a.radius + factor * 2.2;
+            } else {
+              a.currentRadius += (a.radius - a.currentRadius) * 0.1;
+            }
 
-          if (mdist < 190) {
             const mAlpha = (1 - mdist / 190) * 0.6;
             ctx.beginPath();
             ctx.moveTo(mouseX, mouseY);
@@ -323,6 +328,8 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
             ctx.strokeStyle = `rgba(59, 130, 246, ${mAlpha})`;
             ctx.lineWidth = 1.1;
             ctx.stroke();
+          } else {
+            a.currentRadius += (a.radius - a.currentRadius) * 0.1;
           }
         } else {
           a.currentRadius += (a.radius - a.currentRadius) * 0.1;
@@ -332,9 +339,10 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
           const b = nodes[j];
           const dx = a.x - b.x;
           const dy = a.y - b.y;
-          const dist = Math.sqrt(dx * dx + dy * dy);
+          const distSq = dx * dx + dy * dy;
 
-          if (dist < maxDist) {
+          if (distSq < maxDistSq) {
+            const dist = Math.sqrt(distSq);
             const norm = 1 - dist / maxDist;
             const alpha = Math.max(0, (0.05 + 0.32 * norm) * (1 - warpFactor * 0.85));
 
@@ -374,14 +382,16 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
         const sx = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
         const sy = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;
 
-        ctx.save();
+        // Glow halo without expensive per-frame shadowBlur Gaussian filter
+        ctx.beginPath();
+        ctx.arc(sx, sy, 5.2, 0, Math.PI * 2);
+        ctx.fillStyle = 'rgba(59, 130, 246, 0.32)';
+        ctx.fill();
+
         ctx.beginPath();
         ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
         ctx.fillStyle = '#ffffff';
-        ctx.shadowColor = '#3B82F6';
-        ctx.shadowBlur = 10;
         ctx.fill();
-        ctx.restore();
       }
 
       // ── 4. Render Metamaterial Nodes ──
@@ -391,13 +401,13 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
         const r = n.currentRadius || n.radius;
 
         // Outer soft glow halo
+        ctx.globalAlpha = 1;
         ctx.beginPath();
         ctx.arc(n.x, n.y, r * 2.2, 0, Math.PI * 2);
         ctx.fillStyle = `${n.color}1a`;
         ctx.fill();
 
         // Main body
-        ctx.save();
         ctx.globalAlpha = 0.75 * nodeAlpha;
         ctx.beginPath();
         ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
@@ -410,8 +420,8 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
         ctx.arc(n.x - r * 0.25, n.y - r * 0.25, r * 0.35, 0, Math.PI * 2);
         ctx.fillStyle = '#ffffff';
         ctx.fill();
-        ctx.restore();
       }
+      ctx.globalAlpha = 1;
 
       animFrameId = requestAnimationFrame(renderCanvasScene);
     }
@@ -499,6 +509,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
       }
 
       if (onComplete) onComplete();
+      window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
     }
 
     // ── Main Continuous FLIP Morph Sequence ──────────────────────────────
@@ -671,6 +682,9 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
       );
 
       // 5. Background Curtain: Silky-smooth aperture cross-fade
+      tl.add(() => {
+        window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
+      }, 'going+=0.70');
       tl.to(
         curtain,
         {
@@ -877,6 +891,7 @@ export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
             if (preloaderRef.current) {
               preloaderRef.current.style.display = 'none';
             }
+            window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
             const brand = document.getElementById('site-nav-brand');
             if (brand) brand.style.opacity = '1';
             if (onComplete) onComplete();
```

```diff
--- a/src/components/home/NeuralParticles.tsx
+++ b/src/components/home/NeuralParticles.tsx
@@ -34,6 +34,13 @@ export const NeuralParticles: React.FC = () => {
     let height = 0;
     let isVisible = true;
     let isTabVisible = !document.hidden;
+    let isCurtainBlocking = Boolean(
+      (() => {
+        const p = document.getElementById('site-preloader');
+        return p && p.style.display !== 'none' && !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
+      })()
+    );
+    let containerRect = container.getBoundingClientRect();
 
     const palette = [
       { r: 37, g: 99, b: 235 }, // #2563EB
@@ -45,6 +52,10 @@ export const NeuralParticles: React.FC = () => {
     const particles: ParticleNode[] = [];
     const signals: SignalPacket[] = [];
 
+    function updateRect() {
+      if (container) containerRect = container.getBoundingClientRect();
+    }
+
     function resize() {
       if (!canvas || !container || !ctx) return;
       const dpr = Math.min(window.devicePixelRatio || 1, 2);
@@ -53,12 +64,14 @@ export const NeuralParticles: React.FC = () => {
       canvas.width = width * dpr;
       canvas.height = height * dpr;
       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
+      updateRect();
     }
 
     resize();
     window.addEventListener('resize', resize, { passive: true });
+    window.addEventListener('scroll', updateRect, { passive: true });
 
-    // Spawn 75 particles
+    // Spawn particles (40 mobile / 75 desktop — visually unchanged)
     const particleCount = width < 768 ? 40 : 75;
     for (let i = 0; i < particleCount; i++) {
       particles.push({
@@ -76,9 +89,8 @@ export const NeuralParticles: React.FC = () => {
     let mouseY = -1000;
 
     const onMouseMove = (e: MouseEvent) => {
-      const rect = container.getBoundingClientRect();
-      mouseX = e.clientX - rect.left;
-      mouseY = e.clientY - rect.top;
+      mouseX = e.clientX - containerRect.left;
+      mouseY = e.clientY - containerRect.top;
     };
 
     const onMouseLeave = () => {
@@ -90,7 +102,7 @@ export const NeuralParticles: React.FC = () => {
     container.addEventListener('mouseleave', onMouseLeave, { passive: true });
 
     function shouldAnimate() {
-      return isVisible && isTabVisible;
+      return isVisible && isTabVisible && !isCurtainBlocking;
     }
 
     function stop() {
@@ -106,7 +118,10 @@ export const NeuralParticles: React.FC = () => {
       }
     }
 
-    function render() {
+    const maxDistSq = 190 * 190;
+    const mouseDistSq = 160 * 160;
+
+    function drawFrame() {
       if (!ctx) return;
       ctx.clearRect(0, 0, width, height);
 
@@ -125,8 +140,9 @@ export const NeuralParticles: React.FC = () => {
         if (mouseX > 0) {
           const dx = p1.x - mouseX;
           const dy = p1.y - mouseY;
-          const dist = Math.sqrt(dx * dx + dy * dy);
-          if (dist < 160 && dist > 1) {
+          const distSq = dx * dx + dy * dy;
+          if (distSq < mouseDistSq && distSq > 1) {
+            const dist = Math.sqrt(distSq);
             const force = (1 - dist / 160) * 1.5;
             p1.x += (dx / dist) * force;
             p1.y += (dy / dist) * force;
@@ -137,9 +153,10 @@ export const NeuralParticles: React.FC = () => {
           const p2 = particles[j];
           const dx = p1.x - p2.x;
           const dy = p1.y - p2.y;
-          const dist = Math.sqrt(dx * dx + dy * dy);
+          const distSq = dx * dx + dy * dy;
 
-          if (dist < 190) {
+          if (distSq < maxDistSq) {
+            const dist = Math.sqrt(distSq);
             const alpha = (1 - dist / 190) * 0.48;
             ctx.beginPath();
             ctx.moveTo(p1.x, p1.y);
@@ -215,17 +232,26 @@ export const NeuralParticles: React.FC = () => {
         const sx = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
         const sy = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;
 
-        ctx.save();
+        // Soft glow halo without shadowBlur CPU overhead
+        ctx.beginPath();
+        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
+        ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
+        ctx.fill();
+
         ctx.beginPath();
         ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
         ctx.fillStyle = '#FFFFFF';
-        ctx.shadowColor = '#60A5FA';
-        ctx.shadowBlur = 8;
         ctx.fill();
-        ctx.restore();
       }
+    }
 
-      animId = requestAnimationFrame(render);
+    function render() {
+      drawFrame();
+      if (shouldAnimate()) {
+        animId = requestAnimationFrame(render);
+      } else {
+        animId = null;
+      }
     }
 
     // Pause when tab is hidden (saves CPU/GPU and battery)
@@ -249,10 +275,23 @@ export const NeuralParticles: React.FC = () => {
     );
     if (containerRef.current) observer.observe(containerRef.current);
 
-    start();
+    const onCurtainOpening = () => {
+      isCurtainBlocking = false;
+      start();
+    };
+
+    // Draw initial crisp frame immediately so hero is populated behind curtain
+    drawFrame();
+    if (isCurtainBlocking) {
+      window.addEventListener('academic-intro-curtain-opening', onCurtainOpening, { once: true });
+    } else {
+      start();
+    }
 
     return () => {
       stop();
+      window.removeEventListener('academic-intro-curtain-opening', onCurtainOpening);
+      window.removeEventListener('scroll', updateRect);
       document.removeEventListener('visibilitychange', onVisibilityChange);
       observer.disconnect();
       window.removeEventListener('resize', resize);
```

```diff
--- a/src/components/home/WaveformCanvas.tsx
+++ b/src/components/home/WaveformCanvas.tsx
@@ -20,20 +20,32 @@ export const WaveformCanvas: React.FC = () => {
     let animationFrameId: number | null = null;
     let isCanvasVisible = true;
     let isTabVisible = !document.hidden;
+    let isCurtainBlocking = Boolean(
+      (() => {
+        const p = document.getElementById('site-preloader');
+        return p && p.style.display !== 'none';
+      })()
+    );
     let step = 5;
+    let canvasRect = canvas.getBoundingClientRect();
 
     let xPoints: number[] = [];
     let envelopes: number[] = [];
     let baseFreqs: number[] = [];
 
+    function updateRect() {
+      if (canvas) canvasRect = canvas.getBoundingClientRect();
+    }
+
     function resizeCanvas() {
       if (!canvas || !ctx) return;
-      const dpr = window.devicePixelRatio || 1;
+      const dpr = Math.min(window.devicePixelRatio || 1, 2);
       width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
       height = canvas.parentElement ? canvas.parentElement.offsetHeight : 550;
       canvas.width = width * dpr;
       canvas.height = height * dpr;
       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
+      updateRect();
 
       xPoints = [];
       envelopes = [];
@@ -49,6 +61,7 @@ export const WaveformCanvas: React.FC = () => {
 
     resizeCanvas();
     window.addEventListener('resize', resizeCanvas, { passive: true });
+    window.addEventListener('scroll', updateRect, { passive: true });
 
     let mouseX = width / 2;
     let mouseY = height / 2;
@@ -59,9 +72,8 @@ export const WaveformCanvas: React.FC = () => {
 
     const parent = canvas.parentElement;
     const onMouseMove = (e: MouseEvent) => {
-      const rect = canvas.getBoundingClientRect();
-      targetMouseX = e.clientX - rect.left;
-      targetMouseY = e.clientY - rect.top;
+      targetMouseX = e.clientX - canvasRect.left;
+      targetMouseY = e.clientY - canvasRect.top;
       isHovering = true;
     };
     const onMouseLeave = () => {
@@ -76,7 +88,7 @@ export const WaveformCanvas: React.FC = () => {
     let time = 0;
 
     function shouldAnimate() {
-      return isCanvasVisible && isTabVisible;
+      return isCanvasVisible && isTabVisible && !isCurtainBlocking;
     }
 
     function stop() {
@@ -92,11 +104,8 @@ export const WaveformCanvas: React.FC = () => {
       }
     }
 
-    function draw() {
-      if (!ctx || !shouldAnimate()) {
-        animationFrameId = null;
-        return;
-      }
+    function drawFrame() {
+      if (!ctx) return;
 
       ctx.clearRect(0, 0, width, height);
 
@@ -160,6 +169,14 @@ export const WaveformCanvas: React.FC = () => {
       }
 
       time += 0.01;
+    }
+
+    function draw() {
+      if (!shouldAnimate()) {
+        animationFrameId = null;
+        return;
+      }
+      drawFrame();
       animationFrameId = requestAnimationFrame(draw);
     }
 
@@ -182,12 +199,24 @@ export const WaveformCanvas: React.FC = () => {
       else stop();
     };
 
+    const onCurtainOpening = () => {
+      isCurtainBlocking = false;
+      start();
+    };
+
     document.addEventListener('visibilitychange', onVisibilityChange);
-    start();
+    drawFrame();
+    if (isCurtainBlocking) {
+      window.addEventListener('academic-intro-curtain-opening', onCurtainOpening, { once: true });
+    } else {
+      start();
+    }
 
     return () => {
       stop();
+      window.removeEventListener('academic-intro-curtain-opening', onCurtainOpening);
       window.removeEventListener('resize', resizeCanvas);
+      window.removeEventListener('scroll', updateRect);
       document.removeEventListener('visibilitychange', onVisibilityChange);
       if (parent) {
         parent.removeEventListener('mousemove', onMouseMove);
```

---

## 6. `src/components/about/StackSpreadSection.tsx`

Pause offscreen RAF ticks with `IntersectionObserver` (`rootMargin: '200px 0px'`).

```diff
--- a/src/components/about/StackSpreadSection.tsx
+++ b/src/components/about/StackSpreadSection.tsx
@@ -276,13 +276,14 @@ export const StackSpreadSection: React.FC = () => {
     window.addEventListener('pointermove', handlePointerMove, { passive: true });
     document.addEventListener('pointerleave', handlePointerLeave);
 
-    let animId: number;
+    let animId: number = 0;
     let isRunning = true;
+    let isInView = true;
 
-    const tick = () => {
+    const tick = (scheduleNext = true) => {
       if (!wrapperRef.current || !isRunning) return;
-      // C7 FIX: Do NOT run animation loop when tab is hidden (saves CPU/battery)
-      if (document.hidden) return;
+      // Do NOT run continuous loop when tab is hidden or section is scrolled offscreen
+      if (document.hidden || (!isInView && scheduleNext)) return;
       const isMobile = window.innerWidth <= 768;
 
@@ -380,23 +381,58 @@ export const StackSpreadSection: React.FC = () => {
         el.style.transform = `translate(calc(-50% + ${dx}vw), calc(-50% + ${dy}vh)) rotate(${currentRotate}deg) scale(${currentScale})`;
       });
 
-      animId = requestAnimationFrame(tick);
+      if (scheduleNext && isInView && !document.hidden && isRunning) {
+        animId = requestAnimationFrame(() => tick(true));
+      }
     };
 
+    const startLoop = () => {
+      if (isRunning && isInView && !document.hidden) {
+        cancelAnimationFrame(animId);
+        animId = requestAnimationFrame(() => tick(true));
+      }
+    };
+
+    // Draw initial frame synchronously so initial card stack position is ready before intersection
+    tick(false);
+
+    const observer =
+      typeof IntersectionObserver !== 'undefined' && wrapperRef.current
+        ? new IntersectionObserver(
+            (entries) => {
+              const entry = entries[0];
+              if (!entry) return;
+              isInView = entry.isIntersecting;
+              if (isInView) {
+                startLoop();
+              } else {
+                cancelAnimationFrame(animId);
+              }
+            },
+            { rootMargin: '200px 0px' }
+          )
+        : null;
+
+    if (observer && wrapperRef.current) {
+      observer.observe(wrapperRef.current);
+    }
+
     // C7 FIX: Resume RAF loop when tab becomes visible again
     const onVisibilityChange = () => {
-      if (!document.hidden && isRunning) {
-        cancelAnimationFrame(animId);
-        animId = requestAnimationFrame(tick);
+      if (!document.hidden && isRunning && isInView) {
+        startLoop();
       }
     };
     document.addEventListener('visibilitychange', onVisibilityChange);
 
-    animId = requestAnimationFrame(tick);
+    if (!observer) {
+      startLoop();
+    }
 
     return () => {
       isRunning = false;
       cancelAnimationFrame(animId);
+      observer?.disconnect();
       document.removeEventListener('visibilitychange', onVisibilityChange);
       window.removeEventListener('pointermove', handlePointerMove);
       document.removeEventListener('pointerleave', handlePointerLeave);
```

---

## 7. `src/context/SiteContext.tsx`, `src/main.tsx`, & `src/hooks/useStickyHeader.ts`

Memoize context value/callbacks, defer `web-vitals` dynamic import until idle, and rAF-throttle passive scroll state updates.

```diff
--- a/src/context/SiteContext.tsx
+++ b/src/context/SiteContext.tsx
@@ -1,5 +1,5 @@
 import type { ReactNode } from 'react';
-import React, { createContext, useContext, useState, useEffect } from 'react';
+import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
 
 export interface SiteContextType {
   isMobile: boolean;
@@ -51,28 +51,31 @@ export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
   }, []);
 
 
-  const openModal = (modalId: string) => {
+  const openModal = useCallback((modalId: string) => {
     setActiveModal(modalId);
     // RELIABILITY-03 FIX: Use class instead of inline style to avoid conflicts
     // with AcademicIntro's own body overflow control
     document.body.classList.add('modal-open');
-  };
+  }, []);
 
-  const closeModal = () => {
+  const closeModal = useCallback(() => {
     setActiveModal(null);
     document.body.classList.remove('modal-open');
-  };
+  }, []);
+
+  const contextValue = useMemo(
+    () => ({
+      isMobile,
+      prefersReducedMotion,
+      activeModal,
+      openModal,
+      closeModal,
+    }),
+    [isMobile, prefersReducedMotion, activeModal, openModal, closeModal]
+  );
 
   return (
-    <SiteContext.Provider
-      value={{
-        isMobile,
-        prefersReducedMotion,
-        activeModal,
-        openModal,
-        closeModal,
-      }}
-    >
+    <SiteContext.Provider value={contextValue}>
       {children}
     </SiteContext.Provider>
   );
```

```diff
--- a/src/main.tsx
+++ b/src/main.tsx
@@ -1,7 +1,6 @@
 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import { App } from './App';
-import { initWebVitals } from './lib/analytics';
 import './styles/globals.css';
 
 ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
@@ -10,6 +9,21 @@ ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   </React.StrictMode>
 );
 
-// Start Core Web Vitals RUM monitoring
-initWebVitals();
+// Defer Core Web Vitals RUM monitoring until idle after first paint
+const scheduleWebVitals = () => {
+  import('./lib/analytics')
+    .then(({ initWebVitals }) => initWebVitals())
+    .catch(() => {
+      // Analytics non-critical
+    });
+};
+
+if (typeof window !== 'undefined') {
+  if ('requestIdleCallback' in window) {
+    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
+      .requestIdleCallback(scheduleWebVitals, { timeout: 3000 });
+  } else {
+    setTimeout(scheduleWebVitals, 1500);
+  }
+}
```

```diff
--- a/src/hooks/useStickyHeader.ts
+++ b/src/hooks/useStickyHeader.ts
@@ -28,7 +28,9 @@ export function useStickyHeader(
   useEffect(() => {
     if (typeof window === 'undefined') return;
 
-    const handleScroll = (): void => {
+    let rafId = 0;
+    const updateScrollState = (): void => {
+      rafId = 0;
       const scrollY = window.scrollY;
       setIsScrolled((prev) => {
         if (!prev && scrollY > threshold) return true;
@@ -37,11 +39,17 @@ export function useStickyHeader(
       });
     };
 
+    const handleScroll = (): void => {
+      if (rafId !== 0) return;
+      rafId = window.requestAnimationFrame(updateScrollState);
+    };
+
     window.addEventListener('scroll', handleScroll, { passive: true });
-    handleScroll();
+    updateScrollState();
 
     return () => {
       window.removeEventListener('scroll', handleScroll);
+      if (rafId !== 0) window.cancelAnimationFrame(rafId);
     };
   }, [threshold, resetThreshold]);
```

---

## 8. `vercel.json`

Configure tiered HTTP `Cache-Control` rules and remove the outdated `/assets/genratedd-2.webp` `Link` preload.

```diff
--- a/vercel.json
+++ b/vercel.json
@@ -6,17 +6,31 @@
     {
       "source": "/sitemap.xml",
       "headers": [
-        { "key": "Content-Type", "value": "application/xml; charset=utf-8" }
+        { "key": "Content-Type", "value": "application/xml; charset=utf-8" },
+        { "key": "Cache-Control", "value": "public, max-age=3600" }
       ]
     },
     {
       "source": "/robots.txt",
       "headers": [
-        { "key": "Content-Type", "value": "text/plain; charset=utf-8" }
+        { "key": "Content-Type", "value": "text/plain; charset=utf-8" },
+        { "key": "Cache-Control", "value": "public, max-age=3600" }
+      ]
+    },
+    {
+      "source": "/(manifest\\.json|favicon\\.ico|favicon-.*|icon-.*|apple-touch-icon\\.png)",
+      "headers": [
+        { "key": "Cache-Control", "value": "public, max-age=86400" }
       ]
     },
     {
       "source": "/assets/(.*)",
+      "headers": [
+        { "key": "Cache-Control", "value": "public, max-age=604800, stale-while-revalidate=86400" }
+      ]
+    },
+    {
+      "source": "/assets/.*-[a-zA-Z0-9_-]{8,}\\.(js|css|woff2|woff)",
       "headers": [
         { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
       ]
@@ -36,10 +50,7 @@
     {
       "source": "/",
       "headers": [
-        {
-          "key": "Link",
-          "value": "</assets/genratedd-2.webp>; rel=preload; as=image; type=image/webp"
-        }
+        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
       ]
     },
```

---

## 9. `package.json` & Deleted Dead Source Modules

Removed **11 unused runtime dependencies** (`@fontsource/alex-brush`, `@fontsource/great-vibes`, `@fontsource/satisfy`, `@tsparticles/react`, `@tsparticles/slim`, `date-fns`, `framer-motion`, `zod`, `isomorphic-dompurify`, `lucide-react`, `react-hot-toast`), added `@types/node` to `devDependencies`, and deleted **22 unreachable source files** (2,130 lines), shrinking Tailwind CSS output from `159.49 kB` to `120.64 kB`:

```diff
--- a/package.json
+++ b/package.json
@@ -15,31 +15,21 @@
     "generate-sitemap": "node scripts/generate-sitemap.mjs"
   },
   "dependencies": {
-    "@fontsource/alex-brush": "^5.3.0",
     "@fontsource/dancing-script": "^5.3.0",
-    "@fontsource/great-vibes": "^5.3.0",
     "@fontsource/jetbrains-mono": "^5.3.0",
     "@fontsource/montserrat": "^5.3.0",
-    "@fontsource/satisfy": "^5.3.0",
-    "@tsparticles/react": "^3.0.0",
-    "@tsparticles/slim": "^3.5.0",
     "clsx": "^2.1.1",
-    "date-fns": "^3.6.0",
-    "framer-motion": "^13.4.4",
     "gsap": "^3.12.5",
-    "isomorphic-dompurify": "^2.12.0",
-    "lucide-react": "^0.395.0",
     "react": "^18.3.1",
     "react-dom": "^18.3.1",
     "react-helmet-async": "^3.0.0",
-    "react-hot-toast": "^2.4.1",
     "react-router-dom": "^6.24.0",
     "tailwind-merge": "^2.3.0",
-    "web-vitals": "^6.2.2",
-    "zod": "^3.23.8"
+    "web-vitals": "^6.2.2"
   },
   "devDependencies": {
     "@tailwindcss/typography": "^0.5.13",
+    "@types/node": "^26.6.6",
```

Deleted dead files:
- `src/components/ui/`: `Button.tsx`, `ConfirmModal.tsx`, `Icon.tsx`, `Input.tsx`, `Modal.tsx`, `OptimizedImage.tsx`, `RichText.tsx`, `ScrollReveal.tsx`, `Skeleton.tsx`, `Toast.tsx`
- `src/config/`: `constants.ts`, `env.ts`, `seo.ts`, `tokens.ts`
- `src/lib/`: `cloudinary.ts`, `security-headers.ts`, `utils/sanitize.ts`, `utils/slugify.ts`
- `src/styles/tokens.ts`
- `src/types/`: `page.types.ts`, `section.types.ts`, `settings.types.ts`

---

## 10. Optional Tier 3 Snippets (Not Applied — Requires Visual Sign-off)

To eliminate the remaining ~463 ms Mobile TBT caused by the 3.5 s GSAP `#site-preloader` overlay in `src/components/home/AcademicIntro.tsx`:

```ts
// Option A (skip curtain on small viewports or repeat visits in the same tab session):
const skipCurtain =
  window.matchMedia('(max-width: 768px)').matches ||
  sessionStorage.getItem('kd_intro_seen') === '1';

if (skipCurtain && preloaderRef.current) {
  preloaderRef.current.style.display = 'none';
  document.body.style.removeProperty('overflow');
  onComplete?.();
  window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
  return;
}
sessionStorage.setItem('kd_intro_seen', '1');
```
