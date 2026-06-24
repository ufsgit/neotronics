import { Requirement_Details } from './Requirement_Details';

export class Requirement_Master {
    RequirementMaster_Id: number;
    Account_Party_Id: number;
    EntryDate: string;
    SONo: string;
    RequirementNo: string;
    POnumber: string;
    CurrencyId: number;
    TypeId: number;
    PaymentTerms: string;
    AttendEmployee: string;
    TotalAmount: number;
    TotalDiscount: number;
    TaxableAmount: number;
    VatAmount: number;
    Roundoff_Amt: number;
    Total_Amount: number;
    NetTotal: number;
    Brand: string;
    PriceBasis: string;
    Delivery: string;
    Validity: string;
    Description1: string;
    User_Id: number;
    Company_Id: number;
    Delivery_Address1: string;
    Delivery_Address2: string;
    Delivery_Address3: string;
    Delivery_Address4: string;
    KindAttend: string;
    Charge1: string;
    charge1_Amount: number;
    Charge2: string;
    charge2_Amount: number;
    Discount_Description: string;
    Additional_Discount: number;
    Description2: string;
    Basic_Discount: number;
    Amount_In_Words: string;
    PreparedBy: string;
    Charge1per: number;
    Payment_Term_Description: number;
    VAT_Description: string;
    VAT_Percentage: number;
    VAT_Amount: number;
    Requirement_Image: string;
    Acknolodgement_Image: string;
    CurrecnyName: string;
    UserName: string;
    Supplier_Ref_No: string;
    Cess: number;
    RoundOff: number;
    Address1: string;
    Address2: string;
    Address3: string;
    Address4: string;
    Mobile: string;
    PinCode: string;
    GSTNo: string;
    GrandTotal: number;
    Transportation_Gst: number;
    Handling_Gst: number;
    Transportation_Total: number;
    Handling_Total: number;
    Vehicle_No: string;
    Driver_Name: string;
    PaymentTermValue: string;
    Mobile_No: string;
    Customer: string;
    Isgst: boolean;
    Transportation_Charge: number;
    Handling_Charge: number;
    FormattedEntryDate: string;
    Vatin: string;
    No: string;
    TotalC: number;
    ToalS: number;
    Lead_Id: number;


    // Frontend helper fields (to be aligned with Quotation logic)
    Requirement_Details: Requirement_Details[];
    Customer_Name: string;
    PrintDate: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

