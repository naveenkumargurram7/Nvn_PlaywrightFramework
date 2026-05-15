# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: addemployee-new.spec.ts >> Add Employee with all fields
- Location: tests\addemployee-new.spec.ts:6:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('PIM : Add Employee')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('PIM : Add Employee')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - list [ref=e5]:
    - listitem [ref=e6]: Welcome sureshit
    - listitem [ref=e7]:
      - link "Change Password" [ref=e8] [cursor=pointer]:
        - /url: ./lib/controllers/CentralController.php?mtcode=CPW&capturemode=updatemode&id=USR007
    - listitem [ref=e9]:
      - link "Logout" [ref=e10] [cursor=pointer]:
        - /url: ./index.php?ACT=logout
  - generic [ref=e11]:
    - list:
      - listitem [ref=e12] [cursor=pointer]:
        - link "Admin" [ref=e13]:
          - /url: ./index.php?menu_no_top=eim
          - generic [ref=e14]: Admin
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Company Info" [ref=e17]:
              - /url: "#"
              - generic [ref=e18]: Company Info
            - list [ref=e19]:
              - listitem [ref=e20]:
                - link "General" [ref=e21]:
                  - /url: index.php?uniqcode=GEN&menu_no_top=eim
                  - generic [ref=e22]: General
              - listitem [ref=e23]:
                - link "Locations" [ref=e24]:
                  - /url: index.php?uniqcode=LOC&menu_no_top=eim
                  - generic [ref=e25]: Locations
              - listitem [ref=e26]:
                - link "Company Structure" [ref=e27]:
                  - /url: index.php?uniqcode=CST&menu_no_top=eim
                  - generic [ref=e28]: Company Structure
              - listitem [ref=e29]:
                - link "Company Property" [ref=e30]:
                  - /url: index.php?uniqcode=TCP&menu_no_top=eim&pageNo=1
                  - generic [ref=e31]: Company Property
          - listitem [ref=e32]:
            - link "Job" [ref=e33]:
              - /url: "#"
              - generic [ref=e34]: Job
            - list [ref=e35]:
              - listitem [ref=e36]:
                - link "Job Titles" [ref=e37]:
                  - /url: index.php?uniqcode=JOB&menu_no_top=eim
                  - generic [ref=e38]: Job Titles
              - listitem [ref=e39]:
                - link "Job Specifications" [ref=e40]:
                  - /url: index.php?uniqcode=SPC&menu_no_top=eim
                  - generic [ref=e41]: Job Specifications
              - listitem [ref=e42]:
                - link "Pay Grades" [ref=e43]:
                  - /url: index.php?uniqcode=SGR&menu_no_top=eim
                  - generic [ref=e44]: Pay Grades
              - listitem [ref=e45]:
                - link "Employment Status" [ref=e46]:
                  - /url: index.php?uniqcode=EST&menu_no_top=eim
                  - generic [ref=e47]: Employment Status
              - listitem [ref=e48]:
                - link "EEO Job Categories" [ref=e49]:
                  - /url: index.php?uniqcode=EEC&menu_no_top=eim
                  - generic [ref=e50]: EEO Job Categories
          - listitem [ref=e51]:
            - link "Qualification" [ref=e52]:
              - /url: "#"
              - generic [ref=e53]: Qualification
            - list [ref=e54]:
              - listitem [ref=e55]:
                - link "Education" [ref=e56]:
                  - /url: index.php?uniqcode=EDU&menu_no_top=eim
                  - generic [ref=e57]: Education
              - listitem [ref=e58]:
                - link "Licenses" [ref=e59]:
                  - /url: index.php?uniqcode=LIC&menu_no_top=eim
                  - generic [ref=e60]: Licenses
          - listitem [ref=e61]:
            - link "Skills" [ref=e62]:
              - /url: "#"
              - generic [ref=e63]: Skills
            - list [ref=e64]:
              - listitem [ref=e65]:
                - link "Skills" [ref=e66]:
                  - /url: index.php?uniqcode=SKI&menu_no_top=eim
                  - generic [ref=e67]: Skills
              - listitem [ref=e68]:
                - link "Languages" [ref=e69]:
                  - /url: index.php?uniqcode=LAN&menu_no_top=eim
                  - generic [ref=e70]: Languages
          - listitem [ref=e71]:
            - link "Memberships" [ref=e72]:
              - /url: "#"
              - generic [ref=e73]: Memberships
            - list [ref=e74]:
              - listitem [ref=e75]:
                - link "Membership Types" [ref=e76]:
                  - /url: index.php?uniqcode=MEM&menu_no_top=eim
                  - generic [ref=e77]: Membership Types
              - listitem [ref=e78]:
                - link "Memberships" [ref=e79]:
                  - /url: index.php?uniqcode=MME&menu_no_top=eim
                  - generic [ref=e80]: Memberships
          - listitem [ref=e81]:
            - link "Nationality & Race" [ref=e82]:
              - /url: "#"
              - generic [ref=e83]: Nationality & Race
            - list [ref=e84]:
              - listitem [ref=e85]:
                - link "Nationality" [ref=e86]:
                  - /url: index.php?uniqcode=NAT&menu_no_top=eim
                  - generic [ref=e87]: Nationality
              - listitem [ref=e88]:
                - link "Ethnic Races" [ref=e89]:
                  - /url: index.php?uniqcode=ETH&menu_no_top=eim
                  - generic [ref=e90]: Ethnic Races
          - listitem [ref=e91]:
            - link "Users" [ref=e92]:
              - /url: "#"
              - generic [ref=e93]: Users
            - list [ref=e94]:
              - listitem [ref=e95]:
                - link "HR Admin Users" [ref=e96]:
                  - /url: index.php?uniqcode=USR&menu_no_top=eim&isAdmin=Yes
                  - generic [ref=e97]: HR Admin Users
              - listitem [ref=e98]:
                - link "ESS Users" [ref=e99]:
                  - /url: index.php?uniqcode=USR&menu_no_top=eim&isAdmin=No
                  - generic [ref=e100]: ESS Users
              - listitem [ref=e101]:
                - link "Admin User Groups" [ref=e102]:
                  - /url: index.php?uniqcode=USG&menu_no_top=eim
                  - generic [ref=e103]: Admin User Groups
          - listitem [ref=e104]:
            - link "Email Notifications" [ref=e105]:
              - /url: "#"
              - generic [ref=e106]: Email Notifications
            - list [ref=e107]:
              - listitem [ref=e108]:
                - link "Configuration" [ref=e109]:
                  - /url: index.php?uniqcode=EMX&menu_no_top=eim
                  - generic [ref=e110]: Configuration
              - listitem [ref=e111]:
                - link "Subscribe" [ref=e112]:
                  - /url: index.php?uniqcode=ENS&menu_no_top=eim
                  - generic [ref=e113]: Subscribe
          - listitem [ref=e114]:
            - link "Project Info" [ref=e115]:
              - /url: "#"
              - generic [ref=e116]: Project Info
            - list [ref=e117]:
              - listitem [ref=e118]:
                - link "Customers" [ref=e119]:
                  - /url: index.php?uniqcode=CUS&menu_no_top=eim
                  - generic [ref=e120]: Customers
              - listitem [ref=e121]:
                - link "Projects" [ref=e122]:
                  - /url: index.php?uniqcode=PRJ&menu_no_top=eim
                  - generic [ref=e123]: Projects
              - listitem [ref=e124]:
                - link "Project Activities" [ref=e125]:
                  - /url: index.php?uniqcode=PAC&menu_no_top=eim
                  - generic [ref=e126]: Project Activities
          - listitem [ref=e127]:
            - link "Data Import/Export" [ref=e128]:
              - /url: "#"
              - generic [ref=e129]: Data Import/Export
            - list [ref=e130]:
              - listitem [ref=e131]:
                - link "Define Custom Export" [ref=e132]:
                  - /url: index.php?uniqcode=CEX&menu_no_top=eim
                  - generic [ref=e133]: Define Custom Export
              - listitem [ref=e134]:
                - link "Export" [ref=e135]:
                  - /url: index.php?uniqcode=CSE&menu_no_top=eim
                  - generic [ref=e136]: Export
              - listitem [ref=e137]:
                - link "Define Custom Import" [ref=e138]:
                  - /url: index.php?uniqcode=CIM&menu_no_top=eim
                  - generic [ref=e139]: Define Custom Import
              - listitem [ref=e140]:
                - link "Import" [ref=e141]:
                  - /url: index.php?uniqcode=IMP&menu_no_top=eim
                  - generic [ref=e142]: Import
          - listitem [ref=e143]:
            - link "Custom Fields" [ref=e144]:
              - /url: index.php?uniqcode=CTM&menu_no_top=eim
              - generic [ref=e145]: Custom Fields
      - listitem [ref=e146] [cursor=pointer]:
        - link "PIM" [ref=e147]:
          - /url: ./index.php?menu_no_top=hr
          - generic [ref=e148]: PIM
        - list [ref=e149]:
          - listitem [ref=e150]:
            - link "Employee List" [ref=e151]:
              - /url: ./lib/controllers/CentralController.php?reqcode=EMP&VIEW=MAIN&sortField=0&sortOrder0=ASC
              - generic [ref=e152]: Employee List
          - listitem [ref=e153]:
            - link "Add Employee" [ref=e154]:
              - /url: ./lib/controllers/CentralController.php?reqcode=EMP&capturemode=addmode
              - generic [ref=e155]: Add Employee
      - listitem [ref=e156] [cursor=pointer]:
        - link "Leave" [ref=e157]:
          - /url: ./index.php?menu_no_top=leave
          - generic [ref=e158]: Leave
        - list [ref=e159]:
          - listitem [ref=e160]:
            - link "Leave Summary" [ref=e161]:
              - /url: "#"
              - generic [ref=e162]: Leave Summary
            - list [ref=e163]:
              - listitem [ref=e164]:
                - link "Employee Leave Summary" [ref=e165]:
                  - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Leave_Select_Employee_Leave_Summary
                  - generic [ref=e166]: Employee Leave Summary
          - listitem [ref=e167]:
            - link "Define Days Off" [ref=e168]:
              - /url: "#"
              - generic [ref=e169]: Define Days Off
            - list [ref=e170]:
              - listitem [ref=e171]:
                - link "Days Off" [ref=e172]:
                  - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Holiday_Weekend_List
                  - generic [ref=e173]: Days Off
              - listitem [ref=e174]:
                - link "Specific Holidays" [ref=e175]:
                  - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Holiday_Specific_List
                  - generic [ref=e176]: Specific Holidays
          - listitem [ref=e177]:
            - link "Define Leave Types" [ref=e178]:
              - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Leave_Type_Summary
              - generic [ref=e179]: Define Leave Types
          - listitem [ref=e180]:
            - link "Assign Leave" [ref=e181]:
              - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Leave_Apply_Admin_view
              - generic [ref=e182]: Assign Leave
          - listitem [ref=e183]:
            - link "Leave List" [ref=e184]:
              - /url: lib/controllers/CentralController.php?leavecode=Leave&action=Leave_FetchLeaveAdmin&NewQuery=1
              - generic [ref=e185]: Leave List
      - listitem [ref=e186] [cursor=pointer]:
        - link "Time" [ref=e187]:
          - /url: ./index.php?menu_no_top=time
          - generic [ref=e188]: Time
        - list [ref=e189]:
          - listitem [ref=e190]:
            - link "Timesheets" [ref=e191]:
              - /url: lib/controllers/CentralController.php?timecode=Time&action=View_Select_Employee
              - generic [ref=e192]: Timesheets
            - list [ref=e193]:
              - listitem [ref=e194]:
                - link "Print Timesheets" [ref=e195]:
                  - /url: lib/controllers/CentralController.php?timecode=Time&action=Select_Timesheets_View
                  - generic [ref=e196]: Print Timesheets
              - listitem [ref=e197]:
                - link "Employee timesheets" [ref=e198]:
                  - /url: lib/controllers/CentralController.php?timecode=Time&action=View_Select_Employee
                  - generic [ref=e199]: Employee timesheets
          - listitem [ref=e200]:
            - link "Attendance" [ref=e201]:
              - /url: lib/controllers/CentralController.php?timecode=Time&action=Show_Employee_Report
              - generic [ref=e202]: Attendance
            - list [ref=e203]:
              - listitem [ref=e204]:
                - link "Employee Reports" [ref=e205]:
                  - /url: lib/controllers/CentralController.php?timecode=Time&action=Show_Employee_Report
                  - generic [ref=e206]: Employee Reports
              - listitem [ref=e207]:
                - link "Configuration" [ref=e208]:
                  - /url: lib/controllers/CentralController.php?timecode=Time&action=Show_Attendance_Config
                  - generic [ref=e209]: Configuration
          - listitem [ref=e210]:
            - link "Employee Reports" [ref=e211]:
              - /url: lib/controllers/CentralController.php?timecode=Time&action=Employee_Report_Define
              - generic [ref=e212]: Employee Reports
          - listitem [ref=e213]:
            - link "Project Reports" [ref=e214]:
              - /url: lib/controllers/CentralController.php?timecode=Time&action=Project_Report_Define
              - generic [ref=e215]: Project Reports
          - listitem [ref=e216]:
            - link "Work shifts" [ref=e217]:
              - /url: lib/controllers/CentralController.php?timecode=Time&action=View_Work_Shifts
              - generic [ref=e218]: Work shifts
      - listitem [ref=e219] [cursor=pointer]:
        - link "Benefits" [ref=e220]:
          - /url: ./index.php?menu_no_top=benefits
          - generic [ref=e221]: Benefits
        - list [ref=e222]:
          - listitem [ref=e223]:
            - link "Health savings plan" [ref=e224]:
              - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Hsp_Summary&year=2026
              - generic [ref=e225]: Health savings plan
            - list [ref=e226]:
              - listitem [ref=e227]:
                - link "Define HSP" [ref=e228]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Define_Health_Savings_Plans
                  - generic [ref=e229]: Define HSP
              - listitem [ref=e230]:
                - link "Employee HSP Summary" [ref=e231]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Hsp_Summary&year=2026
                  - generic [ref=e232]: Employee HSP Summary
              - listitem [ref=e233]:
                - link "HSP Payments Due" [ref=e234]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=List_Hsp_Due
                  - generic [ref=e235]: HSP Payments Due
              - listitem [ref=e236]:
                - link "HSP Expenditures" [ref=e237]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Hsp_Expenditures_Select_Year_And_Employee
                  - generic [ref=e238]: HSP Expenditures
              - listitem [ref=e239]:
                - link "HSP Used" [ref=e240]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Hsp_Used_Select_Year&year=2026
                  - generic [ref=e241]: HSP Used
          - listitem [ref=e242]:
            - link "Payroll schedule" [ref=e243]:
              - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Benefits_Schedule_Select_Year
              - generic [ref=e244]: Payroll schedule
            - list [ref=e245]:
              - listitem [ref=e246]:
                - link "View Payroll Schedule" [ref=e247]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=Benefits_Schedule_Select_Year
                  - generic [ref=e248]: View Payroll Schedule
              - listitem [ref=e249]:
                - link "Add Pay Period" [ref=e250]:
                  - /url: lib/controllers/CentralController.php?benefitcode=Benefits&action=View_Add_Pay_Period
                  - generic [ref=e251]: Add Pay Period
      - listitem [ref=e252] [cursor=pointer]:
        - link "Recruitment" [ref=e253]:
          - /url: ./index.php?menu_no_top=recruit
          - generic [ref=e254]: Recruitment
        - list [ref=e255]:
          - listitem [ref=e256]:
            - link "Job Vacancies" [ref=e257]:
              - /url: lib/controllers/CentralController.php?recruitcode=Vacancy&action=List
              - generic [ref=e258]: Job Vacancies
          - listitem [ref=e259]:
            - link "Applicants" [ref=e260]:
              - /url: lib/controllers/CentralController.php?recruitcode=Application&action=List
              - generic [ref=e261]: Applicants
      - listitem [ref=e262] [cursor=pointer]:
        - link "Performance" [ref=e263]:
          - /url: index.php?uniqcode=KPI&menu_no_top=eim&uri=./symfony/web/index.php/performance/viewReview/mode/new
          - generic [ref=e264]: Performance
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "KPI List" [ref=e267]:
              - /url: index.php?uniqcode=KPI&menu_no_top=performance&uri=./symfony/web/index.php/performance/listDefineKpi
              - generic [ref=e268]: KPI List
          - listitem [ref=e269]:
            - link "Add KPI" [ref=e270]:
              - /url: index.php?uniqcode=KPI&menu_no_top=performance&uri=./symfony/web/index.php/performance/saveKpi
              - generic [ref=e271]: Add KPI
          - listitem [ref=e272]:
            - link "Copy KPI" [ref=e273]:
              - /url: index.php?uniqcode=KPI&menu_no_top=performance&uri=./symfony/web/index.php/performance/copyKpi
              - generic [ref=e274]: Copy KPI
          - listitem [ref=e275]:
            - link "Add Review" [ref=e276]:
              - /url: index.php?uniqcode=KPI&menu_no_top=performance&uri=./symfony/web/index.php/performance/saveReview
              - generic [ref=e277]: Add Review
          - listitem [ref=e278]:
            - link "Reviews" [ref=e279]:
              - /url: index.php?uniqcode=KPI&menu_no_top=performance&uri=./symfony/web/index.php/performance/viewReview/mode/new
              - generic [ref=e280]: Reviews
      - listitem [ref=e281] [cursor=pointer]:
        - link "Reports" [ref=e282]:
          - /url: ./index.php?menu_no_top=rep
          - generic [ref=e283]: Reports
        - list [ref=e284]:
          - listitem [ref=e285]:
            - link "View Reports" [ref=e286]:
              - /url: index.php?repcode=EMPVIEW&menu_no_top=rep
              - generic [ref=e287]: View Reports
          - listitem [ref=e288]:
            - link "Define Reports" [ref=e289]:
              - /url: index.php?repcode=EMPDEF&menu_no_top=rep
              - generic [ref=e290]: Define Reports
      - listitem [ref=e291] [cursor=pointer]:
        - link "Bug Tracker" [ref=e292]:
          - /url: ./index.php?menu_no_top=bug
          - generic [ref=e293]: Bug Tracker
      - listitem [ref=e294] [cursor=pointer]:
        - link "Help" [ref=e295]:
          - /url: "#"
          - generic [ref=e296]: Help
        - list [ref=e297]:
          - listitem [ref=e298]:
            - link "Help Contents" [ref=e299]:
              - /url: help.php
              - generic [ref=e300]: Help Contents
          - listitem [ref=e301]:
            - link "Support" [ref=e302]:
              - /url: http://www.orangehrm.com/subscribe-support.shtml
              - generic [ref=e303]: Support
          - listitem [ref=e304]:
            - link "Forum" [ref=e305]:
              - /url: http://www.orangehrm.com/forum/
              - generic [ref=e306]: Forum
          - listitem [ref=e307]:
            - link "Blog" [ref=e308]:
              - /url: http://www.orangehrm.com/blog/
              - generic [ref=e309]: Blog
  - iframe [active] [ref=e311]:
    - generic [active] [ref=f1e1]:
      - iframe [ref=f1e2]:
        
      - button "Back" [ref=f1e4]
      - generic [ref=f1e6]:
        - generic [ref=f1e12]:
          - 'heading "PIM : Add Employee" [level=2] [ref=f1e14]'
          - generic [ref=f1e15]: Code
          - textbox "Code" [ref=f1e16]: "6951"
          - generic [ref=f1e17]: Last Name *
          - textbox "Last Name *" [ref=f1e18]
          - generic [ref=f1e19]: First Name *
          - textbox [ref=f1e20]
          - generic [ref=f1e21]: Middle Name
          - textbox "Middle Name" [ref=f1e22]
          - generic [ref=f1e23]: Nick Name
          - textbox "Nick Name" [ref=f1e24]
          - generic [ref=f1e25]: Photo
          - button "Photo" [ref=f1e26]
          - generic [ref=f1e27]:
            - button "Save" [ref=f1e28]
            - button "Reset" [ref=f1e29]
        - generic [ref=f1e34]: Fields marked with an asterisk * are required.
  - link "SureshIT" [ref=e313] [cursor=pointer]:
    - /url: "#"
