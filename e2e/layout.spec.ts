import { test, expect } from '@playwright/test';

test.describe('Feature: Application Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test.describe('Scenario: Layout structure on authenticated pages', () => {
    test('should display consistent layout with navbar and drawer toggle on all pages', async ({ page }) => {
      await test.step('Given I am on the dashboard page', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('Then I should see the top navigation bar', async () => {
        await expect(page.getByRole('navigation')).toBeVisible();
      });

      await test.step('And I should see the drawer toggle button', async () => {
        await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
      });

      await test.step('And I should see the logout button', async () => {
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
      });

      await test.step('When I navigate to the Profile page', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.getByRole('button', { name: 'Navigation' }).click();
        await page.getByRole('menuitem', { name: 'Profile' }).click();
      });

      await test.step('Then I should still see the same layout elements', async () => {
        await expect(page.getByRole('navigation')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Login page should not have layout', () => {
    test('should not display layout elements on login page', async ({ page }) => {
      await test.step('Given I logout from the application', async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
      });

      await test.step('When I am on the login page', async () => {
        await expect(page).toHaveURL('/login');
      });

      await test.step('Then I should not see the drawer toggle button', async () => {
        await expect(page.getByRole('button', { name: 'Toggle menu' })).not.toBeVisible();
      });

      await test.step('And I should not see the top navigation with logout', async () => {
        await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible();
      });
    });
  });

  test.describe('Scenario: Drawer can be opened on any authenticated page', () => {
    test('should be able to open drawer on Profile page', async ({ page }) => {
      await test.step('Given I navigate to Profile page', async () => {
        await page.goto('/profile');
        await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
      });

      await test.step('When I click the drawer toggle button', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
      });

      await test.step('Then the drawer should be open', async () => {
        await expect(page.getByTestId('drawer-panel')).toBeVisible();
      });

      await test.step('And I should see the navigation dropdown', async () => {
        await expect(page.getByRole('button', { name: 'Navigation' })).toBeVisible();
      });
    });
  });
});
