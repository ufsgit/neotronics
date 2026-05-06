
import { Stock } from '../models/Stock';

export class Item_Group_Sale
{
    Item_Group_Sale_Id:number;
    Item_Group_Sale_Name:string;
    Stock:Stock[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

