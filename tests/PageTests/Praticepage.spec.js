const {test,expect}=require('@playwright/test')
const {Loginpage}=require('../../Pages/Loginpage');

test("PraticePageTest",async ({page})=>{

    await page.goto("https://mockwithsiva.vercel.app/");

    await expect(page).toHaveTitle("Mock Interview Platform - AI-Powered Interview Simulation");

    const l1=new Loginpage(page);
    await l1.Login("sivakumarirulaye@gmail.com","123456");

    await expect(page).toHaveURL('https://mockwithsiva.vercel.app/dashboard')

    await page.getByRole('link',{name:'Practice', exact:true}).click();

    await expect(page).toHaveURL('https://mockwithsiva.vercel.app/practice')

    const a=["Java","JavaScript","React","Node.js","MongoDB","SQL","DBMS","Operating System","Computer Networks","OOP","DSA","REST APIs","Cloud Computing","System Design","Cyber Security","Agile & DevOps","HR Questions"];
    for(const temp of a){

            console.log("Check the question bank of "+(temp)+" Topic");
            const topicbtn=page.getByRole('heading',{name: temp, exact:true})


            await expect(topicbtn).toBeEnabled();

            await topicbtn.click();

            let i=1;

            while(true){

                const nextbtn=page.getByRole('button',{name:'Next'})
                await expect(nextbtn).toBeVisible();
                const value=await nextbtn.isEnabled();

                if(!value || i==5){
                    break;
                }
                await expect(nextbtn).toBeEnabled();

                if(value)
                await nextbtn.click();

                i++;
            }


            console.log("Question bank succesfully checked for "+(temp)+"  topic"+"\n\n");

            await page.getByText('Back to Topic').click(); 


}


})