export class Requirement_Details {
    RequirementDetails_Id: number;
    RequirementMaster_Id: number;
    ItemId: number;
    Item_Code: string;
    ItemName: string;
    GroupId: number;
    GroupName: string;
    UnitId: number;
    UnitName: string;
    StockId: number;
    HSNMasterId: number;
    HSNCODE: string;
    Country_Id: number;
    Country_Name: string;
    UnitPrice: number;
    Quantity: number;
    Amount: number;
    Discount: number;
    TaxableAmount: number;
    TaxAmount: number;
    NetValue: number;
    Availability: string;
    Item_Discount_Amount: number;
    Unit_Discount: number;

    // New requirement tax fields (from Item Master)
    part_number: string;
    gst: number;
    cgst: number;
    sgst: number;
    igst: number;
    b2b_rate: number;
    b2c_rate: number;

    // Frontend helper fields (to be aligned with Quotation logic if needed)
    Stock: number;
    SaleRate: number;
    PurchaseRate: number;
    MRP: number;
    Description: string;
    SaleTax: number;
    Expiry_Date: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

