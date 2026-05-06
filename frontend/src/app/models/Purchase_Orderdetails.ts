export class Purchase_Orderdetails
{
    Purchase_OrderDetails_Id:string;
    Purchase_OrderMaster_Id:number;

    GrandTotal:number
    Stock:number;
ItemId:number;
Item_Code:string;
ItemCode:string;
Barcode:string;
ItemName:string;
GroupId:number;
GroupName:string;
UnitId:number;
NetTotal: number;
UnitName:string;
StockId:number;
Stock_Id:number;
PurchaseRate:number;
SaleRate:number;
UnitPrice:number;
Amount:number;
MRP:number;
Sale_Tax:number;
TaxableAmount:number;
TaxAmount:number;
// Availability:string;
Unit_Discount:number;
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
Expiry_Date:Date;
Is_Expiry:boolean;
Quantity_Kg:number;
    TotalAmount: number;
    Description: string;
    Availability :number;
    Country_Id : number;
    Country_Name: string;
    Item_Discount_Amount:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

