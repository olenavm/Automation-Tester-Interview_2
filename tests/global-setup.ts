import { FullConfig, chromium, expect } from '@playwright/test';
import { Credentials } from '../config/credentials';
import credentials from '../config/credentials.json' assert { type: 'json' };

async function globalSetup(config: FullConfig) {
  const creds: Credentials = credentials;
  if (!creds.email || !creds.password) {
    throw new Error('Missing email or password in credentials.json');
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://qa-test.intellisense.io/next/signin');
  await page.fill('[data-testid="SignInLocal-emailInput"] input', creds.email);
  await page.fill('[data-testid="SignInLocal-passwordInput"] input', creds.password);
  await page.click('button[data-testid="SignInLocal-signInButton"]');
  await expect(page).toHaveTitle('Home | brains.app');
  
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;