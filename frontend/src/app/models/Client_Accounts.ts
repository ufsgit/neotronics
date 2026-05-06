import { Item_Group } from "./Item_Group";
import { Item } from "./Item";

export class Client_Accounts {
	Client_Accounts_Id: number;	
	Account_Group_Id: number;
	Account_Group_Name: string;
	Client_Accounts_Code: string;
	Client_Accounts_Name: string;
	Client_Accounts_No: string;
	Address1: string;
	Address2: string;
	Address3: string;
	Address4: string;
	PinCode: string;
	State: string;
	Country: string;
	Phone: string;
	Mobile: string;
	Email: string;
	GSTNo: string;
	Opening_Balance: number;
	Payment_Term: string;
	UserId: number;
	Employee_Id:number;	
	Employee:string;
	Opening_Type :number;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
