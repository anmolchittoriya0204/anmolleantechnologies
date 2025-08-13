
export class CheckoutInfoPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.zipInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  /*This function use to enter the details on checkout  */
  async enterInfo(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
  }

  /*This function use to click on the continue cta */
  async continue() {
    await this.continueButton.click();
    await this.page.waitForURL(/checkout-step-two\.html/);
  }
}
