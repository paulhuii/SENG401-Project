This `.side` file contains the following test suites and test cases:

- `TS1_Register_TestSuite`
  - `T1.1_TestRegister_NewJobSeeker`
  - `T1.2_TestRegister_NewJobRecruiter`
  - `T1.3_TestRegister_MissingRequiredFields`
  - `T1.4_TestRegister_ExistingAccount`
- `TS2_CustomizeProfile_TestSuite`
  - `T2.1_TestCustomizeProfile_Jobseeker`
  - `T2.2_TestCustomizeProfile_Recruiter`
- `TS3_SearchAndFilter_TestSuite`
  - `T4.1_TestSearchAndFilter_LoggedIn`
  - `T4.2_TestSearchAndFilter_LoggedOut`
  - `T13.1_TestSearchAndFilter_FilterNonExisiting`
  - `T13.2_TestSearchAndFilter_FilterExistingJob`

**IMPORTANT:** For `T1.1` and `T1.2` to successfully run, the following user accounts should be removed/deleted from the database:
- Test Jobseeker
- Test Recruiter

To run the tests in Selenium IDE, follow these steps:

1. **Install Selenium IDE:**
   - Open Google Chrome browser.
   - Go to the Chrome Web Store.
   - Search for "Selenium IDE".
   - Click on the "Add to Chrome" button to install the extension.

2. **Open Selenium IDE:**
   - Find the Selenium IDE icon in the toolbar of your Chrome browser.
   - Click on the Selenium IDE icon to open the Selenium IDE interface.

3. **Import the JobHub_Tests.side file:**
   - In Selenium IDE, click on the "Open an Existing Project" menu.
   - Navigate to the location where you have the JobHub_Tests.side file saved and select it.

4. **Run the tests:**
   - Once the test suite is loaded, you can see the list of test cases in the Selenium IDE interface.
   - To run a specific test case, click on it to select it.
   - Click on the "Play" button to run the selected test case.
   - You can also run the entire test suite by clicking on the "Play All" button.