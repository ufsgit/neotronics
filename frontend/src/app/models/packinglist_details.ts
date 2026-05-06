export class packinglist_details
{
    PackingList_Details_Id:number;
    PackingList_Master_Id:number;
    ItemId:number;
    ItemCode:string;
    Item_Code:string;
    Expiry_Date:Date;
    ItemName:string;
    GroupId:number;
    GroupName:string;
    UnitId:number;
    UnitName:string;
    StockId:number;
    HSNMasterId:number;
    HSNCODE:string;
    Country_Of_Origin:string;
    Country_Id : number;
    Country_Name: string;
    PurchaseRate:number;
    TaxableAmount:number;
    TaxAmount:number;
    Item_Discount_Amount:number;
    Unit_Discount:number;
    Amount:number;
    NetValue:number;
    Discount:number;
    Quantity:number;
SaleRate:number;
MRP:number;
Stock:number;
UnitPrice:number;
Sale_Tax : number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}



