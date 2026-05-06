export class Item_Group {
	Item_Group_Id: number;
	Item_Group_Code: string;
	Item_Group_Name: string;
	UnderGroupId: number;
	Check_Box: boolean;


	/** Added on 17-7-24 */

	Master_Category_Id: number;
	Master_Category_Name: string;
	
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
