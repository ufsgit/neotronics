import { Production_Materials } from '../models/Production_Materials';
import { Prodcution_Details } from '../models/Prodcution_Details';
import { Production_Sub_Master } from "./Production_Sub_Master";
export class Prodution_Master {
    Prodution_Master_Id: number;
    Date :Date;
    Labour_Charge: number;
    Additional_Expense: number;
    Production_No: string;
    UserId: number;
  //  Noof_Items:number;
    TotalAmount:number;
    Production_Materials: Production_Materials[];
    Prodcution_Details: Prodcution_Details[]
    Production_Sub_Master: Production_Sub_Master[]
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}