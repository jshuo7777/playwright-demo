import { test, expect, Page } from '@playwright/test';

// Helper: Login and navigate to dashboard
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/dashboard');
}

// Helper: Verify common layout elements are visible
async function verifyLayoutElements(page: Page) {
  await expect(page.locator('.top-nav')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
}

test.describe('Feature: Application Layout', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('should display consistent layout on dashboard', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
    await verifyLayoutElements(page);
  });

  test('should display consistent layout after navigating to Profile', async ({ page }) => {
    // Navigate to Profile via drawer
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.getByRole('button', { name: 'Profile' }).click();

    // Verify layout persists
    await verifyLayoutElements(page);
  });

  test('should not display layout elements on login page', async ({ page }) => {
    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');

    // Layout elements should not be visible
    await expect(page.getByRole('button', { name: 'Toggle menu' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible();
  });

  test('should be able to open drawer on Profile page', async ({ page }) => {
    // Navigate directly to Profile
    await page.goto('/profile');

    // Open drawer
    await page.getByRole('button', { name: 'Toggle menu' }).click();

    // Verify drawer is open with navigation items
    await expect(page.getByTestId('drawer-panel')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
  });
});
