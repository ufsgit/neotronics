export class Journal_Entry
{
Journal_Entry_Id:number;
Date:string;
Voucher_No:number;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
PaymentMode:number;
User_Id:number;
Payment_Status:number;
Description:string;
From_Detail:String;
To_Detail:string;
FromAccount_Name:string;
ToAccount_Name:string;
AccountType_Id:number;
CurrencyId:number;
Invoice_no:string;
Notes:string;
PaymentTermValue:string;
Payment_Term_Description:string;
PaymentTerms:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

