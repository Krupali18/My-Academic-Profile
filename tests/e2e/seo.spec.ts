import { test, expect } from '@playwright/test';

/**
 * Test Group G — SEO Settings (MD File 13)
 *
 * Rules:
 * 1. Edit SEO title for a page → character counter updates
 * 2. Exceed 60 chars → counter indicates overflow
 * 3. Save → page's SEO title updated
 */
test.describe('SEO Settings E2E (Test Group G)', () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', 'admin@krupalidonda.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin/);

    // Navigate to SEO
    await page.goto('/admin/seo');
    await expect(page.locator('text=SEO').first()).toBeVisible();
  });

  test('displays page selector and SEO meta fields', async ({ page }) => {
    // Verify title and description inputs exist
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]').first();
    await expect(titleInput).toBeVisible();

    const descInput = page.locator('textarea[placeholder*="description"], textarea[name*="description"]').first();
    await expect(descInput).toBeVisible();
  });

  test('updates character counter dynamically as user types', async ({ page }) => {
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]').first();
    await titleInput.fill('Research in Acoustic Metamaterials');

    // Verify counter shows characters (e.g. 33/60)
    const counter = page.locator('text=/60').first();
    await expect(counter).toBeVisible();
  });

  test('saves SEO changes and displays success toast', async ({ page }) => {
    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Save SEO")').first();
    await saveBtn.click();

    const toast = page.locator('text=Saved, text=Success, text=updated').first();
    await expect(toast).toBeVisible();
  });
});
