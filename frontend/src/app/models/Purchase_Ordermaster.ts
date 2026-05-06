import { Purchase_Orderdetails } from "./Purchase_Orderdetails";

export class Purchase_Ordermaster
{
Purchase_OrderMaster_Id:number;
EntryDate:any;
Payment_Term_Description:number;
Total:number;
PurchaseOrderMaster_Id: number;
Account_Party_Id:number;
Client_Accounts_Name:string;
Entry_Date:Date;
PurchaseDate:Date;
OrderNumber:number;
CurrencyId:number;
AccountType_Id:number;
Brand:string;
PriceBasis:string;
PaymentTerms:string;
Delivery:string;
Validity:string;
Description1:string;
Discount_Description:string;
Charge1:string;
Charge1per:string;
Charge2:string;
PreparedBy:string;
VAT_Percentage:number;
VAT_Amount:number;
// Delivery:string;
// Validity:string;
Profoma_Invoice_image:string;
CurrecnyName:string;
UserName:string;
POnumber:number;
AttendEmployee:string;
InvoiceNo:number;
// Brand:string;
AccountType_Name:string;
// AccountType_Id:number;
GrandTotal:number
Customer:string;
BillType:number;
charge2_Amount:number;
Total_Amount:number;
Roundoff_Amt:number;
Amount_In_Words:string;
Basic_Discount:number;

Discount:number;
Roundoff:number;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
TotalGST:number;
TotalCGST:number;
TotalSGST:number;
TotalIGST:number;
Other_Charges:number;
GrossTotal:number;
NetTotal:number;
charge1_Amount:number;
BillType_Name:string;
User_Id:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Vatin:string;
PinCode:string;
Additional_Discount:number;
Mobile:string;
Description:string;
Purchase_Orderdetails:Purchase_Orderdetails[];
KindAttend: any;
Transportation_Charge :number;
Handling_Charge :number;
Isgst :boolean;
Transportation_Gst :number;
Handling_Gst :number;
Transportation_Total :number;
Handling_Total :number;
Delivery_Address1:string;
Delivery_Address2:string;
Delivery_Address3:string;
Delivery_Address4:string;
Description2:string;
PaymentTermValue: number;
Customer_Reference: string;

    Customer_Name: string;

/*** Added on 19-10-2024 */

TypeId: number;

/** Added on 26-10-2024 */

PrintDate: string;

/** Added on 8-11-24 */

GSTNo : string;

SalesQuotationMaster_Id: number;
Supplier_Ref_No: string;
DeliveryDate: any;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

