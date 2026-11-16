# VERIFICATION CHECKLIST (run after EVERY optimization)

Rule: if any gate below fails, **revert that commit**. No exceptions.

---

## 1. Measure correctly (avoid the polluted results we saw before)

Lighthouse previously warned about **Chrome extensions** and **IndexedDB stored data**. Fix the test conditions:

- Always test the **production build** (`npm run build` then `npm run preview` / `npx serve -s build`), never the dev server.
- Use a **clean profile**: incognito, no extensions, or headless Chrome (fresh profile by default).
- Close other heavy tabs/apps. Run **5 times and take the median**.
- Test **both Desktop and Mobile**.

```bash
mkdir -p perf-reports/after
for i in 1 2 3 4 5; do
  # Mobile (Lighthouse default)
  npx lighthouse http://localhost:4173 \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --disable-extensions --incognito" \
    --output=json --output-path=perf-reports/after/mobile-$i.json --quiet
  # Desktop
  npx lighthouse http://localhost:4173 --preset=desktop \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --disable-extensions --incognito" \
    --output=json --output-path=perf-reports/after/desktop-$i.json --quiet
done
```
(Adjust the port. Alternatively use `@lhci/cli` with `numberOfRuns: 5`.)
Also check the real, deployed URL with **PageSpeed Insights** (it shows lab data plus real-user field data if available).

Extract and compare: Performance score, FCP, LCP, **TBT**, CLS, Speed Index, plus Accessibility / Best Practices / SEO.

## 2. Pass / fail gates

| Check | Gate |
|---|---|
| Accessibility score | **= 100** |
| SEO score | **= 100** |
| Best Practices | **≥ 96** |
| CLS | **≤ 0.022** (not worse than baseline) |
| LCP | **not worse than baseline** |
| TBT | must **decrease** vs previous step (otherwise the change is useless, so revert) |
| Visual diff | **no visible difference** (see §3) |
| Rendered text | **identical** (see §4) |
| `<head>` / JSON-LD | **identical** (see §4) |
| Console | **no new errors or warnings** |
| axe-core | **0 violations** (and no new ones vs baseline) |

## 3. Visual & animation regression (Playwright example)

Take baseline screenshots **before any change** (on the original branch) and again after each change.

```js
// tests/visual.spec.js
import { test, expect } from '@playwright/test';

const widths = [375, 768, 1280, 1920];
for (const width of widths) {
  test(`home @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', e => errors.push(String(e)));

    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

    // scroll slowly through the whole page to trigger lazy images + scroll animations
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 1500));
    });

    // every image must actually have loaded
    const broken = await page.$$eval('img', imgs =>
      imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src));
    expect(broken, 'broken images').toEqual([]);

    expect(errors, 'console errors').toEqual([]);
    await expect(page).toHaveScreenshot(`home-${width}.png`, { fullPage: true, maxDiffPixelRatio: 0.002 });
  });
}
```
- Compare **after-animation final state** screenshots. Additionally, **manually record or watch** the hero animation and 2 to 3 key scroll animations before/after (start time, duration, easing, order). They must feel identical. Note anything that starts later, flickers, pops in, or jumps.
- Check hover, focus, active, open/close states of interactive elements (menus, accordions, modals, sliders).
- Check on a throttled connection (DevTools: Fast 4G + 4x CPU slowdown). Nothing should visibly "pop in" late that didn't before.
- Check the scrollbar: it must not jump when `content-visibility` or lazy sections mount.

## 4. SEO & content regression

Capture these before and after, then `diff`. Everything must be identical:

```js
// rendered text and head after full scroll
const text = await page.evaluate(() => document.body.innerText);
const head = await page.evaluate(() => ({
  title: document.title,
  desc: document.querySelector('meta[name=description]')?.content,
  canonical: document.querySelector('link[rel=canonical]')?.href,
  robots: document.querySelector('meta[name=robots]')?.content,
  og: [...document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')].map(m => m.outerHTML),
  jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
  h: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => h.tagName + ':' + h.textContent.trim()),
  alts: [...document.querySelectorAll('img')].map(i => i.getAttribute('alt')),
  links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
}));
```
- Also compare the **raw HTML** returned by `curl` (what crawlers get first). It must not lose content compared to baseline.
- Verify `robots.txt` and `sitemap.xml` are unchanged and still reachable.
- Run Google's Rich Results Test / Search Console URL Inspection on the deployed page if possible.
- "View as crawler" test: load the page with JS only partially executed or without scrolling. Important text and headings must still be in the DOM.

## 5. Accessibility regression
- Run `@axe-core/playwright` on the home page and every key route. Expect 0 violations.
- Keyboard test: Tab through the whole page. Focus order, visible focus ring, skip link, menu/modal focus trap are all identical to baseline.
- `prefers-reduced-motion: reduce` must behave exactly as before (emulate it in Playwright: `page.emulateMedia({ reducedMotion: 'reduce' })`).
- Lazy placeholders must be `aria-hidden` and must not appear as empty landmarks, empty headings or empty links to screen readers.

## 6. Performance proof (to show the change really helped)
- Before/after table of the median of 5 runs, mobile and desktop.
- Total JS transferred and executed (KB, and ms in "Reduce JavaScript execution time").
- Number of long tasks (>50 ms) in the DevTools Performance trace during load.
- Total image bytes on initial load and total page weight.
- Repeat-visit load (cache test) for the caching work: second load should show mostly `(disk cache)`.

## 7. Rollback rule
- One change = one commit. Failed gate → `git revert <commit>` and record it in the report as "tried, reverted, reason".
- Keep original assets in `/assets-original-backup/` until I approve the final result.

## 8. Final deliverable: `PERFORMANCE_REPORT.md`
1. Before/after scores (desktop + mobile, median of 5).
2. Each change: description → commit hash → measured effect.
3. Proof of zero regression (visual diff results, SEO diff, axe result, a11y keyboard check).
4. Reverted attempts and why.
5. Tier 3 "needs approval" list with expected gain and risk.
6. Remaining issues outside code (hosting/TTFB/CDN).
