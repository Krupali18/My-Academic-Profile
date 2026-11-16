# ASSET & IMAGE PROTECTION (honest, SEO-safe, accessibility-safe)

## 0. Reality check (include this in your final report)
**Any image shown in a browser can be saved.** The visitor's browser must download the file to display it. DevTools, screenshots, `curl` and "view page source" always work.
So the strategy is **layers**:

1. **Stop hotlinking** (other sites embedding your images) ← real protection
2. **Never ship originals / high-res masters / backups** ← real protection
3. **Make saved copies less valuable** (web-size only, copyright metadata, optional watermark) ← real, partly needs approval
4. **Slow bulk scraping** (CDN rate limiting) ← real, needs host/CDN, needs approval
5. **Light deterrents for casual copying** ← deterrent only, must be accessibility-safe

---

## 1. Hard SEO / crawler guardrails (apply to everything in this file)
Any rule that checks `Referer` or restricts image access **must allow**:
- **Empty Referer**: crawlers (Googlebot, Bingbot, AI/LLM crawlers, social-preview fetchers) and privacy browsers send none. **Direct visits** also have none.
- **Own site**: `yourdomain.com`, `www.yourdomain.com`, any staging/preview domain I use.
- **Search-engine referers**: Google, Bing, DuckDuckGo, Yahoo, Yandex, Baidu, Brave, Ecosia, Qwant (their image-preview panels load your image with those referers).
- **Never** use `User-Agent` matching. Never serve different content to bots.
- **Never** challenge/CAPTCHA/JS-gate HTML pages or images.
- **Never** restrict access to the **HTML pages** by Referer. This applies to images/media files only.
- Image URLs referenced in `<head>`/OG/JSON-LD/sitemap are **frozen** (do not rename or move).

Always verify with the tests in `SEC_05` §5 (crawler and social-preview access).

---

## 2. Tier 1: Hotlink protection (do this)

### 2.1 Find what the host supports
| Host | Best method |
|---|---|
| **Cloudflare (proxied)** | WAF custom rule (below). Free plan also has **Scrape Shield → Hotlink Protection**; verify it still allows empty referers and search-engine referers. |
| **Nginx** | `valid_referers` (below) |
| **Apache** | `mod_rewrite` Referer rule (below) |
| **Netlify / Vercel / Cloudflare Pages / Firebase / GitHub Pages (pure static)** | Header files **cannot** check the Referer. Options: (a) put Cloudflare in front and use the WAF rule (**needs my approval and manual DNS steps**, give me the steps), or (b) an edge function/middleware that only matches image paths (adds a small runtime; Tier 3, ask first). **Do not** add anything that touches HTML page requests. |

If no safe method exists, **say so and stop**. Don't improvise a weaker or riskier one.

### 2.2 Cloudflare WAF custom rule (Action: Block)
```
(
  http.request.uri.path.extension in {"jpg" "jpeg" "png" "webp" "avif" "gif" "svg" "mp4" "webm"}
  and http.referer ne ""
  and not http.referer contains "yourdomain.com"
  and not http.referer contains "google."
  and not http.referer contains "bing.com"
  and not http.referer contains "duckduckgo.com"
  and not http.referer contains "yahoo."
  and not http.referer contains "yandex."
  and not http.referer contains "baidu.com"
  and not http.referer contains "ecosia.org"
  and not http.referer contains "search.brave.com"
  and not cf.client.bot
)
```
(Replace `yourdomain.com`. `cf.client.bot` = Cloudflare-verified good bots. WAF runs before the cache, so cached images aren't wrongly served to hotlinkers.)
Keep every "block AI bots / bot fight / managed challenge" feature **off or unchanged for pages**. Don't enable them.

### 2.3 Nginx
```nginx
location ~* \.(jpg|jpeg|png|webp|avif|gif|svg|mp4|webm)$ {
  valid_referers none blocked server_names
                 ~\.google\. ~\.bing\. ~duckduckgo\. ~\.yahoo\. ~yandex\. ~baidu\. ~ecosia\. ~search\.brave\.;
  if ($invalid_referer) { return 403; }
  # keep existing cache + security headers here (add_header inside location replaces inherited ones!)
}
```
`none` allows empty referers (crawlers, direct visits). `server_names` = your own domain(s). If Nginx sits **behind a CDN that caches**, do the check at the CDN instead. Otherwise the cache can serve the wrong answer.

### 2.4 Apache
```apache
RewriteEngine On
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^https?://([a-z0-9-]+\.)*yourdomain\.com [NC]
RewriteCond %{HTTP_REFERER} !(google\.|bing\.|duckduckgo\.|yahoo\.|yandex\.|baidu\.|ecosia\.|search\.brave\.) [NC]
RewriteRule \.(jpe?g|png|webp|avif|gif|svg|mp4|webm)$ - [F,NC]
```

### 2.5 `Cross-Origin-Resource-Policy` on images: **Tier 3 (needs approval)**
`Cross-Origin-Resource-Policy: same-origin|same-site` stops other sites embedding your images with pure headers (works on any static host). **But** it can also block the **Google/Bing image preview panels**, which load your image from their page. That may reduce image-search visibility. Don't enable it unless I explicitly accept this trade-off. If approved, use `same-site` if images live on a sibling subdomain, and test with the Google Search Console URL Inspection and a Google Images preview.

---

## 3. Tier 1: Original-asset hygiene (real protection, often forgotten)

- **Never deploy** original / print-quality / master image files. Only the web-sized, optimised versions used on the page.
- Confirm **none** of these exist in the deployed output (check `public/`, `dist/`/`build/`, and the published site):
  `assets-original-backup/`, `originals/`, `raw/`, `psd/`, `ai/`, `figma-exports/`, `perf-reports/`, `security-reports/`, `*.psd`, `*.ai`, `*.zip`, `*.bak`, `*.old`, `*.map`, `Thumbs.db`, `.DS_Store`.
  *(The performance work keeps originals in `/assets-original-backup/`. That folder must live **outside** `public/` and outside the build output.)*
- Remove **unused images** that ship but aren't referenced by any page (they only widen the attack/scrape surface and add weight).
- Don't expose a directory listing of the images folder (`Options -Indexes`, `autoindex off`; Netlify/Vercel don't list by default).

