import {Injectable} from "@angular/core";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

@Injectable()
export class Auth{
    jwtHelper: JwtHelper = new JwtHelper();
    loggedIn() {
        return localStorage.getItem('token') != null;
    }
    isAdmin(){
        if(this.loggedIn()){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            return decodedToken.who;
        }
        else return false;
    }
    public Logout(){
        localStorage.removeItem('token');
    }
}