const{test, expect}=require('@playwright/test');
const {Loginpage}=require('../../Pages/Loginpage')

import * as XLSX from 'xlsx';
import path from 'path';



const userData=path.join(__dirname,"../../TestData/TestingExcel.xlsx")

   test("LoginpageTest",async ({page})=>{

    // object creation here for a class
       const LoginPage=new Loginpage(page);


       const workbook=XLSX.readFile(userData);
       const worksheet=workbook.Sheets['LoginData'];
       const UserExcelData=XLSX.utils.sheet_to_json(worksheet);
       
       for(const temp of UserExcelData){

                await page.goto("https://mockwithsiva.vercel.app/")
                await expect(page).toHaveTitle("Mock Interview Platform - AI-Powered Interview Simulation");

                await LoginPage.Login(String(temp.Email),String(temp.Password));

                const result = await Promise.race([
                page.waitForURL("**/dashboard", { timeout: 3000 })
                    .then(() => "success")
                    .catch(() => null),

                page.getByText("Invalid credentials")
                    .waitFor({ state: "visible", timeout: 3000 })
                    .then(() => "failed")
                    .catch(() => null)
            ]);

            if (result === "success") {
                console.log(`Login Successfully: ${temp.Email}`);
            } else if (result === "failed") {
                console.log(`Login Failed: ${temp.Email}`);
            }
    }
})



