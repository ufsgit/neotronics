
export class Stock_Take_Details
{
Stock_Take_Details_Id:number;
Stock_Take_Master_Id:number;
ItemId:number;
Barcode:string;
ItemName:string;
Item_Code:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
Stock_Id:number;
PurchaseRate:number;
SaleRate:number;
HSNMasterId:number;
HSNCODE:string;
SaleTax:number;
Quantity:number;
Country_Id:number;
Country_Name:string;
Amount: number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

