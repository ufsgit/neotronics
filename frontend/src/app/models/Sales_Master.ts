import { Sales_Details } from '../models/Sales_Details';
export class Sales_Master
{

Sales_Master_Id:number;
Account_Party_Id:number;
User_Id:number;
Company_Id: number;
Bill_Date:Date;
EntryDate:string;
CurrencyId:number;
LPONo:string;
DONo:string;
Invoice_No:string;
PackingListNumber:string;
PaymentTerms:string;
Payment_Term_Description:number;
Discount_Description:string;
Charge1per:string;
Charge2:string;
VAT_percentage: number;
Additional_Discount:number;
TaxableAmount:number;
charge1_Amount:number;
charge2_Amount:number;
VAT_Amount:number;
Total_Amount:number;
Amount_In_Words:string;
Description2:string;
Roundoff_Amt:number;
GrossTotal:number;
TotalDiscount:number;
TypeId:number;
NetTotal:number;
TotalCGST:number;
ToalSGST:number;
TotalIGST:number;
TotalGST:number;
Cess:number;
Customer_Name:string;
Customer:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Vatin:string;
Mobile:string;
PinCode:string;
GSTNo:string;
RoundOff:number;
TotalAmount:number;
GrandTotal:number
BillType:number;
Bill_Type_Name:string;
Description1:string;
Sales_Details:Sales_Details[];
KindAttend: string;
Employee:string;
AttendEmployee:string;
Transportation_Charge :number;
Handling_Charge :number;
Isgst :boolean;
Transportation_Gst :number;
Handling_Gst :number;
Transportation_Total :number;
Handling_Total :number;
Vehicle_No: string;
Driver_Name :string;
Mobile_No: string;
PaymentTermValue:number;
Delivery_Address1 : string; 
Delivery_Address2 : string;
Delivery_Address3 : string;
Delivery_Address4 : string;
Bill_No : string;
Tax_Pers : number;
HSNCODE:string;
DueDate:any;
SupplyDate:any;
Basic_Discount:number;

/** Added on 15-10-2024 */
DeliveryOrderMaster_Id: number;
payment_Term_ID: number;
PerformaInvoiceMaster_Id:number;
/*** Added on 25-10-2024 */

PrintDate: string;
Sales_return_InvNo:number;

/** Added on 08-11-2024 */

DuePrintDate: string;
SupplyPrintDate: string;
Charge1: string;
SalesQuotationMaster_Id: number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}