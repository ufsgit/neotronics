 

export class Brand
{
Brand_Id:number;
Group_Id:number;
Group_Name:string;
Saleunit_Id:number;
Saleunit_Name:string;
Brand_Code:string;
Brand_Name:string;
Item_Id:number;
Item_Name:string;
Sales_Tax:number;
HSNMasterId:number;
CGST:number;
SGST:number;
IGST:number;
HSNCODE:string;
Country_Id:number;
Country_Name:string;
Is_Update:boolean;
Checkbox:boolean; 
    Under_Brand_Id: number;
    Under_Brand_Name: string;
    under_brand_Id: number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

