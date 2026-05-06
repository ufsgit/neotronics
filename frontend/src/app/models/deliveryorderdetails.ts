export class deliveryorderdetails
{
DeliveryOrderDetails_Id:number;
DeliveryMaster_Id:number;
ItemId:number;
Item_Code:string;
ItemCode: string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
UnitPrice:number;
MRP:number;
PurchaseRate:number;
Stock:number; 
Sale_Tax: number;

HSNMasterId:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
SaleTax:number;
Quantity:number;
Amount:number;
Discount:number;
TaxableAmount:number;
TaxAmount:number;
NetValue:number;
Unit_Discount:number;
Expiry_Date:Date;

Item_Discount_Amount:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

