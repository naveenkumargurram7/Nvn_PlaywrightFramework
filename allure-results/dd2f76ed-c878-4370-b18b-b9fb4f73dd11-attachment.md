# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: storageSession.spec.ts >> Storage Session
- Location: tests\storageSession.spec.ts:19:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//iframe[@id=\'rightMenu\']').contentFrame().getByRole('button', { name: 'Add' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - strong [ref=e2]: Your session expired because you were inactive. Please re-login.
  - table [ref=e3]:
    - rowgroup [ref=e4]:
      - row [ref=e5]:
        - cell [ref=e6]:
          - img [ref=e7]
        - cell [ref=e8]
  - table [ref=e9]:
    - rowgroup [ref=e10]:
      - row [ref=e11]:
        - cell [ref=e12]:
          - table [ref=e13]:
            - rowgroup [ref=e14]:
              - row [ref=e15]:
                - cell [ref=e16]
                - cell [ref=e17]
                - cell [ref=e18]
                - cell [ref=e19]
                - cell [ref=e20]
                - cell [ref=e21]
  - generic [ref=e22]:
    - table [ref=e23]:
      - rowgroup [ref=e24]:
        - 'row "Login Name : Password : Login Clear Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e25]':
          - cell [ref=e26]
          - 'cell "Login Name : Password : Login Clear Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e27]':
            - table [ref=e28]:
              - rowgroup [ref=e29]:
                - 'row "Login Name : Password : Login Clear" [ref=e30]':
                  - cell [ref=e31]
                  - 'cell "Login Name : Password : Login Clear" [ref=e32]':
                    - img [ref=e33]
                    - table [ref=e34]:
                      - rowgroup [ref=e35]:
                        - row [ref=e36]:
                          - cell [ref=e37]
                          - cell [ref=e38]
                        - row "Login Name :" [ref=e39]:
                          - cell "Login Name :" [ref=e40]
                          - cell [ref=e41]:
                            - textbox [ref=e42]
                        - row "Password :" [ref=e43]:
                          - cell "Password :" [ref=e44]
                          - cell [ref=e45]:
                            - textbox [ref=e46]
                        - row "Login Clear" [ref=e47]:
                          - cell "Login" [ref=e48]:
                            - button "Login" [ref=e49]
                          - cell "Clear" [ref=e50]:
                            - button "Clear" [ref=e51]
                        - row [ref=e52]:
                          - cell [ref=e53]
                          - cell [ref=e54]:
                            - strong [ref=e55]
                  - cell [ref=e56]:
                    - img [ref=e57]
                  - cell [ref=e58]
                - row [ref=e59]:
                  - cell [ref=e60]
                - row [ref=e61]:
                  - cell [ref=e62]
                - row [ref=e63]:
                  - cell [ref=e64]:
                    - img [ref=e65]
                  - cell [ref=e66]
                - row "Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e67]:
                  - cell [ref=e68]
                  - cell "Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e69]:
                    - table [ref=e70]:
                      - rowgroup [ref=e71]:
                        - row "Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e72]:
                          - cell "Orange HRM comes as a comprehensive solution for the efficient management and development of your Human Resource. It will assist you in the complex and strategic process of managing this crucial resource of your enterprise. Based on modular architecture, it facilitates a vast range of HR activities, with features that reflect the main HR management activities. It comes as a web-enabled application and considering the available flexibility, OrangeHRM is a perfect platform for reengineering your HR processes and achieving a new level of HR Management." [ref=e73]
                - row [ref=e74]:
                  - cell [ref=e75]:
                    - img [ref=e76]
                  - cell [ref=e77]
                - row [ref=e78]:
                  - cell [ref=e79]
                  - cell [ref=e80]
                - row [ref=e81]:
                  - cell [ref=e82]
                  - cell [ref=e83]
                  - cell [ref=e84]
                  - cell [ref=e85]
                  - cell [ref=e86]
                  - cell [ref=e87]
          - cell [ref=e88]
    - table [ref=e89]:
      - rowgroup [ref=e90]:
        - row "SureshIT" [ref=e91]:
          - cell "SureshIT" [ref=e92]:
            - link "SureshIT" [ref=e93] [cursor=pointer]:
              - /url: "#"
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
  62 |         await this.page.waitForTimeout(4000);
  63 |         await this.searchByDropdown.click();
  64 |         await this.searchByDropdown.selectOption({ index: 1 });
  65 |         await this.searchFor.fill(EmpID);
  66 |         await this.searchBtn.click();
  67 |         await this.selectEmpId_checkBox(EmpID).check();
  68 |         await this.empName_link(EmpID).click();
  69 | 
  70 |         await this.page.waitForTimeout(5000);
  71 | 
  72 | 
  73 |     }
  74 | 
  75 |     async navigateAddEmployee() {
> 76 |         await this.addBtn.click();
     |                           ^ Error: locator.click: Target page, context or browser has been closed
  77 |     }
  78 | 
  79 |     async addEmployeePage() {
  80 |         await this.pim.hover();
  81 |         await this.employeelist.click();
  82 |         await this.page.waitForTimeout(2000);
  83 |         await this.addBtn.click();
  84 |         await this.page.waitForTimeout(2000);
  85 |     }
  86 | 
  87 | }
```