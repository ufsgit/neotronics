export class Production_Sub {
    Production_Sub_Id:number;
    Prodcution_Details_Id : number;
    Prodution_Master_Id :number;
    Stock_Id : number;
    Item_Id : number;
    Item_Name: string;
    Quanity: number;
    SaleRate: number;
    Include_Tax: number;
    Amount: number;
    CGSTAMT: number;
    SGSAMT: number;
    GSTAMT: number;
    TOTAL: number;
    HSN_Id : number;
    HSN_Code: string;
    CGST: number;
    SGST: number;
    GST: number;
    Group_Id : number;
    Group_Name: string;
    Unit_Id : number;
    Unit_Name: string;
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}