```

# Test source

```ts
  1  | import { expect, Locator, Page } from '@playwright/test';
  2  | 
  3  | export class AddEmployeePage {
  4  |     private page: Page;
  5  | 
  6  |     readonly employeeCode: Locator;
  7  |     readonly lastNameField: Locator;
  8  |     readonly firstNameField: Locator;
  9  |     readonly middleNameField: Locator;
  10 |     readonly nickNameField: Locator;
  11 |     readonly photoFileInput: Locator;
  12 |     readonly saveBtn: Locator;
  13 |     readonly resetBtn: Locator;
  14 |     readonly addEmployeeHeading: Locator;
  15 | 
  16 |     constructor(page: Page) {
  17 |         this.page = page;
  18 | 
  19 |         this.employeeCode = page.locator('#txtEmployeeId');
  20 |         this.lastNameField = page.locator('#txtEmpLastName');
  21 |         this.firstNameField = page.locator('#txtEmpFirstName');
  22 |         this.middleNameField = page.locator('#txtEmpMiddleName');
  23 |         this.nickNameField = page.locator('#txtEmpNickName');
  24 |         this.photoFileInput = page.locator('#photofile');
  25 |         this.saveBtn = page.locator('#btnEdit');
  26 |         this.resetBtn = page.getByRole('button', { name: 'Reset' });
  27 |         this.addEmployeeHeading = page.getByText('PIM : Add Employee');
  28 |     }
  29 | 
  30 |     async verifyAddEmployeePage() {
> 31 |         await expect(this.addEmployeeHeading).toBeVisible();
     |                                               ^ Error: expect(locator).toBeVisible() failed
  32 |     }
  33 | 
  34 |     async fillLastName(lastName: string) {
  35 |         await this.lastNameField.fill(lastName);
  36 |     }
  37 | 
  38 |     async fillFirstName(firstName: string) {
  39 |         await this.firstNameField.fill(firstName);
  40 |     }
  41 | 
  42 |     async fillMiddleName(middleName: string) {
  43 |         await this.middleNameField.fill(middleName);
  44 |     }
  45 | 
  46 |     async fillNickName(nickName: string) {
  47 |         await this.nickNameField.fill(nickName);
  48 |     }
  49 | 
  50 |     async uploadPhoto(filePath: string) {
  51 |         await this.photoFileInput.setInputFiles(filePath);
  52 |     }
  53 | 
  54 |     async clickSaveButton() {
  55 |         await this.saveBtn.click();
  56 |     }
  57 | 
  58 |     async clickResetButton() {
  59 |         await this.resetBtn.click();
  60 |     }
  61 | 
  62 |     async getEmployeeCode(): Promise<string | null> {
  63 |         return await this.employeeCode.inputValue();
  64 |     }
  65 | 
  66 |     async addEmployeeWithAllFields(lastName: string, firstName: string, middleName: string, nickName: string, photoPath?: string) {
  67 |         await this.fillLastName(lastName);
  68 |         await this.fillFirstName(firstName);
  69 |         await this.fillMiddleName(middleName);
  70 |         await this.fillNickName(nickName);
  71 |         
  72 |         if (photoPath) {
  73 |             await this.uploadPhoto(photoPath);
  74 |         }
  75 | 
  76 |         await this.clickSaveButton();
  77 |         await this.page.waitForTimeout(3000);
  78 |     }
  79 | }
  80 | 
```