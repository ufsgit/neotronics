export class Stock
{
Stock_Id:number;
ItemId:number;
Item_Code:string;
ItemCode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
PurchaseRate:number;
SaleRate:number;
MRP:number;
HSNMasterId:number;
HSNCODE:string;
SaleTax:number;
Quantity:number;
CGST:number;
SGST:number;
IGST:number;
Is_Expiry:Boolean;
Expiry_Date:Date;
Barcode:string;
Availability:number;
Country_Id : number;
Country_Name: string;
StockId:number;
Model_Name: string;
Brand_Name: string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

