export class Custom_Field {
    Custom_Field_Id: number;
    Field_Name: string;
    Field_Type: string;
    Quotation_Custom: boolean;
    View_In_Quotation: boolean;
    Events: boolean;
    Field_List: string; // Comma-separated or JSON string depending on how it's handled in TS. For now, string is fine.
}
