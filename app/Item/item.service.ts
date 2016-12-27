
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {MenuItem} from "./Item.modal";

@Injectable()
export class ItemService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/Item";
}