export class Key_Value
{
    Key_Value_Id :number;
    Key_Value_Name :string;
    Key_Value_Data :string;
    Group_Id :number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

