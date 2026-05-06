export class General_Settings
{
General_Settings_Id:number;
Invoice_No:number;
Purchase_Retrun_No:number;
Sales_Return_No:number;
Damage_No:number;
Contra_Voucher_No:number;
Journal_Voucher_No:number;
Receipt_Voucher_No:number;
Payment_Voucher_No:number;
Cess :number;
Voucher_No :number;
Barcode:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

