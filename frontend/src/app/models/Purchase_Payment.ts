export class Purchase_Payment
{
Purchase_Payment_Id:number;
Payment_Voucher_Id:number;
Purchase_Master_Id :number;
Account_Party_Id:number;
Paying_Amount :number;
Check_Box:boolean;
Discount:number;
NetTotal:number;
Date:Date;
BalAmt:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

