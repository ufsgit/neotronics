

import { NumberReference } from "aws-sdk/clients/connect";
import { Payment_Reference } from "./Payment_Reference"; 
export class Payment_Voucher
{
Payment_Voucher_Id:number;
Entry_Date:Date;
Date:Date;
Voucher_No:number;
From_Account_Id:number;
From_Account:string;
Amount:number;
To_Party:any;
Mode:string;
To_Account_Id:number;
Payment_Mode:number;
To_Party_Id:number;
User_Id:number;
Description:string;
Payment_Status:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
GSTNo:string;
PinCode:string;
Mobile:string;
FromAccount_Name:string;
ToAccount_Name:string;
Payment_Reference:Payment_Reference[];
Payment_Mode_Name:string;
CurrencyId:number;
Customer_Name:string;
// Purchase_Payment_Value:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

