import { Purchase_Details } from "./Purchase_Details";

export class Purchase_Master
{
Purchase_Master_Id:number;
Account_Party_Id:number;
Client_Accounts_Name:string;
Entry_Date:Date;
PurchaseDate:string;
Ponumber:string;
InvoiceNo:string;
Currency_Id:number;
Brand:string;
PriceBasis:string;
PaymentTerms:string;
Payment_Term_Description:number;
Description1:string;
Discount_Description:string;
Charge1:string;
Charge2:string;
VAT_Percentage:number;
Additional_Discount:number;
charge1_Amount:number;
charge2_Amount:number;
VAT_Amount:number;
Roundoff_Amt:number;
Amount_In_Words:string;
Description2:string;
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
BillType:number;
BillType_Name:string;
User_Id:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Vatin:string;
Customer:string;
Customer_Name:string;
Mobile:string;
PinCode:string;
Description:string;
Purchase_Details:Purchase_Details[];
Conversion:number;
VAT_Description:string;
Transportation_Charge :number;
Handling_Charge :number;
Isgst :boolean;
Transportation_Gst :number;
Handling_Gst :number;
Transportation_Total :number;
Handling_Total :number;
Document_Name:string
File_Name:string
Item_Group_Id:number;
Item_Group_Name:string
Branch_Name:string;
TypeId:number;

/*** Added on 08-05-2024 ***/

filepath: string;

/*** Added on 09-05-2024 ***/
Branch_Id :number;

/*** Added on 23-10-2024 */

CurrencyId : number;
PaymentTermValue: number;

/** Added on 26-10-2024 */
PrintDate: string;

/** Added on 9-11-24 */
GSTNo: string;

/*** Added on 23-11-2024 */

Purchase_OrderMaster_Id: number;

Supplier_Ref_No: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

