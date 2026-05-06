export class creditnote_details
{
CreditNote_Details_Id:number;
CreditNote_Master_Id:number;
ItemId:number;
ItemCode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
UnitPrice:number;
MRP:number;
HSNCODE:string;
HSNMasterId:number;
Country_Id:number;
Country_Name:string;
SaleTax:number;
Quantity:number;
Amount:number;
Discount:number;
TaxableAmount:number;
TaxAmount:number;
NetValue:number;
Item_Discount_Amount:number;
PurchaseRate:number;
Unit_Discount:number;
  SaleRate: any;
  Availability:number;
  Item_Code:string;
  Stock_Id:number;
Stock:number;
Description:string;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

