import {Component} from "@angular/core";
import {Auth} from "../Auth/auth.service";
import {UserLogin} from "../User/user.modal";
import {UserService} from "../User/user.service";
@Component({
    selector : 'headerbar',
    templateUrl : './app/Core/headerbar.component.html'
})
export class HeaderBarComponent{
    constructor(public _auth:Auth, public _user:UserService){}

    user : UserLogin = new UserLogin();

    incorrect : boolean = false;
    serverOffline : boolean = false;

    public Login(){
        var newUser = new UserLogin();
        newUser.email = this.user.email;
        newUser.password = this.user.password;
        this._user.login(newUser)
            .subscribe(
                data =>{
                    this.serverOffline = false;
                    if(data.success){
                        this.incorrect = false;
                        var token = data.data;
                        localStorage.setItem('token', token);
                    }
                    else if(!data.success){
                        this.incorrect = true;
                    }
                },
                err => {
                    this.serverOffline = true;
                },
                ()=> {}
            )
    }
}