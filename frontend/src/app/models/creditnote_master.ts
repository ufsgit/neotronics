import { creditnote_details } from "./creditnote_details";

export class creditnote_master
{
CreditNote_Master_Id:number;
Account_Party_Id:number;
EntryDate:string;
Invoice_No:number;;
InvNo:number;
LPONo:string;
DONo:string;
PrintDate:string;
PackingListNumber:number;
CurrencyId:number;
TypeId:number;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
VatAmount:number;
Total_Amount:number;
Roundoff_Amt:number;
PaymentTermValue:any;
NetTotal:number;
Credit_Note_Image:string;
Makes:string;
PriceBasis:string;
Description1:string;
User_Id:number;
Delivery_Address1:string;
Delivery_Address2:string;
Delivery_Address3:string;
Delivery_Address4:string;
KindAttend:string;
Charge1:string;
charge1_Amount:number;
Charge2:string;
charge2_Amount:number;
Discount_Description:string;
Additional_Discount:number;
Description2:string;
Employee:string;
Basic_Discount:any;
Amount_In_Words:string;
Notes:string;
Charge1per:string;
Payment_Term_Description:number;
VAT_Description:string;
VAT_Percentage:number;
VAT_Amount:number;
New_Entry:string;
Customer_Reference:string;
SupplyDate:string;
DueDate:string;
Debit_Node_Image:string;
CurrecnyName:string;
UserName:string;
Customer_Name:string;
Customer:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Mobile:string;
PinCode:string;
creditnote_details:creditnote_details[];
AttendEmployee:string;
PaymentTerms:string;
GSTNo: string;
RoundOff:number;
DeliveryOrderMaster_Id:number;
SalesQuotationMaster_Id:number;
GrandTotal:number;
Vatin:string;

Sales_Master_Id:number;
SaleInvoiceNo:string;

printDate: string;
supplyPrintDate: string;
duePrintDate: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

