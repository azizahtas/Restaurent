export class MenuItem {
    _id : string;
    Name : string;
    PHalf : number;
    PFull : number;
    Desc : string;
    Img_Url : string;
    Category : string;
    Type : string;

    constructor(){
        this.Name = "";
        this.PHalf = 0;
        this.PFull = 0;
        this.Desc = "";
        this.Img_Url = "";
        this.Category = "";
        this.Type = "";
    }
}
