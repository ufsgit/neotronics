export class TermsAndCondition {
    Term_Id: number;
    Caption: string;
    Terms_Text: string;
    Description: string;
    Is_Update: boolean;
    Checkbox: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
