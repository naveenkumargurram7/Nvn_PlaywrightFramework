import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomaPage';


test('HomePage validation scenario', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);

    await loginpage.applicationLogin('sureshit', 'sureshit');
    await homepage.verifyHomePage();
    await homepage.logoutApp();

})

test('Employee search scenario', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);

    await loginpage.applicationLogin('sureshit', 'sureshit');
    await homepage.searchEmpID('4136');


})



