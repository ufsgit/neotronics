export class Daybook {
	Daybook_Id: number;
	Client_Accounts_Id: number;
	Client_Accounts_Name: string;
	Entry_Date: Date;
	Item_Id: number;
	Item_Name: string;
	Item_Code: string;
	Quantity: number;
	Remarks: string;
	File_Name: string;
	Item_Group_Id: number;
	Item_Group_Name: string;
	Master_Category_Id: number;
	Master_Category_Name: string;
	Reference_Number: number;
	DeleteStatus: number;
	// User_Id: number;
	filepath: string;
	Doc_Photo:string

	/*** Added on 2-8-24 */
	Amount: number;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
