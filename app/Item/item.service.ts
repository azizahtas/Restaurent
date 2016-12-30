
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {MenuItem} from "./Item.modal";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ItemService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/menu";

    addItem(item : MenuItem): Observable<GeneralResponseModal> {
        return this._http.post(this._baseUrl,item)
            .map(res => res.json())
    }

    checkName(name : string): Observable<GeneralResponseModal> {
        return this._http.get(this._baseUrl+'/check/'+name)
            .map(res => res.json())
            .debounceTime(500)
            .distinctUntilChanged()
    }

}