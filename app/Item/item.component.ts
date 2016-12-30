import { Component } from '@angular/core';
import {MenuItem} from "./item.modal";
import {Message} from "../Shared/Message.modal";
import {ItemService} from "./item.service";
import {CategoryService} from "../Category/category.service";
import {Category} from "../Category/category.modal";

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
    constructor(private _itm:ItemService,private _cat:CategoryService){}

     menuItem : MenuItem;
    categories : Category[];
    messages : Message[];

    checking_Name : boolean = false;
    checking_Name_Error : boolean = false;

    ngOnInit() {
        this.menuItem = new MenuItem();
        this._cat.getAllItems()
            .subscribe(
                data =>{
                    this.categories = data.data;
                },
                error =>{

                },
                ()=>{}
            );
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
        this.messages = [];
        if(!edit){
            var newItm = new MenuItem();
            newItm.Name = this.menuItem.Name;
            newItm.HPrice = this.menuItem.HPrice;
            newItm.FPrice = this.menuItem.FPrice;
            newItm.Desc = this.menuItem.Desc;
            newItm.Img_Url = this.menuItem.Img_Url;
            newItm.Category = this.menuItem.Category;
            newItm.Type = this.menuItem.Type;
            this._itm.addItem(newItm)
                .subscribe(
                    data => {
                        if(data.status=="Success"){
                            this.messages.push({type:'success',title:'Created Successfully!',message:'Menu Item Was Saved Successfully!'});
                        }
                        else if(data.status == "Error"){
                            this.messages.push({type:'danger',title:'Error Occured!',message:'Something Went Wrong Server Side!'});
                        }
                    },
                    err =>{},
                    ()=>{}
                )

        }
        else{



        }
    }
    public CheckName(name:string){
         this.checking_Name = false;
        this.checking_Name_Error = false;
        this._itm.checkName(name)
            .subscribe(
                data => {
                    this.checking_Name = true;
                    if(data.status == "Success" && data.data ==""){
                        this.checking_Name = false;
                        this.checking_Name_Error = false;
                    }
                    else if(data.status == "Success" && data.data !=""){
                        this.checking_Name_Error = true;
                        this.checking_Name = false;
                    }
                }
            )
    }

}