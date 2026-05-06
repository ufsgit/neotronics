export class Cheque_Leaves
{
Cheque_Leaves_Id :number;  
Cheque_Book_Id :number; 
Cheque_No :number;  
Status :string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

