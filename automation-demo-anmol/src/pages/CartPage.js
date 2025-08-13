
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  /* This function is to assert the names */
  async assertItems(names) {
    await expect(this.cartItems).toHaveCount(names.length);
    const cartNames = await this.cartItems.locator('.inventory_item_name').allInnerTexts();
    for (const name of names) {
      expect(cartNames).toContain(name);
    }
  }

  /*This function is to click on the checkout page */
  async checkout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}
