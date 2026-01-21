import { test, expect } from '@playwright/test';
import { LoginPage, ProductPage } from '../pages';
import { DrawerComponent } from '../components';

test.describe('Feature: Products CRUD', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let drawer: DrawerComponent;

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    drawer = new DrawerComponent(page);

    await request.post('/api/products/reset');
    await loginPage.loginAsTestUser();
  });

  test.describe('Scenario: View product list (Read)', () => {
    test('should display list of products', async () => {
      await productPage.gotoList();

      await expect(productPage.heading).toBeVisible();
      await expect(productPage.productCards.first()).toBeVisible();
      await expect(productPage.addProductButton).toBeVisible();
    });
  });

  test.describe('Scenario: View product details (Read)', () => {
    test('should display product details when clicking on a product', async () => {
      await productPage.gotoList();
      await productPage.viewProductAndVerify('Laptop Pro');

      await expect(productPage.priceValue).toBeVisible();
      await expect(productPage.stockBadge).toBeVisible();
      await expect(productPage.description).toBeVisible();
      await expect(productPage.editButton).toBeVisible();
      await expect(productPage.deleteButton).toBeVisible();
    });
  });

  test.describe('Scenario: Create new product (Create)', () => {
    test('should create a new product successfully', async () => {
      await productPage.gotoNewForm();
      await productPage.createProductAndVerify({
        name: 'Test Product',
        price: '99.99',
        stock: '50',
        description: 'A test product description',
      });
    });

    test('should show validation errors for empty required fields', async () => {
      await productPage.gotoNewForm();
      await productPage.submitEmptyFormAndVerifyErrors();
    });
  });

  test.describe('Scenario: Edit product (Update)', () => {
    test('should update an existing product', async () => {
      await productPage.gotoEditForm(1);
      await expect(productPage.nameInput).toHaveValue('Laptop Pro');

      await productPage.updateProductAndVerify({ name: 'Laptop Pro Updated' });
    });
  });

  test.describe('Scenario: Delete product (Delete)', () => {
    test('should delete a product after confirmation', async () => {
      await productPage.gotoDetail(1);
      await productPage.deleteProductAndVerify();
    });

    test('should cancel deletion when clicking Cancel', async () => {
      await productPage.gotoDetail(2); // 用不同 ID 避免平行測試衝突
      await productPage.deleteProductCancelAndVerify();
      await expect(productPage.productName).toContainText('Wireless Mouse');
    });
  });

  test.describe('Scenario: Navigate to products via drawer', () => {
    test('should navigate to products page from drawer menu', async () => {
      await drawer.navigateToProducts();
      await expect(productPage.heading).toBeVisible();
    });
  });
});
