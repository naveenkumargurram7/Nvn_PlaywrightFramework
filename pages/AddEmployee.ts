import { FrameLocator, Locator, Page } from "@playwright/test";

export class AddEmpolyee {

    private page: Page;
    readonly code: Locator;
    readonly lastname: Locator;
    readonly firstname: Locator;
    readonly middlename: Locator;
    readonly nickname: Locator;
    readonly photo: Locator;
    readonly frame: FrameLocator;
    readonly saveBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.frame = page.frameLocator("//iframe[@id='rightMenu']");
        this.code = this.frame.locator("#txtEmployeeId");
        this.lastname = this.frame.locator("#txtEmpLastName");
        this.firstname = this.frame.locator('input[name="txtEmpFirstName"]');
        this.middlename = this.frame.locator("#txtEmpMiddleName");
        this.nickname = this.frame.locator("#txtEmpNickName");
        this.photo = this.frame.locator("#photofile");
        this.saveBtn = this.frame.locator(".savebutton");


    }

    async addingEmployee() {
        await this.lastname.fill("Gurram");
        await this.firstname.fill("Naveen");
        await this.middlename.fill("Kumar");
        await this.nickname.fill("VNK");
        await this.photo.setInputFiles("C:/N@vEeN/Signature.jpg")
        await this.saveBtn.click();



    }




}

