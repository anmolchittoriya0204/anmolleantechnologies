
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
     launchOptions: {
      slowMo: 1000 // 1 second delay between actions
    }
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
    
  ]
};
export default config;
