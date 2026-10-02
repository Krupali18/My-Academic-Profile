import { test, expect } from '@playwright/test';

/**
 * Public Site User Journeys & Route Availability (MD File 13)
 */
test.describe('Public Academic Portal - User Experience', () => {
  test('homepage loads with correct branding and single h1 heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Dr. Krupali Donda/);

    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toBeVisible();
  });

  test('header navigation transitions to inner pages smoothly', async ({ page }) => {
    await page.goto('/');
    // Click research link
    const researchLink = page.locator('header nav a[href="/research"]').first();
    await researchLink.click();

    await expect(page).toHaveURL(/\/research/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('mobile responsive navigation drawer toggles on small viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const toggleButton = page.locator('button[aria-label="Toggle navigation"]');
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // Verify mobile navigation menu is rendered
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();
  });

  test('all 11 public academic pages resolve with HTTP 200 and valid DOM', async ({ page }) => {
    const publicPages = [
      '/',
      '/about',
      '/research',
      '/publications',
      '/teaching',
      '/honours',
      '/talks',
      '/gallery',
      '/news',
      '/team',
      '/contact',
    ];

    for (const path of publicPages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('legacy .html URLs redirect to modern clean routes', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page).toHaveURL(/\/about$/);

    await page.goto('/honors.html');
    await expect(page).toHaveURL(/\/honours$/);
  });
});
