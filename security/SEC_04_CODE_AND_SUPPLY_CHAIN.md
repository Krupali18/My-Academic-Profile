# CODE, BUILD & SUPPLY-CHAIN HARDENING

For a static site, the real risks are: **vulnerable or malicious dependencies, tampered third-party scripts, leaked secrets, accidentally published files, and missing transport/headers.**
All items below are invisible to visitors and crawlers when done correctly.

---

## 1. Source maps (Tier 1)
Source maps let anyone read your original, unminified source in DevTools.
- Disable them in production:
  - Vite: `build: { sourcemap: false }`
  - CRA: `GENERATE_SOURCEMAP=false` in the build script/env
  - Webpack: `devtool: false` for production
  - Next static export: `productionBrowserSourceMaps: false` (default)
- Confirm the built files contain **no** `sourceMappingURL` comments and **no** `.map` files in the output.
- Make sure `.map` requests don't succeed (`404`).
- ⚠️ **Check Lighthouse Best Practices after this change.** Some Lighthouse versions flag "missing source maps for large first-party JavaScript" as an informational item. If the Best Practices score **drops below 96**, tell me (don't revert silently) and show the audit text. If I need maps for error tracking, upload them privately to the tracking tool and never publish them.
- Honest note for the report: minified JS is still readable by determined people. No obfuscation is used, because obfuscation hurts performance (TBT), and adds risk.

## 2. Secrets & sensitive data (Tier 1)
- Scan the repo **history and the built output**: `gitleaks detect` or `trufflehog`. Look for API keys, tokens, private keys, passwords, `.env` contents, Firebase/AWS/Stripe/Mapbox keys, emails/phones that I didn't intend to publish.
- Anything with a `VITE_`, `REACT_APP_`, `NEXT_PUBLIC_` prefix is **embedded in the public bundle**. Treat all of them as public. A real secret must never use these prefixes.
- Public-by-design keys (analytics IDs, public form-service keys, map keys) are acceptable but must be **restricted at the provider** (allowed domains/referrers). List them and give me exact steps to restrict each.
- If a real secret is found: **do not print it**. Report file + line only, tell me to rotate it, and remove it from the code. If it was committed, tell me history needs cleaning (and the key must be rotated regardless).
- `.env*`, `*.pem`, `*.key` must be in `.gitignore`. Commit `.env.example` only.

## 3. Published-file exposure (Tier 1)
List **every file** in the final deploy folder and compare with what is needed. Then request each path below on the live/preview site. None may return the real file:

```
/.git/config   /.env   /.env.production   /package.json   /package-lock.json
/vite.config.js   /webpack.config.js   /src/   /node_modules/   /.DS_Store
/assets-original-backup/   /perf-reports/   /security-reports/
/<hashed>.js.map   /backup.zip   /*.bak   /*.old
```
- SPA hosts often return `200` with `index.html` for unknown paths. That's acceptable (don't change routing or the SEO behaviour). What matters is that the **body is not the sensitive file**. Where possible exclude `*.map` and dotfiles from the SPA fallback so they return a true `404`.
- **Keep reachable:** `/robots.txt`, `/sitemap*.xml`, `/favicon*`, `/manifest.*`, `/.well-known/*` (ACME challenges, `security.txt`, app-association files).
- Disable directory listing (`Options -Indexes` / `autoindex off`).
- Build only from `src/` → output folder. Anything in `public/` is published, so audit `public/` file by file.

## 4. Dependency security (Tier 1 for safe fixes, Tier 3 for breaking ones)
- `npm ci` with the committed **lockfile** (commit `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`).
- `npm audit --omit=dev` (production deps are what ship) plus the full `npm audit`.
- Fix with **non-breaking** updates only (`npm audit fix`, patch/minor bumps). After each: rebuild, screenshot diff, animation check. **Animation, UI and carousel libraries must behave identically.**
- **Do not** run `npm audit fix --force` or major upgrades without my approval (they can change animation or UI behaviour). List them as Tier 3 with the CVE, severity, whether it is reachable in a static browser bundle, and the upgrade risk.
- Remove **unused** dependencies (`npx depcheck`): less code means less attack surface and a faster site.
- Flag suspicious packages (typo-squatted names, very new/low-download packages, packages with install scripts you don't recognise).
- Set up automatic update PRs (Dependabot or Renovate config) **as a file only**. I'll enable it in the repo settings.
- Pin the Node version (`.nvmrc` / `engines`) to keep builds reproducible.

## 5. Third-party scripts, styles and links (Tier 1)
- List every third-party origin (fonts, analytics, widgets, CDNs, embeds).
- For any `<script src>` / `<link rel=stylesheet>` loaded from a CDN, add **Subresource Integrity**:
  ```html
  <script src="https://cdn.example.com/lib@1.2.3/lib.min.js"
          integrity="sha384-…" crossorigin="anonymous"></script>
  ```
  Pin an **exact version** (no `@latest`). Compute the hash from the real file. **Don't add SRI** to scripts that change without a version (analytics/tag-manager loaders: SRI would break them, so use CSP origin allow-listing for those).
- Prefer **self-hosting** libraries and fonts when the result is identical (better security and speed). Skip if it would change appearance or behaviour.
- Remove third-party scripts that are no longer used (ask me first if unsure).
- External links with `target="_blank"` must have `rel="noopener"`. **Keep any existing `rel` values. Do NOT add `nofollow`, and don't add `noreferrer` unless I approve** (it removes referrer data for the destination site; it doesn't affect SEO but may affect partner/affiliate tracking).
- No `dangerouslySetInnerHTML` with unsanitised content. Search for it; for static, hard-coded content it's low risk, but list each usage.
- No `eval`, `new Function`, `document.write` in first-party code.
- Forms: if any contact form posts to a third-party service, confirm the endpoint is HTTPS, the service enforces its own spam/CSRF protection, and `form-action` in CSP lists it.

## 6. Build & repo hygiene (Tier 1)
- Production build must run with `NODE_ENV=production`. No dev-only code, no test files, no mock data, no `console.log` leaking internal info.
- No internal URLs, staging domains, developer emails, TODO notes with credentials, or comments with sensitive info in the built HTML/JS/CSS. Grep the build output.
- CI (if present): no secrets in logs, least-privilege tokens, pinned action versions.
- Add `SECURITY.md` and `/.well-known/security.txt` only if I give a contact email:
  ```
  Contact: mailto:security@yourdomain.com
  Expires: 2027-12-31T00:00:00Z
  Preferred-Languages: en
  Canonical: https://yourdomain.com/.well-known/security.txt
  ```
  (This file is not linked from pages and doesn't touch SEO.)

## 7. Out-of-code checklist (give me instructions, don't do it yourself)
- Registrar: **2FA on**, registrar lock on, auto-renew on, DNSSEC if supported.
- DNS: **CAA** record limiting certificate issuers; **SPF, DKIM, DMARC** if the domain sends email.
- Hosting/Git/CDN accounts: **2FA / passkeys** on, least-privilege members, no shared passwords.
- Enable branch protection on the main branch; require review before deploy.
- Uptime/cert-expiry monitoring.
- If CDN/WAF is approved: enable HTTP/3, TLS 1.2+ minimum, rate limiting for image paths, **keep every "bot challenge / block AI crawlers" feature off for pages.**

## 8. Done when
- No source maps / secrets / sensitive or backup files in the deployed output.
- `npm audit --omit=dev` shows no fixable High/Critical issues (remaining ones documented with reasons).
- All CDN scripts pinned with SRI where possible. Third-party list documented.
- Build identical visually; Lighthouse Performance/SEO/A11y/Best Practices unchanged or better.
