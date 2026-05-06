import { deliveryorderdetails } from './deliveryorderdetails';

interface PONumber 
    {
        InvoiceNo: any; // Replace `any` with the specific type, e.g., `string` or `number`
        PurchaseOrderMasterId: any; // Replace `any` with the specific type
    }
export class deliveryordermaster
{
DeliveryOrderMaster_Id:number;
Account_Party_Id:number;
EntryDate:string;
DONo:string;
CurrencyId:number;
TypeId:number;
PaymentTerms:string;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
VatAmount:number;
NetTotal:number;
Makes:string;
PriceBasis:string;
Description1:string;
User_Id:number;
Delivery_Address1:string;
Delivery_Address2:string;
Delivery_Address3:string;
Delivery_Address4:string;
Kind_Attend:any;
Payment_Term_Description:number;
Deliver_Order_Image:string;
CurrecnyName:string;
UserName:string;
Basic_Discount:number;
Discount_Description:number;
Additional_Discount:number;
Charge1per:number;
charge1_Amount:number;
VAT_Amount: number;
AccountType_Name:string;
VAT_Percentage:number;
Total_Amount:number;
Amount_In_Words:string;
charge2_Amount:number;
Roundoff_Amt:number;
/*** account group id is same as client accounts id for client accounts table. */

/** Added on 13-09-2024 */
payment_Term_ID: number;
payment_Term_Value: number;

/** Added on 17-09-2024  */
Received_By: string;
Delivery_Order_Details:deliveryorderdetails[];
Client_Accounts_Name: string;

/*** Added on 19-09-2024 */
Customer: string;
Address1: string;
Address2: string;
Address3: string;
Address4: string;
Mobile:string;
PinCode:string;
CurrencyName:string;
Vatin:string;
/*** Added on 20-09-2024 */

LPONo = [];
    Customer_Name: string;


/*** Added on 15-10-2024  */

SalesQuotationMaster_Id: number;

/*** Added on 15-10-2024 */

Sales_Master_Id: number = 0;

/*** Added on 25-10-2024 */

PrintDate: string;

/*** Added on 31-10-2024 */

LPONo1: string;

/*** Added on 07-11-2024 */

GSTNo: string;
Description2:string;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

