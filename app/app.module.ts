import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {DashboardModule} from "./Dashboard/dashboard.module";
import {appRoutes, appRoutingProviders} from "./app.routes";
import {ItemModule} from "./Item/item.module";
import {CoreModule} from "./Core/core.module";

@NgModule({
    imports : [appRoutes,DashboardModule,ItemModule,CoreModule],
    declarations : [AppComponent],
    providers : [appRoutingProviders],
    bootstrap : [AppComponent]
})
export class AppModule{}