export class Company {
    Company_Id  :number;
    Company_Name:string;
    Address1	:string;
    Address2	:string;
    Address3	:string;
    Address4	:string;
    Mobile_Number:string;
    Phone_Number:string;
    FAX         :string;
    EMail	    :string;
    Website	    :string;
    Logo	    :string;
    Code	    :string;   
    GSTNO       :string;
    CINO        :string;
    PANNO: string;
    NO : string;
    Note: string;
    File_Path: string;
    Doc_Photo: any;
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}