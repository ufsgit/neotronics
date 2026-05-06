export class salesquotationdetails
{
SalesQuotationDetails_Id:number;
QuotationMaster_Id:number;
ItemId:number;
ItemCode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
HSNMasterId:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
UnitPrice:number;
Quantity:number;
Amount:number;
Discount:number;
TaxableAmount:number;
TaxAmount:number;
NetValue:number;
Availability:string;
Item_Discount_Amount:number;
Unit_Discount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

