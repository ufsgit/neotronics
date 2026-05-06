export class Service_Type
{
Service_Type_Id:number;
Service_Type_Name:string;
    Hsn_Id :number;
    Hsn_Name :string;
    CGST :number;
    SGST :number;
    IGST :number;
    GST: number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

