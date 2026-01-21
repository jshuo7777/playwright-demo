import { test, expect, Page } from '@playwright/test';

// Helper: Fill login form and submit
async function login(page: Page, username: string, password: string) {
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

test.describe('Feature: User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should allow user to login and redirect to dashboard', async ({ page }) => {
    // Given I am on the login page
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();

    // When I login with valid credentials
    await login(page, 'testuser', 'password123');

    // Then I should be redirected to the dashboard with welcome message
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // When I login with invalid credentials
    await login(page, 'wronguser', 'wrongpass');

    // Then I should see an error and remain on login page
    await expect(page.getByRole('alert')).toContainText('Invalid username or password');
    await expect(page).toHaveURL('/login');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // When I click login without entering credentials
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Then I should see validation errors
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should redirect to login when accessing protected routes', async ({ page }) => {
    // Given I am not logged in (clear any existing session)
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());

    // When I try to access dashboard directly
    await page.goto('/dashboard');

    // Then I should be redirected to login
    await expect(page).toHaveURL('/login');
  });
});
