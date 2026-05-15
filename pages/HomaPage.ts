import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    readonly welcomeText: Locator;
    readonly logout: Locator;
    readonly pim: Locator;
    readonly employeelist: Locator;
    readonly searchByDropdown: Locator;
    readonly searchFor: Locator;
    readonly searchBtn: Locator;

    readonly frame: FrameLocator;
    readonly addBtn: Locator;



    constructor(page: Page) {
        this.page = page;

        this.welcomeText = page.getByText('Welcome');
        this.logout = page.getByText('Logout');
        this.pim = page.getByText('PIM');
        this.employeelist = page.getByText('Employee List');
        this.frame = page.frameLocator("//iframe[@id='rightMenu']");

        this.searchByDropdown = this.frame.locator("//select[@name='loc_code']");
        this.searchFor = this.frame.locator("//input[@name='loc_name']");
        this.searchBtn = this.frame.getByRole('button', { name: 'Search' });
        this.addBtn = this.frame.getByRole('button', { name: 'Add' });




    }

    selectEmpId_checkBox(EmpID: string): Locator {
        return this.frame.locator(`//input[@type='checkbox' and @value='${EmpID}']`);

    }

    empName_link(EmpID: string): Locator {
        return this.frame.locator(`//td[text()='${EmpID}']/following-sibling::td[1]/a`)

    }
    async verifyHomePage() {
        await expect(this.welcomeText).toBeVisible();
        await expect(this.logout).toBeVisible();
    }

    async logoutApp() {

        await this.logout.click();

    }

    async searchEmpID(EmpID: string) {

        await this.pim.hover();
        await this.employeelist.click();
        await this.page.waitForTimeout(4000);
        await this.searchByDropdown.click();
        await this.searchByDropdown.selectOption({ index: 1 });
        await this.searchFor.fill(EmpID);
        await this.searchBtn.click();
        await this.selectEmpId_checkBox(EmpID).check();
        await this.empName_link(EmpID).click();

        await this.page.waitForTimeout(5000);


    }

    async navigateAddEmployee() {
        await this.addBtn.click();
    }

    async addEmployeePage() {
        await this.pim.hover();
        await this.employeelist.click();
        await this.page.waitForTimeout(2000);
        await this.addBtn.click();
        await this.page.waitForTimeout(2000);
    }

}