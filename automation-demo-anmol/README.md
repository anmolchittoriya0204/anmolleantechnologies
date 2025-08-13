
# Sauce Demo – Playwright (JavaScript) Checkout Flow

This test suite automates a **successful checkout** on the Sauce Labs demo store by:
1. Logging in as `standard_user`.
2. Selecting **3 random items** from the inventory page.
3. Verifying the cart contains those 3 items.
4. Completing the checkout with sample customer details.
5. Asserting item totals and a successful order completion message.

## Tech
- Playwright Test (JavaScript)
- HTML reporting (`playwright-report`)

## Setup

```bash
# 1) Extract and enter the folder
cd automation-demo-anmol

# 2) Install dependencies
npm install

# 3) Install browsers
npm run install:pw
```

## Run tests

```bash
# Headless run on all browsers
npm test

# Run headed (useful for debugging)
npm run test:headed
```

## View report
```bash
npm run report
# Opens ./playwright-report/index.html
```

## Notes
- Credentials used: `standard_user` / `secret_sauce` (public demo creds).
- Base URL is set to `https://www.saucedemo.com` in `playwright.config.js`.
- The test randomly chooses 3 unique items every run and validates:
  - Each item is added to the cart
  - The cart count badge equals 3
  - Sum of item prices equals the displayed **Item total** on the overview page
  - The final **Thank you** message is visible after placing the order
