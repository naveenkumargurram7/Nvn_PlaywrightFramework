import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomaPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import testData from '../test-data/testdata.json';
import { AddEmployeePage } from '../pages/AddEmployeePage';

test.only('Edit Personal Details with all fields', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const personaldetailspage = new PersonalDetailsPage(page);
    const addemployeepage = new AddEmployeePage(page);
    
    // Get test data from JSON
    const testDataSet = testData.personalDetails[0];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');
    
    // Verify home page is loaded
    await homepage.verifyHomePage();

    // Navigate to Employee List
    await homepage.pim.hover();
    await homepage.employeelist.click();
    await page.waitForTimeout(3000);

    await homepage.addEmployeePage();

    // Click on an employee to view their details
    // This will navigate to the Personal Details tab
    await page.waitForTimeout(2000);

    await addemployeepage.addEmployeeWithAllFields(
        testDataSet.lastName,
        testDataSet.firstName,
        testDataSet.middleName,
        testDataSet.nickName
        // Uncomment below to add photo
        // './test-data/photo.jpg'
    );

    // Verify Personal Details page is loaded
    await personaldetailspage.verifyPersonalDetailsPage();

    // Get the employee code
    const empCode = await personaldetailspage.getEmployeeCode();
    console.log(`Test Case: ${testDataSet.testCaseName}`);
    console.log(`Employee Code: ${empCode}`);

    // Click Edit button to enable fields
    await personaldetailspage.clickEditButton();

    // Fill in all personal details from JSON
    await personaldetailspage.fillLastName(testDataSet.lastName);
    await personaldetailspage.fillFirstName(testDataSet.firstName);
    await personaldetailspage.fillMiddleName(testDataSet.middleName);
    await personaldetailspage.fillNickName(testDataSet.nickName);
    await personaldetailspage.fillSSNNo(testDataSet.ssnNo);
    await personaldetailspage.selectNationality(testDataSet.nationality);
    await personaldetailspage.fillSINNo(testDataSet.sinNo);
    await personaldetailspage.fillDateOfBirth(testDataSet.dateOfBirth);
    await personaldetailspage.fillOtherID(testDataSet.otherID);
    await personaldetailspage.selectMaritalStatus(testDataSet.maritalStatus);
    
    if (testDataSet.isSmoker) {
        await personaldetailspage.checkSmoker();
    } else {
        await personaldetailspage.uncheckSmoker();
    }

    if (testDataSet.gender === 'male') {
        await personaldetailspage.selectMaleGender();
    } else {
        await personaldetailspage.selectFemaleGender();
    }

    await personaldetailspage.fillDriversLicenseNumber(testDataSet.driversLicense);
    await personaldetailspage.fillLicenseExpiryDate(testDataSet.licenseExpiryDate);
    await personaldetailspage.fillMilitaryService(testDataSet.militaryService);
    await personaldetailspage.selectEthnicRace(testDataSet.ethnicRace);

    console.log('All personal details filled successfully from JSON');
    await page.waitForTimeout(2000);

})

test('Edit Personal Details using helper method', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const personaldetailspage = new PersonalDetailsPage(page);
    
    // Get test data from JSON
    const testDataSet = testData.personalDetails[1];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');

    // Navigate to Employee List
    await homepage.pim.hover();
    await homepage.employeelist.click();
    await page.waitForTimeout(3000);

    // Navigate to an employee
    await page.waitForTimeout(2000);

    console.log(`Test Case: ${testDataSet.testCaseName}`);

    // Fill all personal details using the helper method with JSON data
    await personaldetailspage.fillAllPersonalDetails(
        testDataSet.lastName,
        testDataSet.firstName,
        testDataSet.middleName,
        testDataSet.nickName,
        testDataSet.ssnNo,
        testDataSet.nationality,
        testDataSet.sinNo,
        testDataSet.dateOfBirth,
        testDataSet.otherID,
        testDataSet.maritalStatus,
        testDataSet.isSmoker,
        testDataSet.gender as 'male' | 'female',
        testDataSet.driversLicense,
        testDataSet.licenseExpiryDate,
        testDataSet.militaryService,
        testDataSet.ethnicRace
    );

    console.log('All personal details filled using helper method from JSON');

})

test('Edit Personal Details and verify field values', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const personaldetailspage = new PersonalDetailsPage(page);
    
    // Get test data from JSON
    const testDataSet = testData.personalDetails[2];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');

    // Navigate to Employee List
    await homepage.pim.hover();
    await homepage.employeelist.click();
    await page.waitForTimeout(3000);

    // Navigate to an employee
    await page.waitForTimeout(2000);

    // Verify Personal Details page is loaded
    await personaldetailspage.verifyPersonalDetailsPage();

    console.log(`Test Case: ${testDataSet.testCaseName}`);

    // Click Edit button
    await personaldetailspage.clickEditButton();

    // Fill specific fields from JSON
    await personaldetailspage.fillLastName(testDataSet.lastName);
    await personaldetailspage.fillFirstName(testDataSet.firstName);
    await personaldetailspage.selectMaleGender();

    // Verify values are entered correctly
    const lastNameValue = await personaldetailspage.lastNameField.inputValue();
    const firstNameValue = await personaldetailspage.firstNameField.inputValue();

    expect(lastNameValue).toBe(testDataSet.lastName);
    expect(firstNameValue).toBe(testDataSet.firstName);

    console.log('Personal details verified successfully from JSON data');

})
