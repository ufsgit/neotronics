export class Payment_Data_Details {
 

	name: string;
 
	amount: number;
	remark: string;


	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
