import { test, expect } from '@playwright/test';
import { Credentials } from '../config/credentials';
import credentials from '../config/credentials.json' assert { type: 'json' }; // Use JSON assertion for Node.js 16.15.0+
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { fileURLToPath } from 'url';


test('Login Test with JSON Credentials', async ({ page }) => {
  const creds: Credentials = credentials; // Type assertion
  if (!creds.email || !creds.password) {
    throw new Error('Missing email or password in credentials.json');
  }
  await page.goto('/next/signin');
  await expect(page).toHaveTitle('Home | brains.app');
  await page.click('text="QA Automation test Project"');
  await expect(page).toHaveTitle('QA Automation test Project | brains.app');
});

test('Check for PDF export/download functionality', async ({ page,context }) => {
  //const filePath = 'C:\\Users\\OlenaMaistrenko\\Downloads\\QA_Automation_test_Project-2025-05-05T10_18_02.528Z.pdf.pdf';
  await page.goto('/next/signin');
  await page.getByRole('link', { name: 'QA Automation test Project' }).click();
  await page.getByTestId('ActionToggleButton').nth(1).click();
  await page.getByTestId('AsyncActionDialog-okButton').click();
  await page.getByRole('link', { name: 'Download' }).click();
 });


test('Verify the file exists and is a valid PDF', async ({ page }) => {
  const filePath = 'C:\\Users\\OlenaMaistrenko\\Downloads\\QA_Automation_test_Project-2025-05-05T10_18_02.528Z.pdf.pdf';
  expect(fs.existsSync(filePath)).toBe(true);
  const pdfData = await pdfParse(fs.readFileSync(filePath));
  expect(pdfData.text).toContain('QA Automation test Project');
});

