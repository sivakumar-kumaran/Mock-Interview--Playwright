const{test, expect}=require("@playwright/test");
const {Register}=require('../../Pages/Register')

import * as XLSX from 'xlsx';
import path from 'path';

const regsitrationData=path.join(__dirname,'../../TestData/TestingExcel.xlsx')
test("RegisterPage_chech",async ({page})=>{

    const workbook=XLSX.readFile(regsitrationData)
    const worksheet=workbook.Sheets['RegistrationData'];
    const Data=XLSX.utils.sheet_to_json(worksheet);

    

    const register=new Register(page);

    for(const temp of Data){

            await page.goto("https://mockwithsiva.vercel.app/")
            await expect(page).toHaveTitle("Mock Interview Platform - AI-Powered Interview Simulation");

            const checked=await register.register(temp.Name,temp.Email,temp.Password,temp.ConfirmPassword);

            if(checked){

            const result=await Promise.race([
                page.waitForURL('**/dashboard',{timeout:2000})
                .then(()=>"success")
                .catch(()=>null),

                page.getByText('User already exists with this email')
                .waitFor({state:'visible' , timeout:2000})
                .then(()=>'User already exists with this email')
                .catch(()=>null),

                page.getByText('Passwords do not match')
                .waitFor({state:'visible',timeout:2000})
                .then(()=>'Passwords do not match')
                .catch(()=>'null')

            ])

            if(result=='success'){
                console.log('Regsitration Success');
            }else if(result=='Passwords do not match'){
                console.log("Passwords do not match");
            }else if(result=="User already exists with this email"){
                console.log("User already exists with this email")
            }else{
                console.log("Received a Null Value")
            }
        }

    }


});