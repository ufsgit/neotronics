import { performainvoicedetails } from "./performainvoicedetails";

export class performainvoicemaster
{
PerformaInvoiceMaster_Id:number;
Account_Party_Id:number;
// EntryDate:string;

EntryDate:string;
Payment_Term_Description:number;
Total:number;
PerformaInvNo:string;
LPONo:string;
CurrencyId:number;
TypeId:number;
PaymentTerms:String;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
VatAmount:number;
Total_Amount:number;
NetTotal:number;
Roundoff_Amt:number;
Makes:string;
PriceBasis:string;
Description1:string;
User_Id:number;
Company_Id: number;
KindAttend:string;
Charge1:string;
charge1_Amount:number;
Charge2:string;
charge2_Amount:number;
Discount_Description:string;
Additional_Discount:number;
Description2:string;
Basic_Discount:number;
Amount_In_Words:string;
PreparedBy:string;
Charge1per:string;
// Payment_Term_Description:number;
VAT_Description:string;
VAT_Percentage:number;
VAT_Amount:number;
Delivery:string;
Validity:string;
Profoma_Invoice_image:string;
CurrecnyName:string;
UserName:string;
POnumber:number;
AttendEmployee:number;
InvoiceNo:string;
Brand:string;
AccountType_Name:string;
AccountType_Id:number;
GrandTotal:number
Customer:string;
BillType:number;
PaymentTermValue:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Vatin:string;
Mobile:string;
PinCode:string;

performainvoicedetails :performainvoicedetails[];
    Customer_Name: string;

/*** Added on 16-10-2024 */

PrintDate: string;

SalesQuotationMaster_Id: number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

