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
export class UserLoginFacebook{
     id : String ;
     email : String;
     token : String;
     name : String;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}
export class UserLoginTwitter{
     id : String ;
     email : String;
     token : String;
     name : String;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}
export class UserLoginGoogle{
     id : String ;
     email : String;
     token : String;
     name : String;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}

export class UserSignup{
    _id: String;
    local : UserLogin;
    facebook :UserLoginFacebook;
    twitter : UserLoginTwitter;
    google : UserLoginGoogle;
    otherDetails : OtherDetails;
    constructor(){
        this.local = new UserLogin();
        this.facebook = new UserLoginFacebook();
        this.twitter = new UserLoginTwitter();
        this.google = new UserLoginGoogle();
        this.otherDetails = new OtherDetails();
    }
}

export class OtherDetails{
    who : Boolean;
    bm : Boolean;
    fname : String;
    lname : String;
    phone : String;
    _branchId : String;
    constructor(){
        this.who = false;
        this.bm = false;
        this.fname = "";
        this.lname = "";
        this.phone = "";
        this._branchId = "";
    }
}

