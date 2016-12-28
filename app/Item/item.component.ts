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
.err{
padding: 5px;
}
`]
})
export class ItemComponent {
    constructor(){}

     menuItem : MenuItem;
    ngOnInit() {
        this.menuItem = new MenuItem();
        /* Short
        * this.myForm = this._fb.group({
         name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
         address: this._fb.group({
         street: ['', <any>Validators.required],
         postcode: ['']
         })
         });

         Long
         this.myForm = new FormGroup({
         name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
         address: new FormGroup({
         street: new FormControl('', <any>Validators.required),
         postcode: new FormControl('8000')
         })
         });
        *
        * */

    }
    public Save(edit){
        if(edit){

        }
        else{

        }
    }

}