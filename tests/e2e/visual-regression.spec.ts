import { test, expect } from '@playwright/test';

/**
 * Visual Regression Testing (MD File 13)
 *
 * Verifies pixel-perfect visual fidelity across 3 responsive breakpoints:
 * - Mobile: 375px
 * - Tablet: 768px
 * - Desktop: 1440px
 *
 * Uses Playwright's built-in toHaveScreenshot() with a 0.1% max diff ratio.
 */
test.describe('Visual Regression - Responsive Page Layouts', () => {
  const VIEWPORTS = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  const PAGES_TO_TEST = [
    { path: '/', slug: 'home' },
    { path: '/about', slug: 'about' },
    { path: '/research', slug: 'research' },
    { path: '/publications', slug: 'publications' },
    { path: '/teaching', slug: 'teaching' },
    { path: '/contact', slug: 'contact' },
  ];

  for (const vp of VIEWPORTS) {
    for (const pageItem of PAGES_TO_TEST) {
      test(`visual snapshot for ${pageItem.slug} at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageItem.path);

        // Allow any entrance animations or web fonts to stabilize
        await page.waitForTimeout(500);

        // Compare screenshot against baseline with 0.1% maxDiffPixelRatio tolerance
        await expect(page).toHaveScreenshot(`${pageItem.slug}-${vp.name}.png`, {
          maxDiffPixelRatio: 0.001, // 0.1% tolerance
          animations: 'disabled',
          mask: [page.locator('.particle-network-canvas, canvas')], // mask dynamic decorative canvas
        });
      });
    }
  }
});
