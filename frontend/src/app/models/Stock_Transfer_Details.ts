export class Stock_Transfer_Details
{
Sales_Details_Id:number;
Sales_Master_Id:number;
Stock_Id:number;
Stock_Details_Id:number;
Item_Id:number;
Item_Name:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
PurchaseRate:number;
SaleRate:number;
Stock_From_Id:number;
Stock_To_Id:number;
Stock_From_Name:string;
Stock_To_Name:string;
MRP:number;
HSNCODE:string;
SaleTax:number;
CGST:number;
SGST:number;
IGST:number;
Barcode:string;  
HSN_Id:number;
Quantity:number;
//Client_Accounts_Name:string;
// Is_Expiry:Boolean;
// Expiry_Date:Date;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

