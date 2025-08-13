
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { InventoryPage } from '../src/pages/InventoryPage.js';
import { CartPage } from '../src/pages/CartPage.js';
import { CheckoutInfoPage } from '../src/pages/CheckoutInfoPage.js';
import { CheckoutOverviewPage } from '../src/pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage.js';

//function to get the random indexes
function getRandomUniqueIndices(max, count) {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
}

//function ends here

//Testcase for the checkout flow
test.describe('Sauce Demo successful checkout flow', () => {
  test('select 3 random items and complete checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    /* calling all the pages */
    await loginPage.goto();
    await loginPage.login();

    const allItems = await inventoryPage.getAllItems();
    const selectedIndices = getRandomUniqueIndices(allItems.length, 3);
    const selected = selectedIndices.map(i => allItems[i]);

    await inventoryPage.addItemsToCart(selected);
    await inventoryPage.assertCartCount(3);
    await inventoryPage.goToCart();

    await cartPage.assertItems(selected.map(s => s.name));
    await cartPage.checkout();

    await checkoutInfoPage.enterInfo('Anmol', 'Chittoriya', '12345');
    await checkoutInfoPage.continue();

    await checkoutOverviewPage.assertItemTotalMatches();
    await checkoutOverviewPage.finish();

    await checkoutCompletePage.assertThankYouVisible();
    await checkoutCompletePage.backHome();

    /*calling functions end here */
  });
});
