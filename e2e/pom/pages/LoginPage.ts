import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get usernameInput() {
    return this.page.getByLabel('Username');
  }

  get passwordInput() {
    return this.page.getByLabel('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: /Sign In/i });
  }

  get errorAlert() {
    return this.page.getByRole('alert');
  }

  get usernameError() {
    return this.page.getByText('Username is required');
  }

  get passwordError() {
    return this.page.getByText('Password is required');
  }

  // Actions
  async goto() {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(username: string, password: string) {
    await this.goto();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
    await expect(this.page).toHaveURL('/dashboard');
  }

  async loginAsTestUser() {
    await this.login('testuser', 'password123');
  }
}
