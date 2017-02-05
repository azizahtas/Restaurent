export class UserLogin {
     email : String;
     password : String;
 constructor(){
     this.email = "";
     this.password = "";
 }
}

export class UserSignup{
    local : {
        email : String;
        password : String
    };
    otherDetails : {
        who : Boolean,
        fname : String,
        lname : String,
        phone : String
    };
    constructor(){
        this.local.email = "";
        this.local.password = "";
        this.otherDetails.who = false;
        this.otherDetails.fname = "";
        this.otherDetails.lname = "";
        this.otherDetails.phone = "";

    }
}