## 4. Tier 2: Image metadata (invisible, no visual change)
- **Strip** GPS location, camera serials, editing-software history, thumbnails and other private/EXIF junk from every shipped image. Less leaked info plus slightly smaller files.
- **Keep or add** copyright ownership metadata (IPTC/XMP: `Creator`, `Copyright Notice`, `Rights/URL`) so copies can be traced. Tools: `exiftool`, `sharp` (`withMetadata` with selected fields), or `mozjpeg`/`oxipng` + exiftool.
- **Keep the colour profile** (ICC/sRGB) so colours don't shift. Compare before/after pixels.
- Verify with a pixel diff that images are visually identical.

## 5. Tier 2: Light deterrents for casual copying (accessibility-safe only)
These only stop the laziest copying and are bypassed in seconds. Label them as deterrents.
- On `<img>` only: `draggable="false"` and CSS `-webkit-user-drag: none;`
- Optionally `-webkit-touch-callout: none;` on images (disables the iOS long-press save menu) **only on non-interactive decorative/gallery images**.
- Do **not** use `pointer-events: none` on images that are inside links, buttons, sliders, lightboxes or anything clickable/focusable.
- Do **not** add overlay `<div>`s on top of images, do **not** use `user-select: none` on text, do **not** block the right-click menu globally, do **not** block keyboard shortcuts.
- Check afterwards: keyboard navigation, screen-reader reading of `alt`, zoom, long-press behaviour, lightbox/carousel clicks, axe = 0 new violations, visual diff = identical.

## 6. Tier 3: Needs approval (describe only, with benefit and risk)
| Option | Benefit | Cost / risk |
|---|---|---|
| **Visible or invisible watermark** | Strongest "less valuable when stolen" measure | Visibly changes images (visible type) / needs a pipeline (invisible type) |
| **Lower-resolution web versions** + hi-res on request | Stolen copy is low quality | Changes sharpness on large screens |
| **CDN rate limiting** for image paths (per-IP request caps) | Slows bulk scrapers | Needs Cloudflare or similar; must exempt verified bots |
| **CORP on images** | Header-only anti-hotlink on any static host | May hide images in Google/Bing image-preview panels (see §2.5) |
| **Right-click blocking on images only** | Stops one casual action | Annoying; accessibility risk; trivially bypassed |
| **Move images to hashed, bundler-managed URLs** | Unguessable names, better cache busting | **Changes image URLs → SEO risk** for anything indexed or referenced |
| **Signed / expiring URLs** | Real access control | Needs a backend/edge function. Not static, and breaks crawlers/SEO unless carefully exempted |
| **Copyright notice / license page + `<link rel="license">`** | Legal basis for takedowns | Content change; ask |

## 7. What is **forbidden** (hurts SEO, accessibility or speed)
- Rendering images in `<canvas>`, slicing images into tiles, base64 or blob-URL images, CSS-only backgrounds replacing `<img alt>`.
- Anti-DevTools scripts, `debugger` traps, console-clearing loops, "disable inspect" scripts.
- JavaScript obfuscators or encryption of page content.
- User-Agent blocking, bot blocking, CAPTCHA or JS challenge on pages.
- Disabling text selection or right-click site-wide.

## 8. Done when
- Hotlinking from a foreign Referer is blocked; empty Referer, own site, search-engine referers and crawlers are allowed (tested with `curl`; see `SEC_05`).
- No originals/backups/reports/source maps in the deployed output.
- Image metadata cleaned (and copyright kept), images pixel-identical.
- All Tier 3 items listed in the report, **not** implemented.
- Report includes the sentence: *"Visitors can still save images they can view; these measures stop hotlinking, reduce scraping, and lower the value of copies."*
