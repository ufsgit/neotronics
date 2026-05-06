
import {User_Menu_Selection} from './User_Menu_Selection';
export class User_Details
{
User_Details_Id:number;
User_Details_Name:string;
Password:string;
Working_Status:string;
Working_Status_Id:number;
User_Type:number;
Role_Id:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Mobile:string;
Email:string;
Employee_Id:number;
Client_Accounts_Name:string;

// 12-02-2024
Branch_Id:number;
Branch_Name:string;
/*************/


User_Menu_Selection_Data:User_Menu_Selection[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

