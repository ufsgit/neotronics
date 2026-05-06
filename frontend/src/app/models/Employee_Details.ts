// import { Client_Accounts } from '../models/Client_Accounts';
// import { Location } from '../models/Location';

export class Employee_Details
{
Employee_Details_Id:number;
Client_Accounts_Id:number;
Level_Id:number;
DesigId:number;
DateOfBirth:Date;
DateOfJoin:Date;
ReleiveDate:Date;
WorkingStatus:number;
Locations:string;
Manager_Id:number;
Manager:string;
Is_SalesMan: boolean;
Can_Delete:boolean;
// ClientAccounts:Client_Accounts=new Client_Accounts() ;
// Location:Location[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

