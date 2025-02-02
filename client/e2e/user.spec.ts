import test, { expect } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { SAMPLE_VALID_EMAIL, SAMPLE_VALID_PASSWORD } from '../utils/config';

test.use({ baseURL: playwrightConfig.use?.baseURL });

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test('Register form is shown', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
  // this locator gets the entire Register form (that includes email and password inputs and Register button)
  await expect(page.getByText('EmailPasswordRegister')).toBeVisible();
});

test('User registered sucessfully with valid credentials', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).fill(SAMPLE_VALID_EMAIL);
  await page
    .getByRole('textbox', { name: 'Password' })
    .fill(SAMPLE_VALID_PASSWORD);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByTestId('alertDisplay')).toBeVisible();
});
