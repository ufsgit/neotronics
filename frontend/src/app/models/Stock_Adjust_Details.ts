
import { Item } from './Item';
export class Stock_Adjust_Details
{
    Stock_Adjust_Details_Id:number;
    Stock_Adjust_Master_Id:number;
ItemId:number;
Barcode:string;
ItemName:string;
Item_Code:string;
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
SaleTax:number;
Quantity:number;
Expiry_Date:Date;
Is_Expiry:boolean;
Stock_Details_Id:number;
To_Employee_Id:number;
Client_Accounts_Name:string;
Client_Accounts_Id :number;
UnitPrice:number;
ItemCode:string;
Country_Id:number;
Country_Name:string;
Items :number;
Items_Name:string
Description: string;
Amount: number;
Discount:number;
Purchase_Rate:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

