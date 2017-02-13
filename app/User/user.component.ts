import { Component } from '@angular/core';
import { Auth } from '../Auth/auth.service';
import { UserService } from './user.service';
@Component({
    selector: 'user',
    templateUrl: 'app/User/user.component.html',
})
export class UserComponent {
    constructor(private _auth:Auth, private _user:UserService){}
    
    
}
