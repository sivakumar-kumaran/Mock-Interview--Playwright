const{expect}=require('@playwright/test');
const { TIMEOUT } = require('dns');

class Loginpage{
    constructor (page){
        this.page=page;

        this.startButton=page.getByRole('link',{name:"Sign In / Sign Up"})
        this.userName=page.getByPlaceholder("you@example.com")
        this.password=page.locator("input[type='password']")
        this.signIn=page.getByRole('button',{name :"Sign In"})
    }

    async Login(email,password){

        await expect(this.startButton).toBeVisible();
        await expect(this.startButton).toBeEnabled();
        await this.startButton.click();
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signIn.click();
    }
}


module.exports={Loginpage};