export class purchaseorderdetails
{
PurchaseOrderDetails_Id:number;
PurchaseOrderId:number;
ItemId:number;
ItemCode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
SaleRate:number;
UnitPrice:number;
MRP:number;
SaleTax:number;
HSNMasterId:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
Quantity:number;
Amount:number;
Discount:number;
TaxableAmount:number;
TaxAmount:number;
NetValue:number;
Item_Discount_Amount:number;
Unit_Discount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

