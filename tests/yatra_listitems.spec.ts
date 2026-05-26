import {test} from '@playwright/test';

test('yasta website and handling list items', async ({ page }) => {

await page.goto('https://www.yatra.com/');
const departure = await page.locator("//div[contains(@aria-label,'Departure From')]");

await departure.click();

await page.locator("#input-with-icon-adornment").pressSequentially("New",{delay:1000});

await page.locator(".MuiBox-root").getByRole('listitem').filter({ hasText: 'New Bern' }).click();   
await page.waitForTimeout(10000);
const cont = await page.locator(".MuiBox-root").getByRole('listitem').count







}
)