export class Stock_Details
{
Stock_Details_Id:number;
Stock_Id:number;
To_Employee_Id:number;
Quantity:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

