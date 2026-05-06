export class Price_Request_Details
{
    Price_Request_Details_Id:number;
    Price_Request_Master_Id:number;
    StockId:number;
ItemId:number;
ItemName:string;
Item_Code:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
PurchaseRate:number;
SaleRate:number;
MRP:number;
//HSNId:number;
HSNMasterId:number;
HSNCODE:string;
Country_Id: number;
Country_Name: string;

Quantity:number;
Discount:number;
NetValue:number;
SaleTax:number;
TaxAmount:number;
Stock:number;
Description:string;
UnitPrice:number;
Amount:number;
Availability:string;
Unit_Discount:number;
    TaxableAmount: number;
    // Sale_Tax: number;
    Item_Discount_Amount:number;
    Expiry_Date:Date;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

