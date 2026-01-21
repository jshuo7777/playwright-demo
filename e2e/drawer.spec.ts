import { test, expect, Page } from '@playwright/test';

// Helper: Login and navigate to dashboard
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/dashboard');
}

// Helper: Open drawer
async function openDrawer(page: Page) {
  await page.getByRole('button', { name: 'Toggle menu' }).click();
  await expect(page.getByTestId('drawer-panel')).toBeVisible();
}

test.describe('Feature: Drawer Navigation Panel', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('should toggle drawer visibility when clicking the toggle button', async ({ page }) => {
    const drawerPanel = page.getByTestId('drawer-panel');
    const toggleButton = page.getByRole('button', { name: 'Toggle menu' });

    // Drawer should be closed by default
    await expect(drawerPanel).not.toBeVisible();

    // Open drawer
    await toggleButton.click();
    await expect(drawerPanel).toBeVisible();

    // Close drawer via close button
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(drawerPanel).not.toBeVisible();
  });

  test('should display navigation items in drawer', async ({ page }) => {
    await openDrawer(page);

    // Verify navigation items are visible
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
  });

  test('should navigate to Profile page from drawer', async ({ page }) => {
    await openDrawer(page);
    await page.getByRole('button', { name: 'Profile' }).click();

    await expect(page).toHaveURL('/profile');
  });

  test('should navigate to Settings page from drawer', async ({ page }) => {
    await openDrawer(page);
    await page.getByRole('button', { name: 'Settings' }).click();

    await expect(page).toHaveURL('/settings');
  });

  test('should navigate to Products page from drawer', async ({ page }) => {
    await openDrawer(page);
    await page.getByRole('button', { name: 'Products' }).click();

    await expect(page).toHaveURL('/products');
  });

  test('should navigate to Dashboard from drawer on another page', async ({ page }) => {
    // Start from Profile page
    await page.goto('/profile');
    await openDrawer(page);
    await page.getByRole('button', { name: 'Dashboard' }).click();

    await expect(page).toHaveURL('/dashboard');
  });

  test('should close drawer after selecting a navigation item', async ({ page }) => {
    await openDrawer(page);
    await page.getByRole('button', { name: 'Profile' }).click();

    await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
  });

  test('should close drawer when clicking overlay', async ({ page }) => {
    await openDrawer(page);

    // Click overlay to close
    await page.getByTestId('drawer-overlay').click();
    await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
  });
});
