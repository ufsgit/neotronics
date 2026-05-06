export class Account_Group
{
Account_Group_Id:number;
Primary_Id:number;
Group_Code:string;
Group_Name:string;
Link_Left:number;
Link_Right:number;
Under_Group:number;
UnderGroup:string;
IsPrimary:string;
CanDelete:string;
UserId:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

