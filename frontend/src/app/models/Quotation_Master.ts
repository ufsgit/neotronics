import { Quotation_Details } from './Quotation_Details';
export class Quotation_Master
{
SalesQuotationMaster_Id: number;
Account_Party_Id:number;
    User_Id: number;
    Company_Id: number;
EntryDate:string;
QuotationNo:string;
CurrencyId:number;
POnumber:string;
AttendEmployee:string;
AttendEmployeeId:number
Reference:string;
GrossTotal:number;
TotalDiscount:number;
NetTotal:number;
TotalCGST:number;
ToalSGST:number;
TotalIGST:number;
TotalGST:number;
TaxableAmount:number;
Cess:number;
Customer_Name:string;
Customer:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Mobile:string;
PinCode:string;
GSTNo:string;
Vatin:string;
RoundOff:number;
TotalAmount:number;
GrandTotal:number
BillType:number;
Bill_Type_Name:string;
Description1:string;
Quotation_Details:Quotation_Details[];
Basic_Discount:number;
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

Delivery_Address1 : string; 
Delivery_Address2 : string;
Delivery_Address3 : string;
Delivery_Address4 : string;
Bill_No : string;
Tax_Pers : number;
HSNCODE:string;
No:string;
TotalC:string;
ToalS:string;
Brand:string;
PriceBasis:string;
PaymentTerms:string;
Delivery:string;
Validity:string;
Payment_Term_Description:number;
PreparedBy:string;
Charge1:string;
Description2:string;
VAT_Percentage:number;
Additional_Discount:number;
Total_Amount:number;
VatAmount:number;
charge1_Amount:number;
Charge1per:string;
Amount_In_Words:string;
Discount_Description:string;
charge2_Amount:number;
Roundoff_Amt:number;
    VAT_Amount: number;
    Charge2: string;
    KindAttend: any;
    KindAttendId:number;
    PaymentTermValue:number;
    PrintDate: string;
    Total_Quantity: number;
Supplier_Ref_No: string;

    Status: number;
    Status_Id: number;
    Status_Name: string;
    Email: string;
    WhatsApp: string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}