
import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  
  async getAllItems() {
    const count = await this.productCards.count();
    const items = [];
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const name = (await card.locator('.inventory_item_name').innerText()).trim();
      const priceText = (await card.locator('.inventory_item_price').innerText()).trim();
      const price = parseFloat(priceText.replace('$', ''));
      const addBtn = card.getByRole('button', { name: /Add to cart/i });
      items.push({ index: i, name, price, addBtn });
    }
    return items;
  }


  async addItemsToCart(items) {
    for (const item of items) {
      await item.addBtn.click();
      await expect(this.page.getByRole('button', { name: /Remove/i }).nth(0)).toBeVisible();
    }
  }

  async assertCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
