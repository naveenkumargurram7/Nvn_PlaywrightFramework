import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomaPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import testData from '../test-data/testdata.json';

test('Add Employee with all fields', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const addemployeepage = new AddEmployeePage(page);
    
    // Get test data from JSON
    const testDataSet = testData.addEmployeeData[0];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');
    
    // Verify home page is loaded
    await homepage.verifyHomePage();

    // Navigate to PIM and Add Employee
    await homepage.addEmployeePage();
    
    // Verify Add Employee page is loaded
    await addemployeepage.verifyAddEmployeePage();

    // Get the auto-generated employee code
    const empCode = await addemployeepage.getEmployeeCode();
    console.log(`Test Case: ${testDataSet.testCaseName}`);
    console.log(`Employee Code: ${empCode}`);

    // Fill in all employee details from JSON
    await addemployeepage.fillLastName(testDataSet.lastName);
    await addemployeepage.fillFirstName(testDataSet.firstName);
    await addemployeepage.fillMiddleName(testDataSet.middleName);
    await addemployeepage.fillNickName(testDataSet.nickName);

    // Optionally upload a photo (uncomment if you have an image file)
    // await addemployeepage.uploadPhoto('./test-data/photo.jpg');

    // Click Save button
    await addemployeepage.clickSaveButton();

    console.log('Employee added successfully from JSON data');
    await page.waitForTimeout(3000);

})

test('Add Employee using helper method', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const addemployeepage = new AddEmployeePage(page);
    
    // Get test data from JSON
    const testDataSet = testData.addEmployeeData[1];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');

    // Navigate to Add Employee page
    await homepage.addEmployeePage();

    console.log(`Test Case: ${testDataSet.testCaseName}`);

    // Add employee with all fields using the helper method from JSON
    await addemployeepage.addEmployeeWithAllFields(
        testDataSet.lastName,
        testDataSet.firstName,
        testDataSet.middleName,
        testDataSet.nickName
        // Uncomment below to add photo
        // './test-data/photo.jpg'
    );

    console.log('Employee added using helper method from JSON');

})

test('Add Employee and verify fields are cleared after Reset', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const addemployeepage = new AddEmployeePage(page);
    
    // Get test data from JSON
    const testDataSet = testData.addEmployeeData[2];

    // Login to the application
    await loginpage.applicationLogin('sureshit', 'sureshit');

    // Navigate to Add Employee page
    await homepage.addEmployeePage();

    // Verify Add Employee page is loaded
    await addemployeepage.verifyAddEmployeePage();

    console.log(`Test Case: ${testDataSet.testCaseName}`);

    // Fill in employee details from JSON
    await addemployeepage.fillLastName(testDataSet.lastName);
    await addemployeepage.fillFirstName(testDataSet.firstName);
    await addemployeepage.fillMiddleName(testDataSet.middleName);
    await addemployeepage.fillNickName(testDataSet.nickName);

    // Click Reset button
    await addemployeepage.clickResetButton();

    // Verify fields are empty after reset
    const lastNameValue = await addemployeepage.lastNameField.inputValue();
    const firstNameValue = await addemployeepage.firstNameField.inputValue();

    expect(lastNameValue).toBe('');
    expect(firstNameValue).toBe('');

    console.log('Fields successfully cleared after Reset');

})
