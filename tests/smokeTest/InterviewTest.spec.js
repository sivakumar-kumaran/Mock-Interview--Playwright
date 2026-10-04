
const {test,expect}=require("@playwright/test");

const {Login, Loginpage}=require('../../Pages/Loginpage');

const{Informtaion} =require("./TestData.js")


test("InterviewTest",async ({page})=>{
   await page.goto("https://mockwithsiva.vercel.app/");
   
   const login=new Loginpage(page);

   await login.Login(Informtaion.email,Informtaion.password);

   await expect(page).toHaveURL("https://mockwithsiva.vercel.app/dashboard");
   await expect(page.getByText("Dashboard")).toBeVisible();
   

   await page.getByRole('link',{name:'Interview',exact :true}).click();

   await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/setup');
 

   await page.getByText('Topic-Based Interview').click();

   await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/setup');

   const topic=await page.getByRole('combobox',{name:''})

   await topic.selectOption("JavaScript");

   await page.getByRole('button',{name:'Beginner'}).click();

   await page.getByRole('button',{name:'Proceed to Rules'}).click();
   await page.getByRole('button',{name:'Agree & Start Simulated Exam'}).click();

   
   await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/active');

   await page.getByRole('button',{name:'Enter Interview Mode (Fullscreen)'}).click();

   await expect(page.getByRole('button',{name:'Record Answer'})).toBeVisible();

   const mediaResult = await page.evaluate(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      return {
        success: true,
        videoTracks: stream.getVideoTracks().length,
        audioTracks: stream.getAudioTracks().length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  });

  console.log("Media result:", mediaResult);

  expect(mediaResult.success).toBe(true);
  expect(mediaResult.videoTracks).toBeGreaterThan(0);
  expect(mediaResult.audioTracks).toBeGreaterThan(0);

   let count=0;
   while(count<5){
      const buttonT=page.getByRole("button",{name:"Submit Answer"});

      await buttonT.click();

      count++;
   }

   await expect(page).toHaveURL(/.*\/interview\/feedback/);

   console.log("End to end Interview plateform Tested successfully!..Good Siva")

})



