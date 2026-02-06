import { test, expect } from '@playwright/test';

test('Drag & Drop Sliders - Default value 15 -> 95', async ({ page }) => {
  const target = 95;

  // 1) Click “Drag & Drop Sliders”
  await page.goto('https://www.testmuai.com/selenium-playground/', {
    waitUntil: 'domcontentloaded',
  });

  await page.getByRole('link', { name: /drag\s*&\s*drop sliders/i }).click();

  // Scope to slider3 
  const slider3 = page.locator('#slider3');
  const slider = slider3.locator('input[type="range"]');
  const output = slider3.locator('output#rangeSuccess');

  await expect(slider).toBeVisible();
  await expect(output).toHaveText('15'); 


  await slider.scrollIntoViewIfNeeded();
  await slider.click(); 

  // Move until output reaches 95 (robust cross-browser)
  for (let i = 0; i < 200; i++) {
    const current = Number(((await output.textContent()) ?? '').trim());
    if (current === target) break;
    await slider.press('ArrowRight');
  }

  // 2) Validate the range value shows 95 (UI output)
  await expect(output).toHaveText(String(target), { timeout: 5000 });

  // Extra: validate the REAL slider value (JS property, not the HTML attribute)
  await expect(slider).toHaveJSProperty('value', String(target));
});
