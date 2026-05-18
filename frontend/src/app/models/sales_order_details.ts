export class sales_order_details
{
Sales_Order_Details_Id:number;
Sales_Order_Master_Id:number;
Stock_Id:number;
ItemId:number;
ItemName:string;
Barcode:string;
GroupId:number;
GroupName:string;
UnitId:number;
UnitName:string;
PurchaseRate:number;
SaleRate:number;
MRP:number;
//HSNId:number;
ItemCode:string;
HSNMasterId:number;
HSNCODE:string;
SaleTax:number;
UnitPrice:number;
Amount:number;
Unit_Discount:number;
TaxableAmount:number;
Quantity:number;
Discount:number;
NetValue:number;
TaxAmount:number;
Stock:number;
Description:string;
Item_Discount_Amount:number;
GSTA:number;
Model_Name:string;
Brand_Name:string;
    Country_Id: number;
    Country_Name: string;

    DeliveryOrderMaster_Id: number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}