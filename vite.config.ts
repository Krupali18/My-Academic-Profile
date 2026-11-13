import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
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
    sourcemap: false,
    // H10 FIX: Lowered from 800 to 500 — this forces us to notice if chunks get too big
    // rather than silently suppressing the warning.
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) {
              return 'chunk-gsap';
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

            // Utility libraries — infrequently updated, good caching
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'chunk-utils';
            }
          }
        },
      },
    },
  },
});
