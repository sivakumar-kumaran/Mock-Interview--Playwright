
// const {test,expect}=require("@playwright/test");

// const {Login, Loginpage}=require('../../Pages/Loginpage');

// const{Informtaion} =require("./TestData.js")


// test("InterviewTest",async ({page})=>{
//    await page.goto("https://mockwithsiva.vercel.app/");
   
//    const login=new Loginpage(page);

//    await login.Login(Informtaion.email,Informtaion.password);

//    await expect(page).toHaveURL("https://mockwithsiva.vercel.app/dashboard");
//    await expect(page.getByText("Dashboard")).toBeVisible();
   

//   const interViewLink=await page.getByRole('link',{name:'Interview',exact :true});
//   await expect(interViewLink).toBeVisible();
//   await interViewLink.click();
//   await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/setup');
 
//   const chooseTopic=page.getByText('Topic-Based Interview');
//   await expect(chooseTopic).toBeVisible();
//   await chooseTopic.click();

//    await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/setup');

//    const topic=await page.getByRole('combobox',{name:''}).first();

//    await topic.selectOption("Java");

//    await page.getByRole('button',{name:'Beginner'}).click();

//    await page.getByRole('button',{name:'Proceed to Rules'}).click();
//    await page.getByRole('button',{name:'Agree & Start Simulated Exam'}).click();

   
//    await expect(page).toHaveURL('https://mockwithsiva.vercel.app/interview/active');

//    await page.getByRole('button',{name:'Enter Interview Mode (Fullscreen)'}).click();

//    await expect(page.getByRole('button',{name:'Record Answer'})).toBeVisible();

//    const mediaResult = await page.evaluate(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       return {
//         success: true,
//         videoTracks: stream.getVideoTracks().length,
//         audioTracks: stream.getAudioTracks().length,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   });

//   console.log("Media result:", mediaResult);

//   expect(mediaResult.success).toBe(true);
//   expect(mediaResult.videoTracks).toBeGreaterThan(0);
//   expect(mediaResult.audioTracks).toBeGreaterThan(0);

//    let count=0;
//    while(count<5){
//       const buttonT=page.getByRole("button",{name:"Submit Answer"});

//       await buttonT.click();

//       count++;
//    }

//    await expect(page).toHaveURL(/.*\/interview\/feedback/);

//    console.log("End to end Interview plateform Tested successfully!..Good Siva")

// })




const { test, expect } = require("@playwright/test");
const { Loginpage } = require("../../Pages/Loginpage");
const { Informtaion } = require("./TestData.js");

test("InterviewTest", async ({ page }) => {

  await page.goto("https://mockwithsiva.vercel.app/");

  const login = new Loginpage(page);

  await login.Login(
    Informtaion.email,
    Informtaion.password
  );

  await expect(page).toHaveURL(
    "https://mockwithsiva.vercel.app/dashboard" ,{timeout:15000}
  );

  await expect(
    page.getByText("Dashboard")
  ).toBeVisible();

  // Interview page
  const interviewLink = page.getByRole("link", {
    name: "Interview",
    exact: true,
  });

  await expect(interviewLink).toBeVisible();
  await interviewLink.click();

  await expect(page).toHaveURL(
    "https://mockwithsiva.vercel.app/interview/setup"
  );

  // Select interview type
  const topicInterview = page.getByText(
    "Topic-Based Interview"
  );

  await expect(topicInterview).toBeVisible();
  await topicInterview.click();

  // Select topic
  const topic = page.getByRole("combobox").first();

  await expect(topic).toBeVisible();
  await topic.selectOption("JavaScript");

  // Difficulty
  const beginner = page.getByRole("button", {
    name: "Beginner",
  });

  await expect(beginner).toBeVisible();
  await beginner.click();

  // Rules
  const proceedButton = page.getByRole("button", {
    name: "Proceed to Rules",
  });

  await expect(proceedButton).toBeEnabled();
  await proceedButton.click();

  const startButton = page.getByRole("button", {
    name: "Agree & Start Simulated Exam",
  });

  await expect(startButton).toBeEnabled();
  await startButton.click();

  // Active interview
  await expect(page).toHaveURL(
    "https://mockwithsiva.vercel.app/interview/active"
  );

  const fullscreenButton = page.getByRole("button", {
    name: "Enter Interview Mode (Fullscreen)",
  });

  await expect(fullscreenButton).toBeVisible();
  await fullscreenButton.click();

  // Recording button
  await expect(
    page.getByRole("button", {
      name: "Record Answer",
    })
  ).toBeVisible();

  // Verify camera + microphone
  const mediaResult = await page.evaluate(async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      const result = {
        success: true,
        videoTracks:
          stream.getVideoTracks().length,
        audioTracks:
          stream.getAudioTracks().length,
      };

      stream
        .getTracks()
        .forEach(track => track.stop());

      return result;

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

  // Submit 5 answers
  for (let count = 0; count < 5; count++) {

    const submitButton = page.getByRole(
      "button",
      {
        name: "Submit Answer",
      }
    );

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    await submitButton.click();
  }

  // Feedback page
  await expect(page).toHaveURL(
    /\/interview\/feedback/,{timeout:15000}
  );

  console.log(
    "End-to-end Interview platform tested successfully!"
  );
});