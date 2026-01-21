import { test, expect, Page } from '@playwright/test';

// Helper: Login and navigate to dashboard
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Feature: Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('should display dashboard content for authenticated user', async ({ page }) => {
    // Then I should see dashboard elements
    await expect(page.getByRole('heading', { name: /Welcome back, testuser/ })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should show user statistics panel', async ({ page }) => {
    // Then I should see statistics section with metrics
    await expect(page.getByRole('region', { name: 'Statistics' })).toBeVisible();
    await expect(page.getByText('Profile Visits')).toBeVisible();
    await expect(page.getByText('Active Sessions')).toBeVisible();
  });

  test('should maintain login state after refresh', async ({ page }) => {
    // When I refresh the page
    await page.reload();

    // Then I should still be on dashboard with welcome message
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
  });
});
