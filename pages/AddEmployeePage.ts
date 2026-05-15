import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class AddEmployeePage {
    private page: Page;
    private frame: FrameLocator;

    readonly employeeCode: Locator;
    readonly lastNameField: Locator;
    readonly firstNameField: Locator;
    readonly middleNameField: Locator;
    readonly nickNameField: Locator;
    readonly photoFileInput: Locator;
    readonly saveBtn: Locator;
    readonly resetBtn: Locator;
    readonly addEmployeeHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator("//iframe[@id='rightMenu']");

        this.employeeCode = this.frame.locator('#txtEmployeeId');
        this.lastNameField = this.frame.locator('#txtEmpLastName');
        this.firstNameField = this.frame.locator('input[name="txtEmpFirstName"]');
        this.middleNameField = this.frame.locator('#txtEmpMiddleName');
        this.nickNameField = this.frame.locator('#txtEmpNickName');
        this.photoFileInput = this.frame.locator('#photofile');
        this.saveBtn = this.frame.locator('#btnEdit');
        this.resetBtn = this.frame.getByRole('button', { name: 'Reset' });
        this.addEmployeeHeading = this.frame.getByText('PIM : Add Employee');
    }

    async verifyAddEmployeePage() {
        await expect(this.addEmployeeHeading).toBeVisible();
    }

    async fillLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async fillFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async fillMiddleName(middleName: string) {
        await this.middleNameField.fill(middleName);
    }

    async fillNickName(nickName: string) {
        await this.nickNameField.fill(nickName);
    }

    async uploadPhoto(filePath: string) {
        await this.photoFileInput.setInputFiles(filePath);
    }

    async clickSaveButton() {
        await this.saveBtn.click();
    }

    async clickResetButton() {
        await this.resetBtn.click();
    }

    async getEmployeeCode(): Promise<string | null> {
        return await this.employeeCode.inputValue();
    }

    async addEmployeeWithAllFields(lastName: string, firstName: string, middleName: string, nickName: string, photoPath?: string) {
        await this.fillLastName(lastName);
        await this.fillFirstName(firstName);
        await this.fillMiddleName(middleName);
        await this.fillNickName(nickName);
        
        if (photoPath) {
            await this.uploadPhoto(photoPath);
        }

        await this.clickSaveButton();
        await this.page.waitForTimeout(3000);
    }
}
