import { test, expect } from '@playwright/test';

test.describe('Feature: Drawer Navigation Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test.describe('Scenario: Open and close the drawer', () => {
    test('should toggle drawer visibility when clicking the toggle button', async ({ page }) => {
      await test.step('Given I am on the dashboard page', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('Then the drawer should be closed by default', async () => {
        await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
      });

      await test.step('When I click the drawer toggle button', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
      });

      await test.step('Then the drawer should be open', async () => {
        await expect(page.getByTestId('drawer-panel')).toBeVisible();
      });

      await test.step('When I click the drawer toggle button again', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
      });

      await test.step('Then the drawer should be closed', async () => {
        await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
      });
    });
  });

  test.describe('Scenario: Drawer contains navigation dropdown', () => {
    test('should display dropdown menu with navigation items', async ({ page }) => {
      await test.step('Given I am on the dashboard page', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('When I open the drawer', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await expect(page.getByTestId('drawer-panel')).toBeVisible();
      });

      await test.step('Then I should see a dropdown menu', async () => {
        await expect(page.getByRole('button', { name: 'Navigation' })).toBeVisible();
      });

      await test.step('When I click the dropdown menu', async () => {
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('Then I should see the navigation options', async () => {
        await expect(page.getByRole('menuitem', { name: 'Dashboard' })).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Settings' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Navigate using drawer dropdown', () => {
    test('should navigate to Profile page when clicking Profile in dropdown', async ({ page }) => {
      await test.step('Given I have the drawer open with dropdown expanded', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('When I click on Profile menu item', async () => {
        await page.getByRole('menuitem', { name: 'Profile' }).click();
      });

      await test.step('Then I should be navigated to the Profile page', async () => {
        await expect(page).toHaveURL('/profile');
        await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
      });
    });

    test('should navigate to Settings page when clicking Settings in dropdown', async ({ page }) => {
      await test.step('Given I have the drawer open with dropdown expanded', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('When I click on Settings menu item', async () => {
        await page.getByRole('menuitem', { name: 'Settings' }).click();
      });

      await test.step('Then I should be navigated to the Settings page', async () => {
        await expect(page).toHaveURL('/settings');
        await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
      });
    });

    test('should navigate to Dashboard page when clicking Dashboard in dropdown', async ({ page }) => {
      await test.step('Given I am on the Profile page with drawer open', async () => {
        await page.goto('/profile');
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('When I click on Dashboard menu item', async () => {
        await page.getByRole('menuitem', { name: 'Dashboard' }).click();
      });

      await test.step('Then I should be navigated to the Dashboard page', async () => {
        await expect(page).toHaveURL('/dashboard');
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Drawer closes after navigation', () => {
    test('should close the drawer after selecting a navigation item', async ({ page }) => {
      await test.step('Given I have the drawer open with dropdown expanded', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('When I click on a menu item', async () => {
        await page.getByRole('menuitem', { name: 'Profile' }).click();
      });

      await test.step('Then the drawer should be closed', async () => {
        await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
      });
    });
  });

  test.describe('Scenario: Close drawer by clicking overlay', () => {
    test('should close drawer when clicking outside the drawer panel', async ({ page }) => {
      await test.step('Given the drawer is open', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await expect(page.getByTestId('drawer-panel')).toBeVisible();
      });

      await test.step('When I click on the overlay', async () => {
        await page.getByTestId('drawer-overlay').click();
      });

      await test.step('Then the drawer should be closed', async () => {
        await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
      });
    });
  });
});
