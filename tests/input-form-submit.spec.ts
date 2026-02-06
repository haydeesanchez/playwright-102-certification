import { test, expect } from '@playwright/test';

test('Input Form Submit - validation and success message', async ({ page }) => {
  // 1) Open Playground and click “Input Form Submit”
  await page.goto('https://www.testmuai.com/selenium-playground/', {
    waitUntil: 'domcontentloaded',
  });

  await page.getByRole('link', { name: /input form submit/i }).click();

  
  const section = page
    .getByRole('heading', { name: /input form validations/i })
    .locator('xpath=ancestor::*[self::div or self::section][1]');

  const submitButton = section.getByRole('button', { name: /^submit$/i });

  // Inputs (use semantic locators from the snapshot)
  const nameInput = section.getByRole('textbox', { name: /^name$/i });
  const emailInput = section.getByPlaceholder(/^email$/i);
  const passwordInput = section.getByPlaceholder(/^password$/i);
  const companyInput = section.getByRole('textbox', { name: /^company$/i });
  const websiteInput = section.getByRole('textbox', { name: /^website$/i });
  const countrySelect = section.getByRole('combobox');

  const cityInput = section.getByRole('textbox', { name: /^city$/i });
  const address1Input = section.getByRole('textbox', { name: /address 1/i });
  const address2Input = section.getByRole('textbox', { name: /address 2/i });
  const stateInput = section.getByPlaceholder(/^state$/i);
  const zipInput = section.getByPlaceholder(/zip code|zip code\*|zip code/i);

  // 2) Click “Submit” without filling any info
  await submitButton.click();

  // 3) Assert native browser validation message (HTML5)
// // Native browser validation messages differ across browsers (Chrome, Firefox, Safari),


const validationMessage = await nameInput.evaluate(
  (el: HTMLInputElement) => el.validationMessage
);

expect(validationMessage.toLowerCase()).toMatch(/please.*fill|fill.*field|completa.*campo/i);


  // 4) Fill all fields
  await nameInput.fill('Clau Cardona');
  await emailInput.fill('clau.certe@test.com');
  await passwordInput.fill('Test1234!');
  await companyInput.fill('Cardona Company');
  await websiteInput.fill('https://cardona.com');

  // 5) Select “United States” using visible text
  await countrySelect.selectOption({ label: 'United States' });

  await cityInput.fill('New York');
  await address1Input.fill('123 Main Street');
  await address2Input.fill('Suite 456');
  await stateInput.fill('NY');
  await zipInput.fill('98765');

  // 6) Submit
  await submitButton.click();

// 7) Validate success message
const successMsg = page.locator('p.success-msg');
await expect(successMsg).toContainText(/Thanks for contacting us, we will get back to you shortly/i);

});

