import { Component } from '@angular/core';
import { Auth } from '../Auth/auth.service';
import { UserService } from './user.service';
import { BranchService } from '../Branch/branch.service';
import { UserSignup, UserSearchModal, OtherDetails } from './user.modal';
import { Message } from '../Shared/Message.modal';
import { Branch } from '../Branch/branch.modal';
@Component({
    selector: 'user',
    templateUrl: 'app/User/user.component.html',
})
export class UserComponent {
    constructor(private _auth: Auth, private _user: UserService,
    private _bran:BranchService) { }

    Users: OtherDetails[];
    SearchedUsers: OtherDetails[];
    messages: Message[];
    Branches:Branch[];

    user_search: UserSearchModal;
    manager : UserSignup;
    managerEdit : UserSignup;

    serverOffline: boolean = false;
    checking_Email: boolean = false;
    checking_Email_Error: boolean = false;
    incorrectSignup: boolean = false;
    

    ngOnInit() {
        this.Users = [];
        this.SearchedUsers = [];
        this.messages = [];
        this.Branches = [];

        this.user_search = new UserSearchModal();
        this.manager = new UserSignup();
        this.managerEdit = new UserSignup();

        this.getAllUsers();
        this.getAllBranches();
    }

    public CheckEmail(email: String) {
        this.checking_Email = true;
        this.serverOffline = false;
        this._user.checkUser(email)
            .subscribe(
            data => {
                this.checking_Email_Error = data.success;
            },
            err => { this.serverOffline = true; }, () => { this.checking_Email = false; }
            )
    }

    public Manager(Edit: boolean) {
        this.messages = [];
        if (!Edit) {
            var newuser = new UserSignup();
            newuser.local.email = this.manager.local.email;
            newuser.local.password = this.manager.local.password;
            newuser.otherDetails.fname = this.manager.otherDetails.fname;
            newuser.otherDetails.lname = this.manager.otherDetails.lname;
            newuser.otherDetails.phone = this.manager.otherDetails.phone;
            newuser.otherDetails._branchId = this.manager.otherDetails._branchId;
            newuser.otherDetails.bm = true;

            this._user.signup(newuser)
                .subscribe(
                data => {
                    this.serverOffline = false;
                    if (data.success) {
                        this.messages.push({ type: 'success', title: 'Registered Successfully!!', message: 'Welcome ' + newuser.otherDetails.fname + ' ' + newuser.otherDetails.lname });
                        this.incorrectSignup = false;
                    }
                    else if (!data.success) {
                        this.incorrectSignup = true;
                        this.messages.push({ type: 'danger', title: 'Something Went Wrong!', message: 'Error : ' + data.msg });
                    }
                },
                err => {
                    this.serverOffline = true;
                    this.messages.push({ type: 'danger', title: 'Try Again! Sorry We Couldnt Sign you up!!', message: 'Server Seems Buisy!' });
                },
                () => { this.getAllUsers(); }
                )
        }
    }



    private getAllUsers() {
        this._user.getAllUsers()
            .subscribe(
            data => {
                this.serverOffline = false;
                if (data.success) {
                    this.Users = data.data;
                    this.SearchedUsers = data.data;
                }
                else {
                    this.messages.push({ type: 'danger', title: 'Something Went Wrong! Try Again', message: data.msg});
                }
            },
            err => { this.serverOffline = true; },
            () => { }
            )
    }

    private getAllBranches() {
        this._bran.getAllBranches()
            .subscribe(
            data => {
                if (data.success) {
                    this.Branches = data.data;
                }
            },
            err => { },
            () => { }
            )
    }
}
