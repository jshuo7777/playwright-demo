import { test, expect } from '@playwright/test';

// Helper to login before tests
async function loginAsTestUser(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Feature: Products CRUD', () => {
  test.beforeEach(async ({ page, request }) => {
    // Reset products data before each test
    await request.post('/api/products/reset');
    await loginAsTestUser(page);
  });

  test.describe('Scenario: View product list (Read)', () => {
    test('should display list of products', async ({ page }) => {
      await test.step('Given I navigate to the products page', async () => {
        await page.goto('/products');
      });

      await test.step('Then I should see the products heading', async () => {
        await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
      });

      await test.step('And I should see a list of products', async () => {
        await expect(page.getByRole('table')).toBeVisible();
      });

      await test.step('And I should see the "Add Product" button', async () => {
        await expect(page.getByRole('link', { name: 'Add Product' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: View product details (Read)', () => {
    test('should display product details when clicking on a product', async ({ page }) => {
      await test.step('Given I am on the products page', async () => {
        await page.goto('/products');
      });

      await test.step('When I click on a product name', async () => {
        await page.getByRole('link', { name: 'Laptop Pro' }).click();
      });

      await test.step('Then I should see the product detail page', async () => {
        await expect(page).toHaveURL(/\/products\/\d+/);
        await expect(page.getByRole('heading', { name: 'Laptop Pro' })).toBeVisible();
      });

      await test.step('And I should see product information', async () => {
        await expect(page.getByText('Price:')).toBeVisible();
        await expect(page.getByText('Stock:')).toBeVisible();
        await expect(page.getByText('Description:')).toBeVisible();
      });

      await test.step('And I should see Edit and Delete buttons', async () => {
        await expect(page.getByRole('link', { name: 'Edit' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Create new product (Create)', () => {
    test('should create a new product successfully', async ({ page }) => {
      await test.step('Given I am on the products page', async () => {
        await page.goto('/products');
      });

      await test.step('When I click the "Add Product" button', async () => {
        await page.getByRole('link', { name: 'Add Product' }).click();
      });

      await test.step('Then I should see the product form', async () => {
        await expect(page).toHaveURL('/products/new');
        await expect(page.getByRole('heading', { name: 'Add New Product' })).toBeVisible();
      });

      await test.step('When I fill in the product details', async () => {
        await page.getByLabel('Product Name').fill('Test Product');
        await page.getByLabel('Price').fill('99.99');
        await page.getByLabel('Stock').fill('50');
        await page.getByLabel('Description').fill('A test product description');
      });

      await test.step('And I click the Save button', async () => {
        await page.getByRole('button', { name: 'Save' }).click();
      });

      await test.step('Then I should be redirected to the products list', async () => {
        await expect(page).toHaveURL('/products');
      });

      await test.step('And I should see the new product in the list', async () => {
        await expect(page.getByRole('cell', { name: 'Test Product' })).toBeVisible();
      });
    });

    test('should show validation errors for empty required fields', async ({ page }) => {
      await test.step('Given I am on the add product page', async () => {
        await page.goto('/products/new');
      });

      await test.step('When I click Save without filling the form', async () => {
        await page.getByRole('button', { name: 'Save' }).click();
      });

      await test.step('Then I should see validation errors', async () => {
        await expect(page.getByText('Product name is required')).toBeVisible();
        await expect(page.getByText('Price is required')).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Edit product (Update)', () => {
    test('should update an existing product', async ({ page }) => {
      await test.step('Given I am viewing a product detail', async () => {
        await page.goto('/products/1');
      });

      await test.step('When I click the Edit button', async () => {
        await page.getByRole('link', { name: 'Edit' }).click();
      });

      await test.step('Then I should see the edit form with current values', async () => {
        await expect(page).toHaveURL('/products/1/edit');
        await expect(page.getByRole('heading', { name: 'Edit Product' })).toBeVisible();
        await expect(page.getByLabel('Product Name')).toHaveValue('Laptop Pro');
      });

      await test.step('When I update the product name', async () => {
        await page.getByLabel('Product Name').fill('Laptop Pro Updated');
      });

      await test.step('And I click the Save button', async () => {
        await page.getByRole('button', { name: 'Save' }).click();
      });

      await test.step('Then I should be redirected to the product detail', async () => {
        await expect(page).toHaveURL('/products/1');
      });

      await test.step('And I should see the updated product name', async () => {
        await expect(page.getByRole('heading', { name: 'Laptop Pro Updated' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Delete product (Delete)', () => {
    test('should delete a product after confirmation', async ({ page }) => {
      await test.step('Given I am viewing a product detail', async () => {
        await page.goto('/products/1');
      });

      await test.step('When I click the Delete button', async () => {
        await page.getByRole('button', { name: 'Delete' }).click();
      });

      await test.step('Then I should see a confirmation dialog', async () => {
        await expect(page.getByText('Are you sure you want to delete this product?')).toBeVisible();
      });

      await test.step('When I confirm the deletion', async () => {
        await page.getByRole('button', { name: 'Confirm' }).click();
      });

      await test.step('Then I should be redirected to the products list', async () => {
        await expect(page).toHaveURL('/products');
      });
    });

    test('should cancel deletion when clicking Cancel', async ({ page }) => {
      await test.step('Given I am viewing a product detail', async () => {
        await page.goto('/products/1');
      });

      await test.step('When I click the Delete button', async () => {
        await page.getByRole('button', { name: 'Delete' }).click();
      });

      await test.step('And I click Cancel on the confirmation dialog', async () => {
        await page.getByRole('button', { name: 'Cancel' }).click();
      });

      await test.step('Then I should remain on the product detail page', async () => {
        await expect(page).toHaveURL('/products/1');
        await expect(page.getByRole('heading', { name: 'Laptop Pro' })).toBeVisible();
      });
    });
  });

  test.describe('Scenario: Navigate to products via drawer', () => {
    test('should navigate to products page from drawer menu', async ({ page }) => {
      await test.step('Given I am on the dashboard', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      });

      await test.step('When I open the drawer', async () => {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
      });

      await test.step('And I expand the navigation dropdown', async () => {
        await page.getByRole('button', { name: 'Navigation' }).click();
      });

      await test.step('And I click on Products', async () => {
        await page.getByRole('menuitem', { name: 'Products' }).click();
      });

      await test.step('Then I should be on the products page', async () => {
        await expect(page).toHaveURL('/products');
        await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
      });
    });
  });
});
