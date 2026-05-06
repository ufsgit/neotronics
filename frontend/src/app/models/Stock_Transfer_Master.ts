import { Stock_Transfer_Details } from '../models/Stock_Transfer_Details';
export class Stock_Transfer_Master
{
Stock_Transfer_Master_Id:number;
Entry_Date:Date;
User_Id:number;
Voucher_No:number;
Description:string;
Stock_Transfer_Details:Stock_Transfer_Details[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

