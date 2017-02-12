/*
* Ohh Plz! I was not "staring" i was just Looking! And i was not just looking at you I was looking all of you guys having fun coz i was just sitting getting boored!
 You have like greatly misunderstood my intentions!
 God bless that guy who would really stare at you intentionaly
* */
export class UserLogin {
     email : String;
     password : String;
 constructor(){
     this.email = "";
     this.password = "";
 }
}

export class UserSignup{
    local : UserLogin;
    otherDetails : OtherDetails;
    constructor(){
        this.local = new UserLogin();
        this.otherDetails = new OtherDetails();
    }
}

export class OtherDetails{
    who : Boolean;
    fname : String;
    lname : String;
    phone : String;
    constructor(){
        this.who = false;
        this.fname = "";
        this.lname = "";
        this.phone = "";
    }
}

