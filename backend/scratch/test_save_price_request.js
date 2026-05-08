const db = require('../dbconnection');
const StoredProcedure = require('../helpers/stored-procedure');

async function testSave() {
    try {
        const params = [
            0, // price_request_master_Id_
            1, // Account_Party_Id_
            '2026-05-08', // EntryDate_
            'TEST-PO', // POnumber_
            1, // CurrencyId_
            'TEST TERMS', // PaymentTerms_
            'TEST EMP', // AttendEmployee_
            100.0, // TotalAmount_
            0.0, // TotalDiscount_
            0.0, // Roundoff_Amt_
            100.0, // Total_Amount_
            0.0, // Basic_Discount_
            100.0, // NetTotal_
            'TEST BRAND', // Brand_
            'TEST BASIS', // PriceBasis_
            'TEST DELIVERY', // Delivery_
            'TEST VALIDITY', // Validity_
            'TEST DESC 1', // Description1_
            1, // User_Id_
            'ADDR 1', // Delivery_Address1_
            'ADDR 2', // Delivery_Address2_
            'ADDR 3', // Delivery_Address3_
            'ADDR 4', // Delivery_Address4_
            'CH 1', // Charge1_
            0.0, // charge1_Amount_
            'CH 2', // Charge2_
            0.0, // charge2_Amount_
            'DISC DESC', // Discount_Description_
            0.0, // Additional_Discount_
            'DESC 2', // Description2_
            'WORDS', // Amount_In_Words_
            'PREPARED BY', // PreparedBy_
            '0', // Charge1per_
            1, // Payment_Term_Description_
            5.0, // VAT_Percentage_
            5.0, // VAT_Amount_
            100.0, // TaxableAmount_
            'KIND', // KindAttend_
            1, // PaymentTermValue_
            'REF NO', // Supplier_Ref_No_
            JSON.stringify([{ Item_Id: 1, Quantity: 1, Rate: 100 }]) // Price_Request_Details_ (as string)
        ];

        console.log("Param count:", params.length);
        const sp = new StoredProcedure("Save_Price_Request", params, db.promise());
        const result = await sp.result();
        console.log("Success:", result);
        process.exit(0);
    } catch (err) {
        console.error("Error detected:");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        console.error("SQL Message:", err.sqlMessage);
        process.exit(1);
    }
}

testSave();
