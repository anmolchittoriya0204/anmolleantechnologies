
import { expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.thankYouHeading = page.getByRole('heading', { name: /Thank you for your order!/i });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async assertThankYouVisible() {
    await expect(this.thankYouHeading).toBeVisible();
  }

  async backHome() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
