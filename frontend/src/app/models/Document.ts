import { Document_Type } from "./Document_Type";

export class Document {
	Document_Id: number;
	Doc_Photo:string
	File_Name: string;
	Document_Name: string;
	Document_Type_Id : number;
	Document_Type_Name : string;
	Period_From : Date; 
	Period_To : Date;
	Document_Description : string;
	Document_Type_: Document_Type=new Document_Type()
	Branch_Id:number;
	Branch_Name:string;

	/*** Added on 07-05-2024 ***/
	filepath: string;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
