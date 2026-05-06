export class Employee_Location
{
Employee_Location_Id:number;
Location_Id:number;
Employee_Details_Id:number;
Location_Map:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

