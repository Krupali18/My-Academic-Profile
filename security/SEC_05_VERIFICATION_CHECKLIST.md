# SECURITY VERIFICATION CHECKLIST (run after EVERY change)

Rule: if any gate fails, **revert that commit** and record "tried, reverted, reason" in the report.
Replace `SITE` with the real/preview URL, and `ASSET` paths with real file paths from the build.

---

## 1. Pass / fail gates

| Check | Gate |
|---|---|
| Visual diff (375/768/1280/1920, after full scroll) | **No visible difference** |
| Animations (hero + 3 scroll animations, hover/focus states) | **Identical** start, duration, easing |
| Rendered text, `<head>`, JSON-LD, headings, alts, links | **Identical** (diff = empty) |
| Lighthouse Accessibility / SEO | **100 / 100** |
| Lighthouse Best Practices | **≥ 96** |
| CLS | **≤ 0.022** |
| TBT / LCP | **Not worse** than the pre-security baseline |
| Console | **No new errors / no CSP violations** |
| axe-core | **0 violations** |
| Crawler & social-preview access (§5) | **All 200 / all previews render** |
| Third-party features (analytics, forms, embeds, fonts, maps) | **Still work** |
| securityheaders.com / Observatory | **Improved** vs baseline (target A/A+ and B+ or better) |

---

## 2. Re-measure performance (same method as the performance files)
Production build, clean profile, 5 runs, median, **mobile and desktop**:
```bash
mkdir -p security-reports/after
for i in 1 2 3 4 5; do
  npx lighthouse http://localhost:4173 \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --disable-extensions --incognito" \
    --output=json --output-path=security-reports/after/mobile-$i.json --quiet
  npx lighthouse http://localhost:4173 --preset=desktop \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --disable-extensions --incognito" \
    --output=json --output-path=security-reports/after/desktop-$i.json --quiet
done
```
Note: security headers only show up when the **host** serves them. A local `serve`/`vite preview` doesn't send your production headers. For header tests, use the **deployed or preview URL**.

## 3. Header checks
```bash
# HTML page
curl -sI https://SITE/ | grep -i -E "strict-transport|content-security|x-content-type|referrer-policy|permissions-policy|x-frame|cross-origin|cache-control|server|x-powered"
# JS, CSS, image, font: security + cache headers present, correct content-type
curl -sI https://SITE/assets/<file>.js   | grep -i -E "content-type|cache-control|x-content-type"
curl -sI https://SITE/assets/<img>.webp  | grep -i -E "content-type|cache-control"
# HTTP -> HTTPS in a single hop
curl -sI -o /dev/null -w "%{http_code} %{redirect_url} hops:%{num_redirects}\n" -L --max-redirs 5 http://SITE/
```
Then run: **securityheaders.com**, **Mozilla Observatory**, **SSL Labs**. The existing cache rules from the performance work must **still** be present (HTML `no-cache`, hashed assets `immutable`).

## 4. CSP verification (before enforcing, and again after)
```js
// Playwright: collect violations from the very first script
await page.addInitScript(() => {
  window.__csp = [];
  document.addEventListener('securitypolicyviolation', e =>
    window.__csp.push({ dir: e.violatedDirective, blocked: e.blockedURI, file: e.sourceFile, line: e.lineNumber }));
});
await page.goto(url, { waitUntil: 'networkidle' });
// scroll the whole page slowly, open menus/modals/accordions, play carousels, submit forms, hover items
const v = await page.evaluate(() => window.__csp);
expect(v).toEqual([]);   // must be empty on EVERY route and every interaction
```
Repeat at 375 px and 1280 px and with `prefers-reduced-motion` on and off. Check also the browser console for `Refused to load…` messages. Confirm analytics requests still arrive, fonts render, embeds load, forms submit.

## 5. Crawler, AI-search and social-preview safety (CRITICAL for SEO/LLM visibility)

