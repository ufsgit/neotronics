export class salesordermaster
{
SalesOrderMaster_Id:number;
Account_Party_Id:number;
EntryDate:string;
SalesDate:string;
SalesOrderNo:string;
QuotationNo:string;
CurrencyId:number;
TypeId:number;
PaymentTerms:string;
AttendEmployee:string;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
VatAmount:number;
NetTotal:number;
Brand:string;
PriceBasis:string;
Delivery:string;
Validity:string;
Description1:string;
User_Id:number;
Sales_Order_Image:string;
UserName:string;
CurrecnyName:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

