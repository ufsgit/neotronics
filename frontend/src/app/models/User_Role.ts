export class User_Role {
    User_Role_Id: number;
    User_Role_Name: string;
    User_Type_Id: number;
    Working_Status_Id: number;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}