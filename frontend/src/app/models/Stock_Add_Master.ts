import { Stock_Add_Details } from "./Stock_Add_Details";

// import { Stock_Add_Details } from '../models/Stock_Add_Details';
export class Stock_Add_Master
{
    Stock_Add_Master_Id:number;
EntryDate:any;
Description1:string;
User_Id:number;
Stock_Add_Details:Stock_Add_Details[];

File_Path: string;
Doc_Photo:any;
File_Name: string;
ImageFile_Doc: any;

/** Added on 08-08-2024 */
Description: string;



constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

