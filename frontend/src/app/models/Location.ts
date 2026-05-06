export class Location
{
Location_Id:number;
Location_Name:string;
Check_Box:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

