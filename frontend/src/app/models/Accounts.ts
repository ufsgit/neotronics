export class Accounts
{
Accounts_Id:number;
Entry_Date:string;
Client_Id:number;
Dr:number;
Cr:number;
X_Client_Id:number;
Tran_Type:string;
Tran_Id:number;
Voucher_No:string;
VoucherType:string;
Description1:string;
Status:string;
DayBook:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

