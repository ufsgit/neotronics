export class Damage_Details
{
Damage_Details_Id:number;
Damage_Master_Id:number;
ItemId:number;
Barcode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
PurchaseRate:number;
SaleRate:number;
MRP:number;
HSNMasterId:number;
HSNCODE:string;
Quantity:number;
CGST:number;
SGST:number;
Amount: number;
GST: number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

