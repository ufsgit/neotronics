export class salesorderdetails
{
SalesOrderDetails_Id:number;
OrderMaster_Id:number;
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
HSNCODE:number;
SaleTax:number;
Quantity:number;
Amount:number;
Discount:number;
TaxableAmount:number;
TaxAmount:number;
NetValue:number;
Avalilability:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

