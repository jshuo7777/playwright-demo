import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductFormData {
  name: string;
  price: string;
  stock?: string;
  description?: string;
}

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ============================================
  // LOCATORS
  // ============================================

  // List
  get heading() {
    return this.page.getByRole('heading', { name: 'Products' });
  }

  get addProductButton() {
    return this.page.getByRole('link', { name: 'Add Product' });
  }

  get productCards() {
    return this.page.locator('.product-card');
  }

  // Detail
  get productName() {
    return this.page.locator('.page-header h1');
  }

  get priceValue() {
    return this.page.locator('.price-value');
  }

  get stockBadge() {
    return this.page.locator('.stock-badge');
  }

  get description() {
    return this.page.locator('.description-card p');
  }

  get editButton() {
    return this.page.getByRole('link', { name: 'Edit' });
  }

  get deleteButton() {
    return this.page.getByRole('button', { name: 'Delete' });
  }

  // Form
  get formTitle() {
    return this.page.locator('.page-header h1');
  }

  get nameInput() {
    return this.page.getByLabel('Product Name');
  }

  get saveButton() {
    return this.page.getByRole('button', { name: /Create Product|Update Product/i });
  }

  get nameError() {
    return this.page.getByText('Product name is required');
  }

  get priceError() {
    return this.page.getByText('Price is required');
  }

  // Modal
  get deleteModalMessage() {
    return this.page.getByText('Are you sure you want to delete this product?');
  }

  get confirmDeleteButton() {
    return this.page.locator('.modal .confirm-btn');
  }

  get cancelDeleteButton() {
    return this.page.locator('.modal .cancel-btn');
  }

  // ============================================
  // HIGH-LEVEL ACTIONS
  // ============================================

  async gotoList() {
    await this.page.goto('/products');
  }

  async gotoDetail(id: number) {
    await this.page.goto(`/products/${id}`);
  }

  async gotoNewForm() {
    await this.page.goto('/products/new');
  }

  async gotoEditForm(id: number) {
    await this.page.goto(`/products/${id}/edit`);
  }

  getProductCard(name: string): Locator {
    return this.page.locator('.product-card').filter({ hasText: name });
  }

  async clickProduct(name: string) {
    await this.page.locator('.product-name').filter({ hasText: name }).click();
  }

  async createProduct(data: ProductFormData) {
    await this.page.getByLabel('Product Name').fill(data.name);
    await this.page.getByLabel('Price').fill(data.price);
    if (data.stock) {
      await this.page.getByLabel('Stock Quantity').fill(data.stock);
    }
    if (data.description) {
      await this.page.getByLabel('Product Description').fill(data.description);
    }
    await this.saveButton.click();
  }

  async updateProduct(data: Partial<ProductFormData>) {
    if (data.name) {
      await this.page.getByLabel('Product Name').fill(data.name);
    }
    if (data.price) {
      await this.page.getByLabel('Price').fill(data.price);
    }
    if (data.stock) {
      await this.page.getByLabel('Stock Quantity').fill(data.stock);
    }
    if (data.description) {
      await this.page.getByLabel('Product Description').fill(data.description);
    }
    await this.saveButton.click();
  }

  async deleteProduct() {
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
  }

  async deleteProductAndCancel() {
    await this.deleteButton.click();
    await this.cancelDeleteButton.click();
  }

  // ============================================
  // ACTIONS WITH ASSERTIONS (SUCCESS)
  // ============================================

  async createProductAndVerify(data: ProductFormData) {
    await this.createProduct(data);
    await expect(this.page).toHaveURL('/products');
    await expect(this.getProductCard(data.name)).toBeVisible();
  }

  async updateProductAndVerify(data: Partial<ProductFormData>) {
    await this.updateProduct(data);
    // 更新後跳轉到產品詳情頁
    await expect(this.page).toHaveURL(/\/products\/\d+$/);
    if (data.name) {
      await expect(this.productName).toContainText(data.name);
    }
  }

  async deleteProductAndVerify() {
    await this.deleteProduct();
    await expect(this.page).toHaveURL('/products');
  }

  async viewProductAndVerify(name: string) {
    await this.clickProduct(name);
    await expect(this.page).toHaveURL(/\/products\/\d+/);
    await expect(this.productName).toContainText(name);
  }

  // ============================================
  // ACTIONS WITH ASSERTIONS (VALIDATION/CANCEL)
  // ============================================

  async submitEmptyFormAndVerifyErrors() {
    await this.saveButton.click();
    await expect(this.nameError).toBeVisible();
    await expect(this.priceError).toBeVisible();
  }

  async deleteProductCancelAndVerify() {
    await this.deleteProductAndCancel();
    await expect(this.deleteModalMessage).not.toBeVisible();
  }
}
