import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomaPage';

test('Login and Logout success scenario', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);

    await loginpage.gotoURL();
    await loginpage.login('sureshit', 'sureshit');
    await homepage.logoutApp();
   

})





