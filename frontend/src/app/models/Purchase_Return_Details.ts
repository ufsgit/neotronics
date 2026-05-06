export class Purchase_Return_Details
{
Purchase_Return_Details_Id:number;
Purchase_Return_Master_Id:number;
ItemId:number;
ItemCode:string;
Item_Code:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
UnitPrice:number;
HSNMasterId:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
Quantity:number;
Amount:number;
Discount:number;
NetValue:number;
Item_Discount_Amount:number;
Unit_Discount:number;
TaxableAmount:number;
TaxAmount:number;
SaleTax:number=0;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

