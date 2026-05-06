export class debitnote_details
{
DebitNote_Details_Id:number;
DebitNote_Master_Id:number;
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
Sale_Tax:number;
Stock:number;
GrossValue:number;
TotalAmount: number;
Item_Code: string;
Barcode:string;
SaleRate:number;
CGST:number;
CGST_AMT:number;
SGST:number;
SGST_AMT:number;
IGST:number;
IGST_AMT:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

