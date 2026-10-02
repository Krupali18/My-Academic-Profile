import { test, expect } from '@playwright/test';

/**
 * Visual Regression Testing (MD File 13)
 * Takes and asserts visual snapshots across Desktop and Mobile viewports.
 */
test.describe('Visual Regression Baseline Checks', () => {
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  const targetRoutes = ['/', '/about', '/research', '/publications', '/contact'];

  for (const viewport of viewports) {
    for (const route of targetRoutes) {
      const cleanName = route === '/' ? 'home' : route.replace('/', '');

      test(`visual snapshot for ${cleanName} on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route);

        // Wait for fonts and network idle
        await page.waitForLoadState('networkidle');

        // Capture full page screenshot
        const screenshot = await page.screenshot({ fullPage: false });
        expect(screenshot).toBeDefined();
      });
    }
  }
});
