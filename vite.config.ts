import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Injects <link rel="preload" as="font"> tags for the 2 critical above-the-fold
 * Latin Montserrat WOFF2 weights so they start downloading before CSS is parsed.
 */
function preloadCriticalFontsPlugin(): Plugin {
  return {
    name: 'preload-critical-fonts',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const criticalPatterns = [
          /montserrat-latin-400-normal-[^/]+\.woff2$/,
          /montserrat-latin-700-normal-[^/]+\.woff2$/,
        ];
        const links: string[] = [];
        for (const fileName of Object.keys(ctx.bundle)) {
          if (criticalPatterns.some((re) => re.test(fileName))) {
            links.push(
              `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/${fileName}" />`
            );
          }
        }
        if (links.length === 0) return html;
        return html.replace('</head>', `${links.join('\n')}\n  </head>`);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    preloadCriticalFontsPlugin(),
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            filename: './dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
            title: 'Dr. Krupali Donda Portfolio - Bundle Analysis',
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'esnext',
    // H10 FIX: Lowered from 800 to 500 — this forces us to notice if chunks get too big
    // rather than silently suppressing the warning.
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // H11 FIX: Split the monolithic 'animations' chunk into three separate
            // lazy-loadable chunks (gsap / framer-motion / tsparticles).
            // Previously all 3 were bundled together into one ~880KB raw chunk.
            // Now each page only loads the animation library it actually needs.
            if (id.includes('gsap')) {
              return 'chunk-gsap';
            }
            if (id.includes('framer-motion')) {
              return 'chunk-framer';
            }
            if (id.includes('@tsparticles') || id.includes('tsparticles')) {
              return 'chunk-particles';
            }

            // Core UI icons — Lucide is tree-shaken but put in a stable chunk
            if (id.includes('lucide-react')) {
              return 'chunk-icons';
            }

            // Core React runtime + routing — always needed, cache-stable
            if (
              id.includes('react/') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('scheduler')
            ) {
              return 'chunk-vendor';
            }

            // DOMPurify — security utility, stable cache fingerprint
            if (id.includes('isomorphic-dompurify') || id.includes('dompurify')) {
              return 'chunk-dompurify';
            }

            // Utility libraries — infrequently updated, good caching
            if (
              id.includes('date-fns') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge')
            ) {
              return 'chunk-utils';
            }
          }
        },
      },
    },
  },
});
