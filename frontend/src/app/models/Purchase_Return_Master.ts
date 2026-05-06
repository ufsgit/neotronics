import { Purchase_Return_Details } from "./Purchase_Return_Details";
export class purchase_return_master
{
Purchase_Return_Master_Id:number;
Purchase_Master_Id:number;
Account_Party_Id:number;
Entry_Date:any;
PurchaseDate:any;
Purchase_Return_No:string;
InvoiceNo:string;
Currency_Id:number;
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
Payment_Term_Description:number;
Delivery:string;
Validity:string;
Description1:string;
User_Id:number;
KindAttend:string;
Charge1:string;
charge1_Amount:number;
Charge2:string;
charge2_Amount:number;
Discount_Description:string;
Additional_Discount:number;
Description2:string;
Employee:string;
Basic_Discount:string;
Amount_In_Words:string;
Ponumber:string;
Conversion:number;
VAT_Description:string;
VAT_Percentage:number;
VAT_Amount:number;
Roundoff_Amt:number;
Purchase__Return_Invoice_Image:string;
UserName:string;
CurrecnyName:string;
Purchase_Return_Details_Id:number;
Discount:number;
Roundoff:number;
GrossTotal:number;
BillType:number;
Description:string;
Address1:string;
Address2:string;
Address3: string;
Bill_No:string;
Address4:string;

Purchase_Return_Details:Purchase_Return_Details[];

/*** Added on 24-10-2024 */
PaymentTermValue: number;
/*** Added on 26-10-2024 */
PrintDate: string;
/** Added on 9-11-24 */
GSTNo: string;
Customer:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

