import { test, expect } from '@playwright/test';

test.describe('Feature: User Login', () => {
  test.describe('Scenario: Successful login with valid credentials', () => {
    test('should allow user to login and redirect to dashboard', async ({ page }) => {
      await test.step('Given I am on the login page', async () => {
        await page.goto('/login');
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      });

      await test.step('When I enter valid username "testuser"', async () => {
        await page.getByLabel('Username').fill('testuser');
      });

      await test.step('And I enter valid password "password123"', async () => {
        await page.getByLabel('Password').fill('password123');
      });

      await test.step('And I click the login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
      });

      await test.step('Then I should be redirected to the dashboard', async () => {
        await expect(page).toHaveURL('/dashboard');
      });

      await test.step('And I should see a welcome message', async () => {
        await expect(page.getByText('Welcome, testuser')).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Failed login with invalid credentials', () => {
    test('should show error message for invalid credentials', async ({ page }) => {
      await test.step('Given I am on the login page', async () => {
        await page.goto('/login');
      });

      await test.step('When I enter invalid username "wronguser"', async () => {
        await page.getByLabel('Username').fill('wronguser');
      });

      await test.step('And I enter invalid password "wrongpass"', async () => {
        await page.getByLabel('Password').fill('wrongpass');
      });

      await test.step('And I click the login button', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
      });

      await test.step('Then I should see an error message', async () => {
        await expect(page.getByRole('alert')).toContainText('Invalid username or password');
      });

      await test.step('And I should remain on the login page', async () => {
        await expect(page).toHaveURL('/login');
      });
    });
  });

  test.describe('Scenario: Login form validation', () => {
    test('should show validation errors for empty fields', async ({ page }) => {
      await test.step('Given I am on the login page', async () => {
        await page.goto('/login');
      });

      await test.step('When I click the login button without entering credentials', async () => {
        await page.getByRole('button', { name: 'Login' }).click();
      });

      await test.step('Then I should see validation error for username', async () => {
        await expect(page.getByText('Username is required')).toBeVisible();
      });

      await test.step('And I should see validation error for password', async () => {
        await expect(page.getByText('Password is required')).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Redirect unauthenticated users to login', () => {
    test('should redirect to login when accessing protected routes', async ({ page }) => {
      await test.step('Given I am not logged in', async () => {
        // Navigate first to be able to clear storage
        await page.goto('/login');
        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());
      });

      await test.step('When I try to access the dashboard directly', async () => {
        await page.goto('/dashboard');
      });

      await test.step('Then I should be redirected to the login page', async () => {
        await expect(page).toHaveURL('/login');
      });
    });
  });
});
