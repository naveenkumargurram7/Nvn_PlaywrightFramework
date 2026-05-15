# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landingpage.spec.ts >> Employee search scenario
- Location: tests\landingpage.spec.ts:17:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//iframe[@id=\'rightMenu\']').contentFrame().locator('//select[@name=\'loc_code\']')
    - waiting for" https://ctcorphyd.com/SureshIT/login.php" navigation to finish...
    - navigated to "https://ctcorphyd.com/SureshIT/login.php"

```

# Test source

```ts
  1  | import { expect, FrameLocator, Locator, Page } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |     private page: Page;
  5  | 
  6  |     readonly welcomeText: Locator;
  7  |     readonly logout: Locator;
  8  |     readonly pim: Locator;
  9  |     readonly employeelist: Locator;
  10 |     readonly searchByDropdown: Locator;
  11 |     readonly searchFor: Locator;
  12 |     readonly searchBtn: Locator;
  13 | 
  14 |     readonly frame: FrameLocator;
  15 |     readonly addBtn: Locator;
  16 | 
  17 | 
  18 | 
  19 |     constructor(page: Page) {
  20 |         this.page = page;
  21 | 
  22 |         this.welcomeText = page.getByText('Welcome');
  23 |         this.logout = page.getByText('Logout');
  24 |         this.pim = page.getByText('PIM');
  25 |         this.employeelist = page.getByText('Employee List');
  26 |         this.frame = page.frameLocator("//iframe[@id='rightMenu']");
  27 | 
  28 |         this.searchByDropdown = this.frame.locator("//select[@name='loc_code']");
  29 |         this.searchFor = this.frame.locator("//input[@name='loc_name']");
  30 |         this.searchBtn = this.frame.getByRole('button', { name: 'Search' });
  31 |         this.addBtn = this.frame.getByRole('button', { name: 'Add' });
  32 | 
  33 | 
  34 | 
  35 | 
  36 |     }
  37 | 
  38 |     selectEmpId_checkBox(EmpID: string): Locator {
  39 |         return this.frame.locator(`//input[@type='checkbox' and @value='${EmpID}']`);
  40 | 
  41 |     }
  42 | 
  43 |     empName_link(EmpID: string): Locator {
  44 |         return this.frame.locator(`//td[text()='${EmpID}']/following-sibling::td[1]/a`)
  45 | 
  46 |     }
  47 |     async verifyHomePage() {
  48 |         await expect(this.welcomeText).toBeVisible();
  49 |         await expect(this.logout).toBeVisible();
  50 |     }
  51 | 
  52 |     async logoutApp() {
  53 | 
  54 |         await this.logout.click();
  55 | 
  56 |     }
  57 | 
  58 |     async searchEmpID(EmpID: string) {
  59 | 
  60 |         await this.pim.hover();
  61 |         await this.employeelist.click();
> 62 |         await this.searchByDropdown.click();
     |                                     ^ Error: locator.click: Target page, context or browser has been closed
  63 |         await this.searchByDropdown.selectOption({ index: 1 });
  64 |         await this.searchFor.fill(EmpID);
  65 |         await this.searchBtn.click();
  66 |         await this.selectEmpId_checkBox(EmpID).check();
  67 |         await this.empName_link(EmpID).click();
  68 | 
  69 |         await this.page.waitForTimeout(5000);
  70 | 
  71 | 
  72 |     }
  73 | 
  74 |     async navigateAddEmployee() {
  75 |         await this.addBtn.click();
  76 |     }
  77 | 
  78 | }
```