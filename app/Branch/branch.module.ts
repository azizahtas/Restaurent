import { NgModule } from '@angular/core';
import {BranchRouting} from "./branch.routes";
import {BranchCenterComponent} from "./branchCenter.component";
import {BranchComponent} from "./branch.component";
import {SharedModule} from "../Shared/shared.module";
import {BranchService} from "./branch.service";
import {CalendarModule} from "primeng/primeng";

@NgModule({
    imports: [SharedModule,BranchRouting,CalendarModule],
    declarations: [
        BranchCenterComponent,
        BranchComponent
    ],
    providers : [BranchService]
})
export class BranchModule { }
