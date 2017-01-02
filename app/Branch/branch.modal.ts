export class Branch {
    _id : string;
    Name : string;
    Address : string;
    Location : LocationModal;
    Tables : TableModal[];
    Img_Url : string;
    constructor(){
        this.Name = "";
        this.Address = "";
        this.Location = new LocationModal();
        this.Tables = [];
        this.Img_Url = "";
    }
}

export class LocationModal{
    Name : string;
    Lat : string;
    Long:string;
    constructor(){
        this.Name = "";
        this.Lat = "";
        this.Long = "";
    }
}
export class TableModal{
    TNo: number;
    Booked: boolean;
    Cap: number;
    Img_Url: string;
}

export class BranchSearchModel {
    Name:string;
    Address:string;
    Location_Name:string;
    Cap:number;

    constructor(){
        this.Name = "";
        this.Address = "";
        this.Location_Name = "";
        this.Cap = 0;
    }
}