export class Price_Response_Details {
    Price_Response_Details_Id: number;
    Price_Response_Master_Id: number;
    StockId: number;
    ItemId: number;
    Item_Id: number;
    ItemName: string;
    Item_Name: string;
    Item_Code: string;
    GroupId: number;
    GroupName: string;
    UnitId: number;
    UnitName: string;
    PurchaseRate: number;
    SaleRate: number;
    Sale_Rate: number;
    MRP: number;
    HSNMasterId: number;
    HSNCODE: string;
    Country_Id: number;
    Country_Name: string;
    Quantity: number;
    Discount: number;
    NetValue: number;
    SaleTax: number;
    TaxAmount: number;
    Stock: number;
    Description: string;
    Model: string;
    Brand: string;
    UnitPrice: number;
    Amount: number;
    Availability: string;
    Unit_Discount: number;
    TaxableAmount: number;
    Item_Discount_Amount: number;
    Expiry_Date: Date;
    Profit: number;
    Part_No: string;
    Brand_Id: number;
    Brand_Name: string;
    Supplier_Price: number;
    Profit_Percentage: number;
    Profit_Amount: number;
    Total_Amount: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
