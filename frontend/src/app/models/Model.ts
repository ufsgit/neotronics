export class Model {
    Model_Id: number;
    Model_Name: string;
    Model_Code: string;
    Item_Id: number;
    Item_Name: string;
    Is_Update: boolean;
    Checkbox: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
