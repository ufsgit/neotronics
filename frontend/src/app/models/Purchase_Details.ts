export class Purchase_Details
{
Purchase_Details_Id:number;
Purchase_Master_Id:number;
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
Include_Tax:number;
SaleTax:number;
GST_Amount:number;
Quantity:number;
Stock_Details_Id:number;
To_Employee_Id:number;
To_Stock_Name:string;
GrossValue:number;
Discount:number;
NetValue:number;
CGST:number;
CGST_AMT:number;
SGST:number;
SGST_AMT:number;
IGST:number;
IGST_AMT:number;
TaxAmount:number;
UnitPrice:number;
Unit_Discount:number;
Amount:number;
Sale_Tax:number;
TaxableAmount:number;
Expiry_Date:Date;
Is_Expiry:boolean;
Quantity_Kg:number;
TotalAmount: number;
Description: string;
Item_Code:string;
Country_Id:number;
Country_Name:string;
Item_Discount_Amount:number;
Stock_Id: number;
ItemCode: string;
Availability:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

