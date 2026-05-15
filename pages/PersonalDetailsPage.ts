import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class PersonalDetailsPage {
    private page: Page;
    private frame: FrameLocator;

    readonly personalDetailsHeading: Locator;
    readonly employeeCode: Locator;
    readonly lastNameField: Locator;
    readonly firstNameField: Locator;
    readonly middleNameField: Locator;
    readonly nickNameField: Locator;
    readonly ssnNoField: Locator;
    readonly nationalityDropdown: Locator;
    readonly sinNoField: Locator;
    readonly dateOfBirthField: Locator;
    readonly otherIDField: Locator;
    readonly maritalStatusDropdown: Locator;
    readonly smokerCheckbox: Locator;
    readonly maleRadioBtn: Locator;
    readonly femaleRadioBtn: Locator;
    readonly driversLicenseField: Locator;
    readonly licenseExpiryDateField: Locator;
    readonly militaryServiceField: Locator;
    readonly ethnicRaceDropdown: Locator;
    readonly editBtn: Locator;
    readonly resetBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator("//iframe[@id='rightMenu']");

        this.personalDetailsHeading = this.frame.getByText('Personal Details');
        this.employeeCode = this.frame.locator('#txtEmployeeId');
        this.lastNameField = this.frame.locator('#txtEmpLastName');
        this.firstNameField = this.frame.locator('#txtEmpFirstName');
        this.middleNameField = this.frame.locator('#txtEmpMiddleName');
        this.nickNameField = this.frame.locator('#txtEmpNickName');
        this.ssnNoField = this.frame.locator('#txtNICNo');
        this.nationalityDropdown = this.frame.locator('#cmbNation');
        this.sinNoField = this.frame.locator('#txtSINNo');
        this.dateOfBirthField = this.frame.locator('#DOB');
        this.otherIDField = this.frame.locator('#txtOtherID');
        this.maritalStatusDropdown = this.frame.locator('#cmbMarital');
        this.smokerCheckbox = this.frame.locator('#chkSmokeFlag');
        this.maleRadioBtn = this.frame.locator('#gender1');
        this.femaleRadioBtn = this.frame.locator('#gender2');
        this.driversLicenseField = this.frame.locator('#txtLicenNo');
        this.licenseExpiryDateField = this.frame.locator('#txtLicExpDate');
        this.militaryServiceField = this.frame.locator('#txtMilitarySer');
        this.ethnicRaceDropdown = this.frame.locator('#cmbEthnicRace');
        this.editBtn = this.frame.locator('#btnEditPers');
        this.resetBtn = this.frame.locator('#btnClearPers');
    }

    async verifyPersonalDetailsPage() {
        await expect(this.personalDetailsHeading).toBeVisible();
    }

    async clickEditButton() {
        await this.editBtn.click();
        await this.page.waitForTimeout(1000);
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

    async fillSSNNo(ssnNo: string) {
        await this.ssnNoField.fill(ssnNo);
    }

    async selectNationality(nationalityValue: string) {
        await this.nationalityDropdown.selectOption(nationalityValue);
    }

    async fillSINNo(sinNo: string) {
        await this.sinNoField.fill(sinNo);
    }

    async fillDateOfBirth(dob: string) {
        await this.dateOfBirthField.fill(dob);
    }

    async fillOtherID(otherID: string) {
        await this.otherIDField.fill(otherID);
    }

    async selectMaritalStatus(maritalValue: string) {
        await this.maritalStatusDropdown.selectOption(maritalValue);
    }

    async checkSmoker() {
        await this.smokerCheckbox.check();
    }

    async uncheckSmoker() {
        await this.smokerCheckbox.uncheck();
    }

    async selectMaleGender() {
        await this.maleRadioBtn.check();
    }

    async selectFemaleGender() {
        await this.femaleRadioBtn.check();
    }

    async fillDriversLicenseNumber(licenseNo: string) {
        await this.driversLicenseField.fill(licenseNo);
    }

    async fillLicenseExpiryDate(expiryDate: string) {
        await this.licenseExpiryDateField.fill(expiryDate);
    }

    async fillMilitaryService(militaryService: string) {
        await this.militaryServiceField.fill(militaryService);
    }

    async selectEthnicRace(ethnicRaceValue: string) {
        await this.ethnicRaceDropdown.selectOption(ethnicRaceValue);
    }

    async clickResetButton() {
        await this.resetBtn.click();
    }

    async fillAllPersonalDetails(
        lastName: string,
        firstName: string,
        middleName: string,
        nickName: string,
        ssnNo: string,
        nationality: string,
        sinNo: string,
        dob: string,
        otherID: string,
        maritalStatus: string,
        isSmoker: boolean,
        gender: 'male' | 'female',
        driversLicense: string,
        licenseExpiryDate: string,
        militaryService: string,
        ethnicRace: string
    ) {
        // Click Edit button first to enable fields
        await this.clickEditButton();

        // Fill in all fields
        await this.fillLastName(lastName);
        await this.fillFirstName(firstName);
        await this.fillMiddleName(middleName);
        await this.fillNickName(nickName);
        await this.fillSSNNo(ssnNo);
        await this.selectNationality(nationality);
        await this.fillSINNo(sinNo);
        await this.fillDateOfBirth(dob);
        await this.fillOtherID(otherID);
        await this.selectMaritalStatus(maritalStatus);

        if (isSmoker) {
            await this.checkSmoker();
        } else {
            await this.uncheckSmoker();
        }

        if (gender === 'male') {
            await this.selectMaleGender();
        } else {
            await this.selectFemaleGender();
        }

        await this.fillDriversLicenseNumber(driversLicense);
        await this.fillLicenseExpiryDate(licenseExpiryDate);
        await this.fillMilitaryService(militaryService);
        await this.selectEthnicRace(ethnicRace);

        await this.page.waitForTimeout(2000);
    }

    async getEmployeeCode(): Promise<string | null> {
        return await this.employeeCode.inputValue();
    }
}
