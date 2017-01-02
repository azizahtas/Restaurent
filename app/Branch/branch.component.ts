import { Component } from '@angular/core';
import {Branch, BranchSearchModel, LocationModal} from "./branch.modal";
import {Message} from "../Shared/Message.modal";
import {BranchService} from "./branch.service";
import {Category} from "../Category/category.modal";
import * as _ from "lodash"

@Component({
    templateUrl: 'app/Branch/branch.component.html',
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
export class BranchComponent {
    constructor(private _bran:BranchService){}

    BranchAdd : Branch;
    BranchEdit : Branch;
    BranchDelete : Branch;
    BranchView : Branch;

    Branches : Branch[];
    searchedBranches : Branch[];
    messages : Message[];
    searchModal:BranchSearchModel;

    checking_Name : boolean = false;
    checking_Name_Error : boolean = false;
    view_Details:boolean = false;

    ngOnInit(){
        this.BranchAdd = new Branch();
        this.BranchEdit = new Branch();
        this.BranchDelete = new Branch();
        this.BranchView = new Branch();
        this.searchModal = new BranchSearchModel();
        this.getAllBranches();
    }
    ViewDetails(branch:Branch){
        this.BranchView = branch;
        this.view_Details = true;
    }
    editBranch(branch:Branch){
        this.BranchEdit._id = branch._id;
        this.BranchEdit.Name = branch.Name;
        this.BranchEdit.Address = branch.Address;
        this.BranchEdit.Img_Url = branch.Img_Url;
        this.BranchEdit.Location = branch.Location;
        this.BranchEdit.Tables = branch.Tables;
    }
    deleteBranch(branch:Branch){
        this.BranchDelete._id = branch._id;
        this.BranchDelete.Name = branch.Name;
    }

    public CheckName(name:string){
        this.checking_Name = false;
        this.checking_Name_Error = false;
        this._bran.checkName(name)
            .subscribe(
                data => {
                    this.checking_Name = true;
                    if(data.status == "Success" && data.data ==null){
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

public Save(edit){
        this.messages = [];
        if(!edit){
            var newItm = new Branch();
            newItm.Name = this.BranchAdd.Name;
            newItm.Address = this.BranchAdd.Address;
            newItm.Img_Url = this.BranchAdd.Img_Url;
            newItm.Location = new LocationModal();
            newItm.Tables = [];
            this._bran.addBranch(newItm)
                .subscribe(
                    data => {
                        if(data.status=="Success"){
                            this.messages.push({type:'success',title:this.BranchAdd.Name+' Created Successfully!',message:''});
                            this.getAllBranches();
                            this.BranchAdd.Name = "";
                            this.BranchAdd.Img_Url = "";
                            this.BranchAdd.Address = "";
                        }
                        else if(data.status == "Error"){
                            this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                        }
                    },
                    err =>{},
                    ()=>{this.checking_Name = false; this.checking_Name_Error = false;}
                )

        }
        else{
            this._bran.editBranch(this.BranchEdit)
                .subscribe(
                    data => {
                        if(data.status=="Success"){
                            this.messages.push({type:'success',title:this.BranchEdit.Name+' Saved Successfully!',message:''});
                        }
                        else if(data.status == "Error"){
                            this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                        }
                    },
                    err =>{},
                    ()=>{this.checking_Name = false; this.checking_Name_Error = false;}
                )
        }
    }

Delete(id:string){
        this.messages = [];
        this._bran.deleteBranch(id)
            .subscribe(
                data => {
                    if(data.status=="Success"){
                        this.messages.push({type:'success',title:this.BranchDelete.Name+' Deleted Successfully!',message:''});
                        this.getAllBranches();
                    }
                    else if(data.status == "Error"){
                        this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                    }
                },
                err =>{},
                ()=>{}
            )
    }

    BackToSearch(){
        this.view_Details = false;
    }
    CompositSearch(){
        this.view_Details = false;
        let exp = this.generateExpression();
        if(exp!="") {
            let SrchItms:Branch[] = [];
            _(this.Branches).forEach(function (val:Branch) {
                if (eval(exp)) {
                    SrchItms.push(val);
                }
            });
            this.searchedBranches = [];
            this.searchedBranches = SrchItms;
            console.log("exp is "+exp);
            //this.setPages(this.searchdItems);
        }
        else if(exp==""){
            this.getAllBranches();
        }

    }

    generateExpression():string{
        let exp = "";
        if(this.searchModal.Name!=""){
            let patt = new RegExp(this.searchModal.Name,'i');
            exp += patt+".test(val.Name)&&";
        }
        exp = exp.substr(0,exp.length-2);
        return exp;
    }

    getAllBranches(){
        this._bran.getAllBranches()
            .subscribe(
                data=> {
                    if(data.status == 'Success') {
                        this.Branches = data.data;
                        this.searchedBranches = this.Branches;
                    }
                },
                err=>{},
                ()=>{}
            )
    }
}