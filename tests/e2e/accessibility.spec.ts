import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility & WCAG AA Compliance Suite (MD File 13)
 */
test.describe('Accessibility & WCAG AA Compliance', () => {
  const publicRoutes = ['/', '/about', '/publications', '/contact', '/admin/login'];

  for (const route of publicRoutes) {
    test(`route "${route}" passes axe-core accessibility checks with 0 critical violations`, async ({ page }) => {
      await page.goto(route);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#tsparticles, canvas') // exclude decorative canvas layers
        .analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toEqual([]);
    });
  }

  test('skip-to-content link receives focus on initial Tab press', async ({ page }) => {
    await page.goto('/');

    // Press Tab
    await page.keyboard.press('Tab');

    // Focused element should be the skip-to-content link
    const activeElementText = await page.evaluate(() => document.activeElement?.textContent?.trim());
    expect(activeElementText).toMatch(/skip to (main )?content/i);
  });
});
