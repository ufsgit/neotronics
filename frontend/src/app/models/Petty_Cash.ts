import { Payment_Data_Details } from "./Payment_Data_Details";
import { Receipt_Data_Details } from "./Receipt_Data_Details";

export class Petty_Cash {
	recamt(recamt: any) {
		throw new Error("Method not implemented.");
	}
	Petty_Cash_Id: number;
	Date: Date;
	Branch_Id: number;
	Branch_Name: string;
	Account_Id: number;
	Account_Name: string;
	Type_Id: number;
	Type_Name: string;
	Particular: string;
	Receipt_Amount: number | string;
	Payment_Amount: number | string;
	File_Name: string;
	Document_Name: string;
	User_Id: number;
	Amount: number;
	ReceiptTotal: number;
	PaymentTotal: number;
	Balance_Total: number;


    

	Expense:number;
	Ho:number
	Salary:number
	Management:number
	SumTotal:number

	Cash:number;
	Upi:number;
	Card:number;
	Coin:number;
	Bank:number;
	RecpTotal:number

	ExpenseRemark: string;
	HoRemark: string;
	SalaryRemark: string;
	ManagementRemark: string;
	Amnt:number

	Poc:number

	Pos_Amount:string;
	Closing_Balnce:number;
	Closing_Cash:string;
	Closing_coin:string;
	
	Payment_Data_Details_: Payment_Data_Details[];
	Receipt_Data_Details_: 	Receipt_Data_Details[];

	/*** Added on 08-05-2024 ***/

	filepath: string;

	/*** Added on 10-05-2024 ***/

	Opening_Balance: number;
	Profit_Loss: number;


	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
