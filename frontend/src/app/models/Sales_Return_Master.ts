import { Sales_Return_Details } from "./Sales_Return_Details"; 
export class Sales_Return_Master
{
Sales_Return_Master_Id:number;
Sales_Master_Id:number;
Account_Party_Id:number;
EntryDate:any;
InvNo:string;
Sales_Return_InvNo:string;
LPONo:string;
DONo:string;
PackingListNumber:number;
CurrencyId:number;
TypeId:number;
PaymentTerms:string;
TotalAmount:number;
Total:number;
TotalDiscount:number;
TaxableAmount:number;
VatAmount:number;
Total_Amount:number;
Roundoff_Amt:number;
NetTotal:number;
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
Basic_Discount:number;
Amount_In_Words:string;
Notes:string;
Charge1per:string;
Payment_Term_Description:number;
VAT_Description:string;
VAT_percentage:number;
VAT_Amount:number;
New_Entry:string;
Customer_Reference:string;
SupplyDate:string;
DueDate:string;
Sales_Return_InvImgage:string;
UserName:string;
CurrecnyName:string;
Sales_return_InvNo:number;
Bill_Date:any;
Invoice_No:string;
GrossTotal:number;

TotalCGST:number;
ToalSGST:number;
TotalIGST:number;
TotalGST:number;
Cess:number;
RoundOff:number;

Address1:string;
Address2:string;
Address3:string;
Address4:string;
Mobile:string;
Customer_Name:string;
PinCode:string;
GSTNo:string;    
GrandTotal:number;

Transportation_Charge:number;
Handling_Charge:number;
Isgst:Boolean;
Transportation_Gst:number;
Handling_Gst:number;
Transportation_Total:number;
Handling_Total:number;
Vehicle_No:string;
Driver_Name:string;
Mobile_No:string;
Customer:string;
BillType:number;
Sales_Return_Details:Sales_Return_Details[];
AttendEmployee:string;
FormattedEntryDate: any;

/** Added on 21-10-2024 */

PaymentTermValue: number;

/** Added on 31-10-2024 */

PrintDate: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

