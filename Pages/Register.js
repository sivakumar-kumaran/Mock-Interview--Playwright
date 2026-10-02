class Register{
    constructor(page){
        this.page=page;

        this.startButton=page.getByRole('link',{name:"Sign In / Sign Up"})
        this.reg=page.getByRole("link",{name:'Sign Up',exact:true})
        this.name=page.getByRole('textbox',{name:"John Doe"});
        this.email=page.getByRole('textbox',{name:"John@example.com"});
        this.password=page.getByRole('textbox',{name:"••••••••"}).nth(0);
        this.confirmPassword=page.getByRole('textbox',{name:"••••••••"}).nth(1);
        this.signUp=page.getByRole('button',{name:"Sign Up"})
    }

    async register(username,useremail,userpassword,userconfirmPassword){
        
        if(!username||!useremail||!userpassword||!userconfirmPassword){
            return false;
        }

        await this.startButton.click();
        await this.reg.click();
        await this.name.fill(username);
        await this.email.fill(useremail);
        await this.password.fill(userpassword);
        await this.confirmPassword.fill(userconfirmPassword);
        await this.signUp.click();

        return true;
    }
}

module.exports={Register}