import { Stock_Adjust_Details } from "./Stock_Adjust_Details";

// import { Stock_Add_Details } from '../models/Stock_Add_Details';
export class Stock_Adjust_Master
{
Stock_Adjust_Master_Id:number;
EntryDate:any;
Description1:string;
User_Id:number;
Stock_Adjust_Details:Stock_Adjust_Details[]
Description: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

