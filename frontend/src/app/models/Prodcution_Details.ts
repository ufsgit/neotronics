
import { Production_Sub } from './Production_Sub';
export class Prodcution_Details {

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
    Item_Percentage:Number;
    Total_Used:number;

    Production_Sub: Production_Sub[]
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}