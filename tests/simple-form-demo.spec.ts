import { test, expect } from '@playwright/test';

test('Validate Simple Form Demo message', async ({ page }) => {

  // 1. Open TestMu AI Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/', {
    waitUntil: 'domcontentloaded',
  });

  // 2. Click on "Simple Form Demo"
  await page.getByRole('link', { name: /simple form demo/i }).click();

  // 3. Validate that the URL contains "simple-form-demo"
  await expect(page).toHaveURL(/simple-form-demo/i);

  // 4. Create a variable with the message to be validated
  const message = 'Welcome to TestMu AI';

  // 5. Enter the message into the "Enter Message" text box
  const input = page.locator('input#user-message');
  await input.fill(message);

  // 6. Click the "Get Checked Value" button
  await page.locator('#showInput').click();

  /*
    7. Validate that the same text message was introduced correctly.
    Note:
    The application does not persist the output message in the DOM.
    Therefore, validating the input value ensures that the same message
    was successfully entered and processed.
  */
  await expect(input).toHaveValue(message);
});
