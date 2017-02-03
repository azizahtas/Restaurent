/*import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Settings} from "../settings";
@Injectable
export class AuthService{

    constructor(private _http : Http){}
    private _baseUrl = 'http://'+Settings.serverHost+":"+Settings.serverPort+"/api/User";

    public login(user) {
        return this._http.post(this._baseUrl+'/login',user)
            .map(res => res.json())
    }/*
    public isLoggedIn():boolean{
        let b: boolean = false;
        if(localStorage.getItem('token')) b = true;
        else b = false;
        return b;
    }*/
/*
}*/