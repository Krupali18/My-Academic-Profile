# SECURITY HEADERS, CSP & HTTPS

All of these are **invisible to visitors and crawlers** and cost **zero JavaScript**, so they do not affect design, animation, SEO or performance, **as long as they are tested** (CSP especially).

> Detect the hosting first and use only that host's method. **Merge** with the existing header file (for example cache rules from the performance work). Never overwrite.
> If the host cannot set headers at all, tell me. A `<meta http-equiv>` CSP is a weaker fallback (no `frame-ancestors`, no Report-Only); ask before using it.

---

## 1. Header set (apply to HTML and assets: `/*`)

| Header | Value | Notes |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Only if **every** subdomain is HTTPS. Add `; preload` **only with my approval** (it is very hard to undo). |
| `X-Content-Type-Options` | `nosniff` | Safe. Make sure JS/CSS are served with correct MIME types. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Do **not** use `no-referrer` (breaks analytics attribution). |
| `Content-Security-Policy` | see §2 | **Report-Only first.** |
| `frame-ancestors` (inside CSP) | `'none'`, or `'self'` | Use `'self'`/specific origins **only if** I intentionally embed the site somewhere. Also send `X-Frame-Options: DENY` (or `SAMEORIGIN`) for old browsers. |
| `Permissions-Policy` | disable only features the site does **not** use | See §3. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Test: breaks pop-up based embeds/logins/payment widgets. Static site is usually fine. |
| `X-XSS-Protection` | **do not send** (obsolete) or `0` | |
| `Server` / `X-Powered-By` | remove / minimise version info | Nginx: `server_tokens off;` |

**Do NOT add:** `X-Robots-Tag`, `Cross-Origin-Embedder-Policy: require-corp` (breaks third-party images/fonts/embeds), `Cross-Origin-Resource-Policy` on HTML (see `SEC_03` for images), `Clear-Site-Data`.

---

## 2. Content-Security-Policy (the careful part)

### Method
1. Crawl the **production build** with Playwright through every route, scroll fully, and trigger every interactive element and animation. Collect every origin actually loaded (scripts, styles, fonts, images, media, frames, XHR/fetch).
2. Build the policy from **real findings**, not guesses.
3. Ship as **`Content-Security-Policy-Report-Only`** first. In the test run, listen for violations (script in `SEC_05` §4) and fix until there are **zero**.
4. Only then switch to enforcing `Content-Security-Policy`. Re-run the full visual / animation / interaction test.

### Starter template (adjust to what you found)
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: blob: https://YOUR-IMAGE-CDN;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self' https://YOUR-ANALYTICS-ENDPOINT;
media-src 'self';
frame-src https://YOUR-EMBED-ORIGIN;
object-src 'none';
base-uri 'self';
form-action 'self' https://YOUR-FORM-SERVICE;
frame-ancestors 'none';
upgrade-insecure-requests
```

### React/animation-specific notes
- **Styles:** React's `style={{}}` prop and libraries that set `element.style.x = …` (Framer Motion, GSAP) use the CSSOM, which CSP allows. CSS-in-JS libraries that inject `<style>` tags (styled-components, Emotion) need a **nonce** or `'unsafe-inline'` in `style-src`. A static host can't generate per-request nonces, so keep `'unsafe-inline'` for **styles only** if needed. That is a low risk compared to scripts. **Never** allow `'unsafe-inline'` or `'unsafe-eval'` in `script-src` without telling me why.
- **Inline scripts** (for example a theme or analytics snippet in `index.html`): don't allow all inline. Compute a **`sha256-…` hash** of each and add it to `script-src`. Or move the code to a bundled file (only if behaviour/timing stays identical).
- **JSON-LD** (`<script type="application/ld+json">`) is a data block and is **not** blocked by CSP. Don't touch it.
- **Third-party analytics / tag managers:** add only the exact origins they need. Google Tag Manager often requires extra origins. Test it, and confirm the data still arrives.
- **Google Fonts:** `style-src https://fonts.googleapis.com` and `font-src https://fonts.gstatic.com`. (Self-hosting fonts is better for both security and speed. Do it only if the look is identical.)
- Keep `img-src` explicit. If, after testing, some image origin is uncertain, temporarily keep `https:` and list it in the report as "to tighten".
- `upgrade-insecure-requests` is fine only if the whole site and all assets are available over HTTPS.
- Don't enable `require-trusted-types-for 'script'` (Tier 3: libraries often break).
- CSP doesn't affect how search engines or AI crawlers read the page. Still confirm in `SEC_05` §5.

