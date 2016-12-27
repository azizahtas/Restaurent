import { Component } from '@angular/core';
import {MenuItem} from "./item.modal";
import {Message} from "../Shared/Message.modal";
import {ItemService} from "./item.service";
import * as _ from "lodash";

@Component({
    templateUrl: 'app/Item/item.component.html',
    styles :[`
      .image {
    position: relative;
    width: 100%; /* for IE 6 */
}

.cap {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
}      
`]
})
export class ItemComponent {



}