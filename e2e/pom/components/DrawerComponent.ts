import { Page } from '@playwright/test';

export class DrawerComponent {
  constructor(private page: Page) {}

  // Locators
  get toggleButton() {
    return this.page.getByRole('button', { name: 'Toggle menu' });
  }

  get panel() {
    return this.page.getByTestId('drawer-panel');
  }

  get overlay() {
    return this.page.getByTestId('drawer-overlay');
  }

  get closeButton() {
    return this.page.getByRole('button', { name: 'Close menu' });
  }

  // Navigation items
  get dashboardLink() {
    return this.page.getByRole('button', { name: 'Dashboard' });
  }

  get productsLink() {
    return this.page.getByRole('button', { name: 'Products' });
  }

  get profileLink() {
    return this.page.getByRole('button', { name: 'Profile' });
  }

  get settingsLink() {
    return this.page.getByRole('button', { name: 'Settings' });
  }

  // Actions
  async open() {
    await this.toggleButton.click();
    await this.panel.waitFor({ state: 'visible' });
  }

  async close() {
    await this.closeButton.click();
    await this.panel.waitFor({ state: 'hidden' });
  }

  async closeByOverlay() {
    await this.overlay.click();
    await this.panel.waitFor({ state: 'hidden' });
  }

  async isOpen(): Promise<boolean> {
    return this.panel.isVisible();
  }

  async navigateTo(menuItem: 'Dashboard' | 'Products' | 'Profile' | 'Settings') {
    switch (menuItem) {
      case 'Dashboard':
        await this.dashboardLink.click();
        break;
      case 'Products':
        await this.productsLink.click();
        break;
      case 'Profile':
        await this.profileLink.click();
        break;
      case 'Settings':
        await this.settingsLink.click();
        break;
    }
  }

  async navigateToProducts() {
    await this.open();
    await this.navigateTo('Products');
  }

  async navigateToDashboard() {
    await this.open();
    await this.navigateTo('Dashboard');
  }

  async navigateToProfile() {
    await this.open();
    await this.navigateTo('Profile');
  }

  async navigateToSettings() {
    await this.open();
    await this.navigateTo('Settings');
  }
}