---

## 3. Permissions-Policy

First **grep the code and built JS** for usage of: `getUserMedia`, `geolocation`, `DeviceOrientationEvent`/`DeviceMotionEvent` (parallax/tilt effects use these!), `requestFullscreen`, `autoplay` videos, `Payment`, `Notification`, `bluetooth`, `usb`, `serial`, `clipboard`.
Disable **only** the unused ones:
```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), interest-cohort=()
```
Add `gyroscope=(), accelerometer=(), magnetometer=()` **only** if no tilt/parallax/motion effect uses them. Don't restrict `autoplay`, `fullscreen` or `picture-in-picture` if any video or media uses them.

---

## 4. HTTPS and transport
- All HTTP → HTTPS with a **single** 301 (no chains such as http → https → www → /).
- Pick one canonical host (www or apex) and **do not change it**. SEO canonical must stay the same.
- No mixed content (`http://` assets anywhere in source, CSS, JSON-LD, OG tags). Only fix in code if the URL is not an SEO-frozen one, otherwise ask.
- TLS 1.2+ only (host/CDN setting). HTTP/2 or HTTP/3 on.
- Give me manual steps (not done by you) for: **CAA DNS record**, DNSSEC if the registrar supports it, and **SPF/DKIM/DMARC** if the domain sends email (prevents spoofing of my domain).

---

## 5. Host-specific snippets (merge into existing files)

### Netlify: `public/_headers`
```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy-Report-Only: <POLICY FROM §2>
```
(Keep the existing `/assets/*` cache rules in the same file. Netlify applies the most specific + the `/*` rules together.)

### Vercel: `vercel.json`
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Content-Security-Policy-Report-Only", "value": "<POLICY FROM §2>" }
      ]
    }
  ]
}
```
(Add these to the existing `headers` array. Keep the cache rules.)

### Nginx
```nginx
server_tokens off;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Content-Security-Policy-Report-Only "<POLICY FROM §2>" always;
```
Nginx gotcha: `add_header` inside a `location` **replaces** inherited headers from the parent. Repeat all security headers in any `location` that sets its own `add_header` (for example the cache-control locations).

### Apache: `.htaccess`
```apache
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Frame-Options "DENY"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Content-Security-Policy-Report-Only "<POLICY FROM §2>"
</IfModule>
Options -Indexes
ServerSignature Off
```

### Cloudflare Pages: `public/_headers`
Same format as Netlify. If Cloudflare **proxies** another host, the header can also be set with a Transform Rule (give me click-by-click steps).

### Firebase Hosting: `firebase.json` → `hosting.headers`
Same key/value pairs under `"source": "**"`.

### GitHub Pages
Cannot set custom headers. Tell me. Options: move to Cloudflare Pages/Netlify (Tier 3), or put Cloudflare in front. Do **not** silently fall back to a meta tag.

---

## 6. Enforce step
After 100% clean Report-Only testing: rename `Content-Security-Policy-Report-Only` → `Content-Security-Policy`. Re-run the **entire** verification checklist. Keep the Report-Only copy for one more day if the host allows both headers at once (it does), so new violations remain visible.

## 7. Done when
- securityheaders.com: **A or A+**. Mozilla Observatory: **B+ or better**.
- Lighthouse Best Practices → Trust & Safety items (CSP, HSTS, COOP, frame protection) pass or show informational only, with no score drop.
- Zero CSP violations in the console on every route and interaction.
- No visual, animation, SEO, accessibility or performance change.
