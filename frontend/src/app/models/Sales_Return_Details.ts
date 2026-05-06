export class Sales_Return_Details
{
Sales_Return_Details_Id:number;
Sales_Return_Master_Id:number;
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
Barcode:string;
SaleRate:number;
Stock:number;
Stock_Id:number;
Sale_Tax: number;
TotalAmount:number;
Description:string;
Availability: string;
Item_Code: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

