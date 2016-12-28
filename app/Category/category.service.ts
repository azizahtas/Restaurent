
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Category} from "./category.modal";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ItemService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/Category";

    getAllItems(query?) : Observable<Category[]>
    {
        if(query){
            return this._http.get(this._baseUrl+"/u/Search/"+query)
                .map(data => data.json())
        }else {
            return this._http.get(this._baseUrl)
                .map(data => data.json())
        }
    }
}