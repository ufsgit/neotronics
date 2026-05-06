export class Service_Details
{
Service_Details_Id:number;
Service_Id:number;
Service_Type_Id:number;
    Service_Type_Name:string;
Hsn_Id:number;
Hsn_Name:string;
GST:number;
GST_Amount:number;
GrossValue:number
NetValue:number;
CGST:number;
CGST_AMT:number;
SGST:number;
SGST_AMT:number;
IGST:number;
IGST_AMT:number;
TotalAmount:number;
    Cesspers:number;
    CessAmt:number;
    Description:string;
    Unit_Price:number;
    Quantity:Number;
    Discount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

