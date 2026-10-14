import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.getByLabel('Email').fill('user@test.com');
  await page.getByLabel('Password').fill('Password123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Welcome')).toBeVisible();
});

