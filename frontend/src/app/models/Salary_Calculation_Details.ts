export class Salary_Calculation_Details
{
Salary_Calculation_Details_Id:number;
Salary_Calculation_Master_Id:number;
Employee_Id:number;
Basic_Pay:number;
HRA:number;
Deduction:number;
Incentives:number;
Alowance:number;
AdditionalAmount:number;
TotalAmount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

