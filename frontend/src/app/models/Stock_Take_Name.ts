export class Stock_Take_Name
{

    Stock_Take_Name_Id: number;
    Stocktakename: string;
    StartDate: any;
    CloseDate: any;
    Status_Id: number;
    Status_Name: string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

