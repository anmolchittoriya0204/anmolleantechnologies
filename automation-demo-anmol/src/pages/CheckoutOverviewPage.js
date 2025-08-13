
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.overviewItems = page.locator('.cart_item');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  /*
  This function, gets all the item prices as text, convert into numbers,compare the calculated
  total with displayed total
  */
  async assertItemTotalMatches() {
    const pricesText = await this.overviewItems.locator('.inventory_item_price').allInnerTexts();
    const prices = pricesText.map(t => parseFloat(t.replace('$', '')));
    const calcSum = prices.reduce((a, b) => a + b, 0);
    const itemTotalText = await this.summarySubtotal.innerText();
    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
    expect(Number(itemTotal.toFixed(2))).toBe(Number(calcSum.toFixed(2)));
  }

  /*click on finish button */
  async finish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }
}
