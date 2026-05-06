import { Item_Group } from "./Item_Group";

export class Item
{
Item_Id:number;
Group_Id:number;
Group_Name:string;
Saleunit_Id:number;
Saleunit_Name:string;
Item_Code:string;
Item_Name:string;
Sales_Tax:number;
HSNMasterId:number;
CGST:number;
SGST:number;
IGST:number;
// New tax/rate fields (DB columns: gst, cgst, sgst, igst, b2b_rate, b2c_rate)
gst:number;
cgst:number;
sgst:number;
igst:number;
b2b_rate:number;
b2c_rate:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
Is_Update:boolean;
Checkbox:boolean;
Item_Group_Data:Item_Group[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

