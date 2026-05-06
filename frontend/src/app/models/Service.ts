import { Service_Details } from "./Service_Details";

export class Service
{
Service_Id:number;
Account_Party_Id:number;
Client_Accounts_Name:string;
Entry_Date:Date;
InvoiceNo:string;
GrossTotal:number;
TotalGST:number;
TotalCGST:number;
TotalSGST:number;
TotalIGST:number;
NetTotal:number;
Tot_Cess:number;

    TotalDiscount:number;
    TaxableAmount:number;
    Roundoff:number;
TotalAmount:number;
User_Id:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Customer:string;
Mobile:string;
Description:string;
BillType:number;
Service_Details:Service_Details[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

