export class Daily {
	Daily_Id: number;
	Branch_Id: number;
	Branch_Name: string;
	Date: Date;
	Item_Id: number;
	Item_Name: string;
	Item_Code: string;
	Item_Quantity: number;
	Particular: string;
	Description: string;
	User_Id: number;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
