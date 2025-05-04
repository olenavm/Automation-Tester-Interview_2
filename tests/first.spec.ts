import { test, expect } from '@playwright/test';
import { Credentials } from '../config/credentials';
import credentials from '../config/credentials.json' assert { type: 'json' }; // Use JSON assertion for Node.js 16.15.0+

test('Login Test with JSON Credentials', async ({ page }) => {
  const creds: Credentials = credentials; // Type assertion
  if (!creds.email || !creds.password) {
    throw new Error('Missing email or password in credentials.json');
  }
  await page.goto('https://qa-test.intellisense.io/next/signin');
  await page.fill('[data-testid="SignInLocal-emailInput"] input', creds.email);
  await page.fill('[data-testid="SignInLocal-passwordInput"] input', creds.password);
  await page.click('button[data-testid="SignInLocal-signInButton"]');
  await expect(page).toHaveTitle('Home | brains.app');
  await page.click('text="QA Automation test Project"');
  await expect(page).toHaveTitle('QA Automation test Project | brains.app');
});

test('Check for PDF export/download functionality', async ({ page }) => {
  await page.goto('https://qa-test.intellisense.io/next/signin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('qateam-auto+guest@intellisense.io');
  await page.getByRole('textbox', { name: 'Email address' }).press('Enter');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('QateamIS@2025');
  await page.getByTestId('SignInLocal-signInButton').click();
  await page.getByRole('link', { name: 'QA Automation test Project' }).click();
  await page.getByTestId('ActionToggleButton').nth(1).click();
  await page.getByTestId('AsyncActionDialog-okButton').click();
  await page.getByRole('link', { name: 'Download' }).click();
});
