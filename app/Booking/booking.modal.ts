export class Booking{
    _id : string;
    _UserId : string;
    _BranchId : string;
    _TableId : string;
    TNo : number;
    Date : string;
    Time : number;
    NoOfPersons : number;
    Orders : Order[];

    constructor(){
        this._UserId = "";
        this._BranchId = "";
        this._TableId = "";
        this.TNo = null;
        this.Date = "";
        this.Time = null;
        this.NoOfPersons = null;
        this.Orders = [];
    }
}

export class Order {
    _MenuId : string;
    constructor(){
        this._MenuId = "";
    }
}