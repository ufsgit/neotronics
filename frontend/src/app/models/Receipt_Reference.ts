export class Receipt_Reference
{
Receipt_Voucher_Reference_Id:number;
Payment_Voucher_Id:number;
Master_Id:number;
Amount:number;
Check_Box:boolean;
Receiving_Amount:number;
Date:Date;
InvoiceNo:string;
Voucher_Type_Id:number;
Voucher_Type_Name:string;
Discount:number;
BalAmt:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

