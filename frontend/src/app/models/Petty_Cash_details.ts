export class Petty_Cash_details {
	Petty_Cash_Id: number;
	 

	Expense:number;
	Ho:number
	Salary:number
	Management:number
	SumTotal:number

	// Cash:number;
	// Upi:number;
	// Card:number;
	// Coin:number;
	// Bank:number;
	// RecpTotal:number
    Amount:number
	ExpenseRemark: string;
	HoRemark: string;
	SalaryRemark: string;
	ManagementRemark: string;
	Amnt:number

Type_Id:number

	name: string;
 
	amount: number;
	remark: string;


	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
