
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Booking} from "../Booking/booking.modal";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class BookingService{
    constructor(private _http:Http,private _authHttp :AuthHttp){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/booking";

        addBooking(booking:Booking): Observable<GeneralResponseModal>{
        return this._authHttp.post(this._baseUrl,booking)
            .map(res => res.json())
    }

}
