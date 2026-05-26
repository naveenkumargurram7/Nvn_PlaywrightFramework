# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: yatra_listitems.spec.ts >> yasta website and handling list items
- Location: tests\yatra_listitems.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.MuiBox-root').getByRole('listitem').filter({ hasText: 'New Bern, India' })

```

# Test source

```ts
  1  | import {test} from '@playwright/test';
  2  | 
  3  | test('yasta website and handling list items', async ({ page }) => {
  4  | 
  5  | await page.goto('https://www.yatra.com/');
  6  | const departure = await page.locator("//div[contains(@aria-label,'Departure From')]");
  7  | 
  8  | await departure.click();
  9  | 
  10 | await departure.pressSequentially("New");
  11 | 
> 12 | await page.locator(".MuiBox-root").getByRole('listitem').filter({ hasText: 'New Bern, India' }).click();   
     |                                                                                                 ^ Error: locator.click: Target page, context or browser has been closed
  13 | await page.waitForTimeout(3000);
  14 | 
  15 | 
  16 | 
  17 | 
  18 | 
  19 | 
  20 | 
  21 | }
  22 | )
```