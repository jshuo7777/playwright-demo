import { test, expect } from '@playwright/test';

// Helper to login before dashboard tests
async function loginAsTestUser(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Feature: Dashboard', () => {
  test.describe('Scenario: View dashboard after login', () => {
    test('should display dashboard content for authenticated user', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('Then I should see the dashboard heading', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('And I should see the welcome message with my username', async () => {
        await expect(page.getByText('Welcome, testuser')).toBeVisible();
      });

      await test.step('And I should see the navigation component', async () => {
        await expect(page.getByRole('navigation')).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Dashboard displays user statistics', () => {
    test('should show user statistics panel', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('Then I should see a statistics section', async () => {
        await expect(page.getByRole('region', { name: 'Statistics' })).toBeVisible();
      });

      await test.step('And I should see profile visits count', async () => {
        await expect(page.getByText('Profile Visits')).toBeVisible();
      });

      await test.step('And I should see active sessions count', async () => {
        await expect(page.getByText('Active Sessions')).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Dashboard persists after page refresh', () => {
    test('should maintain login state after refresh', async ({ page }) => {
      await test.step('Given I am logged in and on the dashboard', async () => {
        await loginAsTestUser(page);
      });

      await test.step('When I refresh the page', async () => {
        await page.reload();
      });

      await test.step('Then I should still be on the dashboard', async () => {
        await expect(page).toHaveURL('/dashboard');
      });

      await test.step('And I should still see the welcome message', async () => {
        await expect(page.getByText('Welcome, testuser')).toBeVisible();
      });
    });
  });
});
