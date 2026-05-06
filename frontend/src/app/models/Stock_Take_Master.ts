import { Stock_Take_Details } from "./Stock_Take_Details";

// import { Stock_Add_Details } from '../models/Stock_Add_Details';
export class Stock_Take_Master
{
Stock_Take_Master_Id:number;
EntryDate:any;
Description:string;
User_Id:number;
User_Name:string;
Stock_Take_Name_Id:number;
Stocktakename:string;
Stock_Take_Details:Stock_Take_Details[]
/** Added on 08-08-2024 */

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

