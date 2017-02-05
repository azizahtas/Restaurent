import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {DashboardModule} from "./Dashboard/dashboard.module";
import {appRoutes, appRoutingProviders} from "./app.routes";
import {ItemModule} from "./Item/item.module";
import {CoreModule} from "./Core/core.module";
import {BranchModule} from "./Branch/branch.module";
import {Auth} from "./Auth/auth.service";
import {UserService} from "./User/user.service";
import {AuthModule} from "./Auth/auth.module";

@NgModule({
    imports : [appRoutes,DashboardModule,ItemModule,BranchModule,CoreModule,AuthModule],
    declarations : [AppComponent],
    providers : [appRoutingProviders,Auth,UserService],
    bootstrap : [AppComponent]
})
export class AppModule{}