### 5.1 Hotlink rule behaviour (images)
```bash
IMG=https://SITE/assets/<some-image>.webp
code() { curl -s -o /dev/null -w "%{http_code}" "$@"; echo; }

code "$IMG"                                                     # no referer        → 200
code -H "Referer: https://SITE/"            "$IMG"              # own site          → 200
code -H "Referer: https://www.google.com/"  "$IMG"              # Google            → 200
code -H "Referer: https://www.bing.com/"    "$IMG"              # Bing              → 200
code -H "Referer: https://duckduckgo.com/"  "$IMG"              # DuckDuckGo        → 200
code -H "Referer: https://random-other-site.example/page" "$IMG" # hotlinker         → 403 (expected)
```
### 5.2 Crawlers and fetchers must get pages **and** images (200), with no challenge page
```bash
for UA in \
 "Googlebot/2.1 (+http://www.google.com/bot.html)" \
 "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" \
 "Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)" \
 "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)" \
 "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" \
 "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" \
 "facebookexternalhit/1.1" "Twitterbot/1.0" "LinkedInBot/1.0" "Slackbot-LinkExpanding 1.0" "WhatsApp/2.23" "Discordbot/2.0"
do
  for URL in "https://SITE/" "https://SITE/robots.txt" "https://SITE/sitemap.xml" "$IMG"; do
    printf "%s  %s  " "$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "$URL")" "$URL"; echo "$UA" | cut -c1-40
  done
done
```
**Every line must be 200** (the sitemap line may be 404 only if no sitemap existed at baseline). Also confirm the HTML body returned to a bot is **byte-for-byte the same** as to a normal browser (no cloaking, no challenge, no CAPTCHA).
*(These are simulated User-Agents from your machine. They test that no UA/bot rule blocks them, not that real bot IPs are verified.)*

### 5.3 Real-world tools (manual, give me the links to run)
- **Google Search Console → URL Inspection → Test Live URL**: the page renders, images load.
- **Rich Results Test**: structured data detected as before.
- **Facebook Sharing Debugger**, **LinkedIn Post Inspector**: the OG image appears.
- Paste the URL in WhatsApp/Slack/Discord/X: preview and image appear.
- **Bing Webmaster Tools → URL Inspection**: OK.
- Google Images: a search for one of my images still opens the preview panel and visit button correctly (spot check, may lag).

## 6. SEO + content diff (same method as the performance files)
Capture before/after and `diff`. Must be **identical**: `document.body.innerText` after full scroll, title, description, canonical, robots meta, OG/Twitter tags, JSON-LD, heading outline, every `img[alt]`, every link `href`, `robots.txt`, `sitemap.xml`, raw `curl` HTML.
Also verify **no** `X-Robots-Tag`, `noindex`, `noimageindex` headers or tags were introduced:
```bash
curl -sI https://SITE/ | grep -i "x-robots-tag" && echo "FAIL: x-robots-tag present" || echo "OK"
```

## 7. Accessibility checks
- `@axe-core/playwright` on every route: 0 violations.
- Keyboard-only walkthrough: Tab order, visible focus, skip link, modal focus trap, all unchanged.
- Screen-reader spot check (NVDA/VoiceOver): images still announce their `alt`; no new empty elements.
- If image deterrents were applied: lightbox, carousel, links around images, long-press and zoom still behave as before.
- `prefers-reduced-motion: reduce` unchanged.

## 8. Exposure & secrets checks (after final build)
```bash
# no source maps or leftovers in the build output
grep -R "sourceMappingURL" dist/ build/ 2>/dev/null && echo "FAIL" || echo "OK: no sourcemap refs"
find dist build -name "*.map" -o -name "*.bak" -o -name "*.old" -o -name ".DS_Store" -o -name "*.psd" -o -name "*.zip" 2>/dev/null
# sensitive paths must not return the real file
for p in /.git/config /.env /package.json /vite.config.js /assets-original-backup/ /perf-reports/ /security-reports/; do
  printf "%s " "$(curl -s -o /dev/null -w '%{http_code}' https://SITE$p)"; echo "$p"
done
# secret scan on repo and build
gitleaks detect --no-banner   # or: trufflehog filesystem .
npm audit --omit=dev
```
(For the path loop: a `404` is best. A `200` is acceptable only if the body is the normal `index.html` from the SPA fallback. Open one and check, never assume.)

## 9. Rollback rule
One change = one commit. Failed gate → `git revert <hash>`. Record the attempt, the failing gate and the evidence in `SECURITY_REPORT.md`.

## 10. Final deliverable: `SECURITY_REPORT.md`
1. Before/after: securityheaders grade, Observatory score, `npm audit` counts, Lighthouse (mobile + desktop, median of 5).
2. Every change → commit hash → protection gained.
3. Proof of no regression: visual diff, SEO diff, a11y, crawler tests (§5), performance numbers.
4. Reverted attempts and why.
5. **"What visitors can still do"** (e.g. save any image they can view, read minified JS).
6. Tier 3 "needs approval" list with benefit and risk.
7. **Manual steps for me** (DNS, CDN/WAF, registrar, repo settings), exact and copy-pasteable.
