import { test } from '@playwright/test';
import { AddEmpolyee } from '../pages/AddEmployee';
import { HomePage } from '../pages/HomaPage';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/envConfig';

test('Add Employee Scenario', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const addemppage = new AddEmpolyee(page);

    await loginpage.applicationLogin(config.username, config.password);
    await homepage.navigateAddEmployee();
    await addemppage.addingEmployee();
    await page.waitForTimeout(4000);


})