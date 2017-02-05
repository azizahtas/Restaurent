import {Injectable} from "@angular/core";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Settings} from "../settings";
import {UserLogin} from "./user.modal";
import {Observable} from "rxjs/Observable";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
@Injectable()
export class UserService {
    constructor(private _http:Http) {
    }
    private _baseUrl = "http://" + Settings.serverHost + ":" + Settings.serverPort + "/api/user";

    login(user : UserLogin): Observable<GeneralResponseModal> {
        return this._http.post(this._baseUrl+"/login",user)
            .map(res => res.json())
    }

}
