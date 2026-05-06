export class performainvoicedetails
{
PerformaInvoiceDetails_Id:number;
PerformaMaster_Id:number;
ItemId:number;
Item_Code:string;
Purchase_Rate:number;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
StockId:number;
UnitPrice:number;
MRP:number;
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
Item_Discount_Amount:number;
Unit_Discount:number;
Availability:Number;
Sale_Tax: number;
Stock:number;
PurchaseRate:number;
SaleRate:number;
Barcode:string;
Stock_Id:number;
TotalAmount:number;
GrossValue:number;
Expiry_Date:Date;


// Availability:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

