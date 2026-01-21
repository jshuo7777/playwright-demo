import { test, expect } from '@playwright/test';

// Helper to login before navigation tests
async function loginAsTestUser(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Feature: Navigation Component', () => {
  test.describe('Scenario: Navigation is visible when logged in', () => {
    test('should display navigation bar with all links', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('Then I should see the navigation bar', async () => {
        await expect(page.getByRole('navigation')).toBeVisible();
      });

      await test.step('And I should see a link to Dashboard', async () => {
        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('And I should see a logout button', async () => {
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
      });

      await test.step('And I should see my username displayed', async () => {
        await expect(page.getByTestId('current-user')).toContainText('testuser');
      });
    });
  });

  test.describe('Scenario: Navigation is hidden on login page', () => {
    test('should not display navigation on login page', async ({ page }) => {
      await test.step('Given I am on the login page', async () => {
        await page.goto('/login');
      });

      await test.step('Then I should not see the navigation bar', async () => {
        await expect(page.getByRole('navigation')).not.toBeVisible();
      });
    });
  });
});

test.describe('Feature: User Logout', () => {
  test.describe('Scenario: Successful logout', () => {
    test('should logout user and redirect to login page', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('When I click the logout button', async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
      });

      await test.step('Then I should be redirected to the login page', async () => {
        await expect(page).toHaveURL('/login');
      });

      await test.step('And I should see the login form', async () => {
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Cannot access dashboard after logout', () => {
    test('should prevent access to dashboard after logout', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('When I logout', async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page).toHaveURL('/login');
      });

      await test.step('And I try to navigate back to dashboard', async () => {
        await page.goto('/dashboard');
      });

      await test.step('Then I should be redirected to login', async () => {
        await expect(page).toHaveURL('/login');
      });
    });
  });

  test.describe('Scenario: Logout clears session data', () => {
    test('should clear all user data on logout', async ({ page }) => {
      await test.step('Given I am logged in as "testuser"', async () => {
        await loginAsTestUser(page);
      });

      await test.step('When I logout', async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
      });

      await test.step('Then the local storage should be cleared', async () => {
        const authData = await page.evaluate(() => localStorage.getItem('auth'));
        expect(authData).toBeNull();
      });
    });
  });
});
