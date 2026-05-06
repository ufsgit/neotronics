export class Payment_Reference
{
Payment_Reference_Id:number;
Payment_Voucher_Id:number;
Master_Id:number;
Amount:number;
Paying_Amount :number;
Check_Box:boolean;
InvoiceNo:string;
PurchaseDate:string;
Voucher_Type_Id:number;
Voucher_Type_Name:string;
Discount:number;
BalAmt:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

