import { test, expect, Page } from '@playwright/test';

// Helper: Login and navigate to dashboard
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/dashboard');
}

// Helper: Fill product form
async function fillProductForm(page: Page, product: { name: string; price: string; stock: string; description: string }) {
  await page.getByLabel('Product Name').fill(product.name);
  await page.getByLabel('Price').fill(product.price);
  await page.getByLabel('Stock').fill(product.stock);
  await page.getByLabel('Description').fill(product.description);
}

test.describe('Feature: Products CRUD', () => {
  // Run tests serially to avoid race conditions with shared product data
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/products/reset');
    await loginAsTestUser(page);
  });

  test.describe('Read Operations', () => {
    test('should display list of products', async ({ page }) => {
      await page.goto('/products');

      await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
      // Products are displayed in a grid, not a table
      await expect(page.locator('.products-grid')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Add Product' })).toBeVisible();
    });

    test('should display product details when clicking on a product', async ({ page }) => {
      await page.goto('/products');
      await page.getByRole('link', { name: 'Laptop Pro' }).first().click();

      // Verify product detail page
      await expect(page).toHaveURL(/\/products\/\d+/);
      await expect(page.getByRole('heading', { name: 'Laptop Pro' })).toBeVisible();

      // Verify action buttons
      await expect(page.getByRole('link', { name: 'Edit' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    });
  });

  test.describe('Create Operations', () => {
    test('should create a new product successfully', async ({ page }) => {
      await page.goto('/products');
      await page.getByRole('link', { name: 'Add Product' }).click();

      // Verify form page
      await expect(page).toHaveURL('/products/new');
      await expect(page.getByRole('heading', { name: 'Add New Product' })).toBeVisible();

      // Fill and submit form
      await fillProductForm(page, {
        name: 'Test Product',
        price: '99.99',
        stock: '50',
        description: 'A test product description'
      });
      await page.getByRole('button', { name: 'Create Product' }).click();

      // Verify redirect and new product in list
      await expect(page).toHaveURL('/products');
      await expect(page.getByRole('link', { name: 'Test Product' })).toBeVisible();
    });

    test('should show validation errors for empty required fields', async ({ page }) => {
      await page.goto('/products/new');
      await page.getByRole('button', { name: 'Create Product' }).click();

      await expect(page.getByText('Product name is required')).toBeVisible();
      await expect(page.getByText('Price is required')).toBeVisible();
    });
  });

  test.describe('Update Operations', () => {
    test('should update an existing product', async ({ page }) => {
      await page.goto('/products/1');
      await page.getByRole('link', { name: 'Edit' }).click();

      // Verify edit form with current values
      await expect(page).toHaveURL('/products/1/edit');
      await expect(page.getByRole('heading', { name: 'Edit Product' })).toBeVisible();
      await expect(page.getByLabel('Product Name')).toHaveValue('Laptop Pro');

      // Update and save
      await page.getByLabel('Product Name').fill('Laptop Pro Updated');
      await page.getByRole('button', { name: 'Update Product' }).click();

      // Verify update
      await expect(page).toHaveURL('/products/1');
      await expect(page.getByRole('heading', { name: 'Laptop Pro Updated' })).toBeVisible();
    });
  });

  test.describe('Delete Operations', () => {
    test('should delete a product after confirmation', async ({ page }) => {
      await page.goto('/products/1');
      await page.getByRole('button', { name: 'Delete' }).click();

      // Confirm deletion - the confirm button also says "Delete"
      await expect(page.getByText('Are you sure you want to delete this product?')).toBeVisible();
      await page.locator('.modal-actions').getByRole('button', { name: 'Delete' }).click();

      // Verify redirect to list
      await expect(page).toHaveURL('/products');
    });

    test('should cancel deletion when clicking Cancel', async ({ page }) => {
      await page.goto('/products/1');
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.getByRole('button', { name: 'Cancel' }).click();

      // Should remain on product detail page
      await expect(page).toHaveURL('/products/1');
      await expect(page.getByRole('heading', { name: 'Laptop Pro' })).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to products page from drawer menu', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();

      // Open drawer and navigate
      await page.getByRole('button', { name: 'Toggle menu' }).click();
      await page.getByRole('button', { name: 'Products' }).click();

      await expect(page).toHaveURL('/products');
      await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    });
  });
});
