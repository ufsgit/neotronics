export class HSN
{
HSN_Id:number;
HSN_CODE:string;
CGST:number;
SGST:number;
IGST:number;
SaleTax:number;
Checkbox:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

