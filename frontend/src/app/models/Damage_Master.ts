
import { Damage_Details } from '../models/Damage_Details';

export class Damage_Master
{
Damage_Master_Id:number;
Date :Date; 
Damage_No :string;
User_Id:number;
    Damage_Details: Damage_Details[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

