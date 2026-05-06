import { Client_Accounts } from './Client_Accounts';
import { Location } from './Location';
import { Employee_Details } from './Employee_Details';
export class Employee_Master
{
Employee_Details:Employee_Details=new Employee_Details();
ClientAccounts:Client_Accounts=new Client_Accounts() ;
Location:Location[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

