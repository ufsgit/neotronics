
import { Receipt_Reference } from '../models/Receipt_Reference'

export class Receipt_Voucher
{
Receipt_Voucher_Id:number;
Date:Date;
Entry_Date:Date;
Voucher_No:number;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
Sales_Master_Id:number;
Payment_Mode:number;
Mode:string;
User_Id:number;
User_Name : string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
GSTNo:string;
PinCode:string;
Mobile:string;
Description:string;
Payment_Mode_Name:string;
CurrencyId:number;
Payment_Status:number;
FromAccount_Name:string;
Receipt_No:any;
ToAccount_Name: string;
Employee_Id:number;
Employee_Name:string;
Sales_Receipt:any;
Print_Caption_Id:number;
Customer_Name:string;
Receipt_Reference: Receipt_Reference[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

