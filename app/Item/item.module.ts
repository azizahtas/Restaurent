import { NgModule } from '@angular/core';
import {ItemRouting} from "./Item.routes";
import {ItemCenterComponent} from "./ItemCenter.component";
import {ItemComponent} from "./Item.component";
import {SharedModule} from "../Shared/shared.module";
import {ItemService} from "./item.service";

@NgModule({
    imports: [SharedModule,ItemRouting],
    declarations: [
        ItemCenterComponent,
        ItemComponent
    ]
})
export class ItemModule { }
