export class Cheque_Book
{
Cheque_Book_Id:number;
Bank_Id :number;
Book_No :string;
From_No :number;
Total_Leaves :number;
To_No :number;
User_Id :number;
    Bank_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

