import {Http,RequestOptions} from "@angular/http";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {NgModule} from "@angular/core";
function authHttpServiceFactory(http:Http, options:RequestOptions){
    return new AuthHttp(new AuthConfig(),http,options);
}

@NgModule({
    providers : [{
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
    }]
})
export class AuthModule{}