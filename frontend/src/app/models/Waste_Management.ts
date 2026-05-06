export class Waste_Management {
	Waste_Management_Id: number;
	Branch_Id: number;
	Branch_Name: string;
	Date: Date;
	Item_Id: number;
	Item_Name: string;
	Item_Code: string;
	Item_Quantity: number;
	Particular: string;
	Description: string;
	Doc_Photo:string
	File_Name: string;
	User_Id: number;
	filepath: string;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
