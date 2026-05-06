import { debitnote_details } from './debitnote_details';


export class debitnote_master
{
DebitNote_Master_Id:number;
Account_Party_Id:number;
EntryDate:string;
InvNo:string;
LPONo:string;
DONo:string;
PackingListNumber:number;
CurrencyId:number;
TypeId:number;
UnitPrice:number;

PaymentTerms:string;
TotalAmount:number;
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
// Basic_Discount:string;
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
Debit_Note_Image:string;
UserName:string;
CurrecnyName:string;

VAT_Percentage:number;
Basic_Discount:number;

/*** Added on 23-09-2024 */

debitnote_details:debitnote_details[];

payment_Term_ID: number;
payment_Term_Value: number;
    Customer_Name: string;
    Customer: string;
    

/*** Added on 9-11-24 */

PrintDate: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

