export class Contra_Entry
{
Contra_Entry_Id:number;
Date:Date;
Voucher_No:number;
From_Account_Id:number;
FromAccount_Name:string;
ToAccount_Name:string;
Amount:number;
To_Account_Id:number;
PaymentModeName:string;
PaymentMode:number;
User_Id:number;
Description:string;
Payment_Status:Number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

