import { Component } from '@angular/core';
import {Branch, BranchSearchModel, LocationModal, TableModal} from "./branch.modal";
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
    TableAdd:TableModal;
    TableEdit:TableModal;
    TableDelete:TableModal;
    selectedTable:TableModal;
    searchModal:BranchSearchModel;

    lastTableNo:number = 0;

    Branches : Branch[];
    searchedBranches : Branch[];
    messages : Message[];

    checking_Name : boolean = false;
    checking_Name_Error : boolean = false;
    view_Details:boolean = false;
    checking_TNo_Error : boolean = false;

    ngOnInit(){
        this.BranchAdd = new Branch();
        this.BranchEdit = new Branch();
        this.BranchDelete = new Branch();
        this.BranchView = new Branch();
        this.searchModal = new BranchSearchModel();

        this.TableAdd=new TableModal();
        this.TableEdit=new TableModal();
        this.TableDelete = new TableModal();
        this.getAllBranches();
    }
    ViewDetails(branch:Branch){
        this.BranchView = branch;
        this.view_Details = true;
        if(this.BranchView.Tables == undefined || this.BranchView.Tables.length <=0){
            this.lastTableNo = 0;
        }
        else {
            _.reverse(this.BranchView.Tables);
            this.lastTableNo = this.BranchView.Tables[0].TNo;
            _.reverse(this.BranchView.Tables);
        }
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
public Delete(id:string){
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

    CheckTableNo(TNo:number){
        var b : boolean = false;
        _(this.BranchView.Tables).forEach(function (val:TableModal) {
            if(TNo == val.TNo){
                b = true;
                return false;
            }
        });
        this.checking_TNo_Error = b;
    }
    editTable(table:TableModal){
        this.TableEdit._id = table._id;
        this.TableEdit.TNo = table.TNo;
        this.TableEdit.Note = table.Note;
        this.TableEdit.Img_Url = table.Img_Url;
        this.TableEdit.Cap = table.Cap;
    }
    deleteTable(table:TableModal){
        this.TableDelete._id = table._id;
        this.TableDelete.TNo = table.TNo;
    }

public SaveTable(edit){
        this.messages = [];
        if(!edit){
            var newItm = new TableModal();
            newItm.TNo = this.TableAdd.TNo;
            newItm.Note = this.TableAdd.Note;
            newItm.Img_Url = this.TableAdd.Img_Url;
            newItm.Cap = this.TableAdd.Cap;
            this._bran.addTable(this.BranchView._id,newItm)
                .subscribe(
                    data => {
                        if(data.status=="Success"){
                            this.messages.push({type:'success',title:'TNo : '+this.TableAdd.TNo+' Created Successfully!',message:''});
                            this.BranchView.Tables = data.data;
                        }
                        else if(data.status == "Error"){
                            this.messages.push({type:'danger',title:'Error Occurred!',message:'Something Went Wrong Server Side!'});
                        }
                    },
                    err =>{},
                    ()=>{this.checking_TNo_Error = false;}
                )

        }
        else{
            this._bran.editTable(this.BranchView._id,this.TableEdit)
                .subscribe(
                    data => {
                        if(data.status=="Success"){
                            this.messages.push({type:'success',title:'TNo : '+this.TableEdit.TNo+' Saved Successfully!',message:''});
                            this.BranchView.Tables = data.data;
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
public DeleteTable(id:string){
        this.messages = [];
        this._bran.deleteTable(this.BranchView._id,id)
            .subscribe(
                data => {
                    if(data.status=="Success"){
                        this.messages.push({type:'success',title:'TNo : '+this.TableDelete.TNo+' Deleted Successfully!',message:''});
                        this.BranchView.Tables = data.data;
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
    ClearSearch(){
        this.searchModal.Address = "";
        this.searchModal.Name = "";
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
            exp += patt+".test(val.Name)||";
        }
        if(this.searchModal.Address!=""){
            let patt2 = new RegExp(this.searchModal.Address,'i');
            exp += patt2+".test(val.Address)&&";
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