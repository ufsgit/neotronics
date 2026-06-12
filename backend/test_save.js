const mysql = require('mysql2/promise');
mysql.createConnection({host: 'localhost', user: 'root', password: 'root123', database: 'neotronics_db'}).then(async c => {
    try {
        const Sales_Master = require('./models/Sales_Master');
        const res = await Sales_Master.Save_Quotation({
            SalesQuotationMaster_Id: 0,
            Account_Party_Id: 1,
            EntryDate: '2026-06-01',
            POnumber: 'TEST-001',
            CurrencyId: 1,
            PaymentTerms: '',
            AttendEmployee: '',
            TotalAmount: 100,
            TotalDiscount: 0,
            Roundoff_Amt: 0,
            Total_Amount: 100,
            Basic_Discount: 0,
            NetTotal: 100,
            Brand: '',
            PriceBasis: '',
            Delivery: '',
            Validity: '',
            Description1: 'Test quotation',
            User_Id: 1,
            Delivery_Address1: '', Delivery_Address2: '', Delivery_Address3: '', Delivery_Address4: '',
            Charge1: '', charge1_Amount: 0, Charge2: '', charge2_Amount: 0,
            Discount_Description: '', Additional_Discount: 0,
            Description2: '', Amount_In_Words: '', PreparedBy: '',
            Charge1per: '', Payment_Term_Description: 1,
            VAT_Percentage: 0, VAT_Amount: 0, TaxableAmount: 100,
            KindAttend: '', PaymentTermValue: 0,
            Supplier_Ref_No: '', Quotation_Details: '[]'
        }, { log: null });

        console.log("SP Result:", JSON.stringify(res));

        // Check what got saved
        const [rows] = await c.query('SELECT SalesQuotationMaster_Id, QuotationNo, Status, Status_Id, Status_Name, workflow_status FROM salesquotationmaster ORDER BY SalesQuotationMaster_Id DESC LIMIT 3');
        console.log("Latest DB rows:", JSON.stringify(rows, null, 2));
    } catch (e) {
        console.error("ERROR:", e.message);
        console.error(e.stack);
    } finally {
        c.end();
    }
}).catch(console.error);
