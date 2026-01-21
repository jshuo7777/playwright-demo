import { test, expect, Page } from '@playwright/test';

// Helper: Login and navigate to dashboard
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Feature: Navigation Component', () => {
  test('should display navigation bar with all elements when logged in', async ({ page }) => {
    await loginAsTestUser(page);

    // Verify all navigation elements
    await expect(page.locator('.top-nav')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    // Username appears in the top nav bar
    await expect(page.locator('.top-nav').getByText('testuser')).toBeVisible();
  });

  test('should not display navigation on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('.top-nav')).not.toBeVisible();
  });
});

test.describe('Feature: User Logout', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('should logout user and redirect to login page', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('should prevent access to dashboard after logout', async ({ page }) => {
    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');

    // Try to access dashboard
    await page.goto('/dashboard');

    // Should be redirected to login
    await expect(page).toHaveURL('/login');
  });

  test('should clear session data on logout', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();

    // Verify localStorage is cleared
    const authData = await page.evaluate(() => localStorage.getItem('auth'));
    expect(authData).toBeNull();
  });
});
