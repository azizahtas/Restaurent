
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Branch} from "./branch.modal";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BranchService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/branch";

    getAllBranches(query?) : Observable<GeneralResponseModal>
    {
        if(query){
            return this._http.get(this._baseUrl+"/u/Search/"+query)
                .map(d => d.json())
        }else {
            return this._http.get(this._baseUrl)
                .map(d => d.json())
        }
    }

    addBranch(item : Branch): Observable<GeneralResponseModal> {
        return this._http.post(this._baseUrl,item)
            .map(res => res.json())
    }

    editBranch(branch : Branch): Observable<GeneralResponseModal> {
        return this._http.put(this._baseUrl+'/'+branch._id,branch)
            .map(res => res.json())
    }

    deleteBranch(Id : string): Observable<GeneralResponseModal> {
        return this._http.delete(this._baseUrl+'/'+Id)
            .map(res => res.json())
    }
    checkName(name : string): Observable<GeneralResponseModal> {
        return this._http.get(this._baseUrl+'/check/'+name)
            .map(res => res.json())
            .debounceTime(500)
            .distinctUntilChanged()
    }

}