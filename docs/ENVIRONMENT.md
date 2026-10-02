# Environment Variables Reference
## Dr. Krupali Donda Academic Portfolio

All environment variables follow the Vite client-side convention (`VITE_` prefix). No private backend keys, database credentials, or secret tokens are bundled into client code.

---

### Variable Specifications

| Variable | Scope | Required | Default Value | Description |
|---|---|---|---|---|
| `VITE_SITE_URL` | Public / Client | **Yes** | `https://krupalidonda.com` | Base canonical domain for canonical links, sitemaps, Open Graph, and Twitter tags. |
| `VITE_GA_ID` | Public / Client | No | `""` | Google Analytics 4 Measurement ID (format: `G-XXXXXXXXXX`). If omitted, telemetry remains inactive without console spam. |
| `VITE_GTM_ID` | Public / Client | No | `""` | Google Tag Manager ID (format: `GTM-XXXXXX`). |
| `VITE_SENTRY_DSN` | Public / Client | No | `""` | Sentry DSN client string for real-time frontend runtime error logging. |
| `VITE_CLOUDINARY_CLOUD_NAME` | Public / Client | No | `""` | Optional Cloudinary cloud name if dynamic media uploads are enabled in the future. |
| `ANALYZE` | Build-time (Node) | No | `false` | When set to `true`, generates a Rollup bundle visualizer report at `dist/stats.html`. |

---

### Local Development Setup

To configure local variables:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the required values.
3. `.env.local` is ignored in `.gitignore` to prevent accidental credential commits.
