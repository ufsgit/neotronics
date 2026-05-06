export class Production_Sub_Master
{
    Prodcution_Details_Id: number;
    Prodution_Master_Id: number;
    Stock_Id: number;
    Item_Id: number;
    Item_Name: string;
    Quanity: number;
    PurchaseRate: number;
    SaleRate: number;
    MRP: number;
    HSN_Id: number;
    HSN_Code: string;
    CGST: number;
    SGST: number;
    GST: number;
    Group_Id: number;
    Group_Name: string;
    Unit_Id: number;
    Unit_Name: string;
    Item_Percentage: Number;
    Total_Used: number;

    Production_Sub_Id: number;
    // Production_Details_Id: number;
    Stock_Id_p: number;
    Item_Id_p: number;
    Item_Name_p: string;
    Quanity_p: number;
    SaleRate_p: number;
    Include_Tax: number;
    Amount: number;
    CGSTAMT: number;
    SGSAMT: number;
    GSTAMT: number;
    TOTAL: number;
    HSN_Id_p: number;
    HSN_Code_p: string;
    CGST_p: number;
    SGST_p: number;
    GST_p: number;
    Group_Id_p: number;
    Group_Name_p: string;
    Unit_Id_p: number;
    Unit_Name_p: string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

