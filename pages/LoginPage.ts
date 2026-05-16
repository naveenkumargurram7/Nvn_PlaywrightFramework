import{Page,Locator} from '@playwright/test';
import config from '../config/envConfig';

export class LoginPage {
  private page: Page;

  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator("input[name='txtUserName']");
    this.password = page.locator("input[name='txtPassword']");
    this.loginBtn = page.getByRole('button',{name:'Login'});
  }

  async gotoURL() {
   
        await this.page.goto(config.baseUrl);
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

async applicationLogin(username?: string, password?: string)
{
 await this.gotoURL();
 // Use provided credentials or fall back to environment variables
 const user = username || config.username;
 const pass = password || config.password;
 await this.login(user, pass);
}




}