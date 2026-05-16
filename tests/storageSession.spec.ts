import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomaPage';
import { AddEmpolyee } from '../pages/AddEmployee';

test.beforeAll('Storage Session', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginpage = new LoginPage(page);
    // Call applicationLogin without parameters to use environment variables
    await loginpage.applicationLogin();
    await page.waitForLoadState('networkidle');
   //page.waitForTimeout(10000);

    await context.storageState({ path: 'storageState.json' });


})
test('Storage Session with add employee', async ({ browser }) => {


    const context = await browser.newContext({ storageState: 'storageState.json' });
    const page = await context.newPage();

    const homepage = new HomePage(page);
    const addemppage = new AddEmpolyee(page);

    await homepage.navigateAddEmployee();
    await addemppage.addingEmployee();
    await page.waitForTimeout(4000);




})
