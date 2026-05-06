import { packinglist_details } from "./packinglist_details";

export class packinglist_master
{
    PackingList_Master_Id:number;
    PackingList_No:number
    POnumber:string;
    Invoice_No:number;
    EntryDate:string;
    Consignee_Name:string;
    Consignee_Address:string;
    Total_No_Of_Boxes:string;
    Box_Details:string;
    Total_Weight:string;
PrintDate:string;
    packinglist_details:packinglist_details[];

    TotalAmount:number;
    Basic_Discount:number;
    Discount_Description:number;
    Additional_Discount:number;

    TotalDiscount:number;
    Charge1per:number;
    charge1_Amount:number;
    VAT_Amount:number;
    VAT_Percentage:number;
    Total_Amount:number;
    NetTotal:number;
    Amount_In_Words:string;
    Total:number;
    Roundoff_Amt:number;
    charge2_Amount:number


    Customer_Name:string;
Customer:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Vatin:string;
PinCode:string;
Mobile:string;
Delivery_Address1 : string; 
Delivery_Address2 : string;
Delivery_Address3 : string;
Delivery_Address4 : string;
CurrencyId:number;

KindAttend: any;
KindAttendId:number;
Description2:string;
Brand:string;
PriceBasis:string;
PaymentTerms:string;
PaymentTermValue:number;
Payment_Term_Description:number;
Delivery:string;
Validity:string;
Description1:string;
Account_Party_Id:number;
User_Id:number;
AttendEmployee:string;

/*** Added on 16-10-2024 */

SalesQuotationMaster_Id: number;

/** Added on 26-10-2024 */

/** Added on 7-11-2024 */

GSTNo: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

