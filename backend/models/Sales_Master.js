var db = require('../dbconnection');
var Lead = require('./Lead');
var fs = require('fs');
var request = require('request');
const fetch = require("node-fetch");
const storedProcedure = require('../helpers/stored-procedure');
const { withTransaction, normalizeParams } = require("../helpers/transaction");

var Sales_Master = {
    Save_Sales_Master: async function (Sales_Master_, { log } = {}) {
        if (!Sales_Master_) throw new Error("Payload missing");
        if (Sales_Master_.SalesQuotationMaster_Id === undefined) Sales_Master_.SalesQuotationMaster_Id = 0;

        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Sales_Master_.Sales_Master_Id, Sales_Master_.Account_Party_Id, Sales_Master_.EntryDate, Sales_Master_.LPONo,
                Sales_Master_.DONo, Sales_Master_.PackingListNumber, Sales_Master_.CurrencyId, Sales_Master_.TypeId, Sales_Master_.PaymentTerms, Sales_Master_.TotalAmount, Sales_Master_.TotalDiscount, Sales_Master_.Roundoff_Amt,
                Sales_Master_.Total_Amount, Sales_Master_.NetTotal, Sales_Master_.User_Id, Sales_Master_.Delivery_Address1, Sales_Master_.Delivery_Address2,
                Sales_Master_.Delivery_Address3, Sales_Master_.Delivery_Address4, Sales_Master_.Charge1, Sales_Master_.charge1_Amount, Sales_Master_.Charge2, Sales_Master_.charge2_Amount,
                Sales_Master_.Discount_Description, Sales_Master_.Additional_Discount, Sales_Master_.Description2, Sales_Master_.Amount_In_Words, Sales_Master_.Charge1per, Sales_Master_.Employee,
                Sales_Master_.DueDate, Sales_Master_.SupplyDate, Sales_Master_.Basic_Discount,
                Sales_Master_.Payment_Term_Description, Sales_Master_.VAT_percentage, Sales_Master_.VAT_Amount, Sales_Master_.TaxableAmount, Sales_Master_.KindAttend, Sales_Master_.PaymentTermValue, Sales_Master_.Sales_Details,
                Sales_Master_.SalesQuotationMaster_Id,
                Sales_Master_.PerformaInvoiceMaster_Id, Sales_Master_.DeliveryOrderMaster_Id,
            ]);

            if (log) log.info("sp.call", { name: "Save_Sales_Master" });
            var result = await (new storedProcedure("Save_Sales_Master", params, connection)).result();
            if (result && result[0] && result[0].Sales_Master_Id_ && Sales_Master_.Company_Id) {
                try {
                    await connection.query("UPDATE sales_master SET Company_Id=? WHERE Sales_Master_Id=?", [Sales_Master_.Company_Id, result[0].Sales_Master_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in sales_master. Column might be missing.", e);
                }
            }
            return result;
        }, { log });
    },

    Save_Sales_Master_Mobile: async function (Sales_Master_, { log } = {}) {
        if (!Sales_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const response = await fetch("https://geolocation-db.com/json/0:0:0:0:0:FFFF:" + Sales_Master_.Latitude + ":" + Sales_Master_.Longtitude);
            const jsondata = await response.json();
            const params = normalizeParams([
                Sales_Master_.Sales_Master_Id,
                Sales_Master_.Account_Party_Id, Sales_Master_.Employee_Id, Sales_Master_.User_Id, Sales_Master_.Bill_Date, Sales_Master_.GrossTotal,
                Sales_Master_.RoundOff, Sales_Master_.BillType, jsondata.latitude, jsondata.longitude, jsondata.city,
                jsondata.state, jsondata.postal, Sales_Master_.Sales_Details,
            ]);
            if (log) log.info("sp.call", { name: "Save_Sales_Master_Mobile" });
            return (new storedProcedure("Save_Sales_Master_Mobile", params, connection)).result();
        }, { log });
    },

    Save_Sales_Master1: async function (Sales_Master_) {
        return new Promise(async (rs, rej) => {
            const pool = db.promise();
            var connection = await pool.getConnection();
            await connection.beginTransaction();
            try {
                const result1 = await (new storedProcedure('Save_Sales_Master', [
                    Sales_Master_.Sales_Master_Id,
                    Sales_Master_.Account_Party_Id, Sales_Master_.Employee_Id, Sales_Master_.User_Id,
                    Sales_Master_.Bill_Date, Sales_Master_.GrossTotal, Sales_Master_.TotalDiscount, Sales_Master_.NetTotal,
                    Sales_Master_.TotalCGST, Sales_Master_.ToalSGST, Sales_Master_.TotalIGST, Sales_Master_.TotalGST,
                    Sales_Master_.Cess, Sales_Master_.RoundOff, Sales_Master_.TotalAmount, Sales_Master_.GrandTotal,
                    Sales_Master_.BillType, Sales_Master_.Description1
                ], connection)).result();
                var Sales_Master_Id_ = result1[0].Sales_Master_Id_;
                var Sales_Details_ = Sales_Master_.Sales_Details;
                await (new storedProcedure('Save_Sales_Details', [Sales_Details_, Sales_Master_Id_, Sales_Master_.EmpIoyee_Id], connection)).result();
                await connection.commit();
                rs(result1);
            }
            catch (err) {
                console.log(err);
                if (connection) await connection.rollback();
                rej(err);
            }
            finally {
                if (connection) connection.release();
            }
        })
    },

    Delete_Sales_Master: function (Sales_Master_Id_) {
        return db.promise().query("CALL Delete_Sales_Master(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Get_Sales_Master: function (Sales_Master_Id_) {
        return db.promise().query("CALL Get_Sales_Master(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Search_Sales_Master: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Invoice_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Details_Id_, User_Type, Login_User_Id) {
        if (Invoice_No_ == "undefined" || Invoice_No_ == undefined || Invoice_No_ == null) Invoice_No_ = "";
        if (Part_No_ == "undefined" || Part_No_ == undefined || Part_No_ == null) Part_No_ = "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_Sales_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,@User_Details_Id_ :=?, @User_Type :=?, @Login_User_Id :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Invoice_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Details_Id_, User_Type, Login_User_Id]).then(r => r[0]);
    },

    Get_Sales_Details: function (Sales_Master_Id_) {
        return db.promise().query("CALL Get_Sales_Details(@Sales_Master_Id_:=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Load_Company: function () {
        return db.promise().query("CALL Load_Company()", []).then(r => r[0]);
    },

    Get_Bill_Type: function (Group_Id_) {
        return db.promise().query("CALL Get_Bill_Type(@Group_Id_:=?)", [Group_Id_]).then(r => r[0]);
    },

    Load_Vat_Percentage: function () {
        return db.promise().query("CALL Load_Vat_Percentage()", []).then(r => r[0]);
    },

    Load_Cess: function () {
        return db.promise().query("CALL Load_Cess()", []).then(r => r[0]);
    },

    Load_Bill_Mode: function () {
        return db.promise().query("CALL Load_Bill_Mode()", []).then(r => r[0]);
    },

    Load_currencydetails: function () {
        return db.promise().query("CALL Load_currencydetails()", []).then(r => r[0]);
    },

    Search_Customer_Typeahead: function (Account_Group_Id_, Client_Accounts_Name_) {
        return db.promise().query("CALL Search_Customer_Typeahead(@Account_Group_Id_ :=?,@Client_Accounts_Name_ :=?)", [Account_Group_Id_, Client_Accounts_Name_ || '']).then(r => r[0]);
    },

    Load_Hsn_Sales_Report: function (From_date_, To_date_) {
        return db.promise().query("call Load_Hsn_Sales_Report(@From_date_ :=?,@To_date_ :=?)", [From_date_, To_date_]).then(r => r[0]);
    },

    Load_Hsn_Sales_Return_Report: function (From_date_, To_date_) {
        return db.promise().query("call Load_Hsn_Sales_Return_Report(@From_date_ :=?,@To_date_ :=?)", [From_date_, To_date_]).then(r => r[0]);
    },

    Load_Sales_Return_Tax_Report: function (From_date_, To_date_) {
        return db.promise().query("call Load_Sales_Return_Tax_Report(@From_date_ :=?,@To_date_ :=?)", [From_date_, To_date_]).then(r => r[0]);
    },
    Save_Quotation: async function (Quotation_Master_, { log } = {}) {
        if (!Quotation_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Quotation_Master_.SalesQuotationMaster_Id,
                Quotation_Master_.Account_Party_Id, Quotation_Master_.EntryDate, Quotation_Master_.POnumber,
                Quotation_Master_.CurrencyId, Quotation_Master_.PaymentTerms, Quotation_Master_.AttendEmployee, Quotation_Master_.TotalAmount,
                Quotation_Master_.TotalDiscount, Quotation_Master_.Roundoff_Amt, Quotation_Master_.Total_Amount, Quotation_Master_.Basic_Discount,
                Quotation_Master_.NetTotal, Quotation_Master_.Brand, Quotation_Master_.PriceBasis, Quotation_Master_.Delivery,
                Quotation_Master_.Validity, Quotation_Master_.Description1, Quotation_Master_.User_Id, Quotation_Master_.Delivery_Address1,
                Quotation_Master_.Delivery_Address2, Quotation_Master_.Delivery_Address3, Quotation_Master_.Delivery_Address4, Quotation_Master_.Charge1,
                Quotation_Master_.charge1_Amount, Quotation_Master_.Charge2, Quotation_Master_.charge2_Amount, Quotation_Master_.Discount_Description,
                Quotation_Master_.Additional_Discount, Quotation_Master_.Description2, Quotation_Master_.Amount_In_Words, Quotation_Master_.PreparedBy,
                Quotation_Master_.Charge1per, Quotation_Master_.Payment_Term_Description, Quotation_Master_.VAT_Percentage, Quotation_Master_.VAT_Amount, Quotation_Master_.TaxableAmount,
                Quotation_Master_.KindAttend, Quotation_Master_.PaymentTermValue, Quotation_Master_.Supplier_Ref_No, typeof Quotation_Master_.Quotation_Details === 'object' ? JSON.stringify(Quotation_Master_.Quotation_Details) : Quotation_Master_.Quotation_Details,
            ]);
            if (log) log.info("sp.call", { name: "Save_Quotation" });
            // Build the SP call SQL directly to use the transaction connection reliably
            const placeholders = params.map(() => '?').join(',');
            const spSql = `CALL Save_Quotation(${placeholders})`;
            const [spResult] = await connection.query(spSql, params);
            // spResult is an array of result sets; the last SELECT returns SalesQuotationMaster_Id_
            let result = (Array.isArray(spResult) && Array.isArray(spResult[0])) ? spResult[0] : spResult;
            let qid = Quotation_Master_.SalesQuotationMaster_Id;
            if (!qid) {
                // Try to extract from the SP SELECT result
                if (Array.isArray(spResult)) {
                    for (const rs of spResult) {
                        if (rs && rs[0] && rs[0].SalesQuotationMaster_Id_) {
                            qid = rs[0].SalesQuotationMaster_Id_;
                            break;
                        }
                    }
                }
                // Reliable fallback: LAST_INSERT_ID() is set by the SP's INSERT
                if (!qid) {
                    const [[lastIdRow]] = await connection.query("SELECT LAST_INSERT_ID() AS lid");
                    if (lastIdRow && lastIdRow.lid) qid = lastIdRow.lid;
                }
            }
            if (qid && Quotation_Master_.Company_Id) {
                try {
                    await connection.query("UPDATE salesquotationmaster SET Company_Id=? WHERE SalesQuotationMaster_Id=?", [Quotation_Master_.Company_Id, qid]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in salesquotationmaster. Column might be missing.", e);
                }
            }
            if (qid) {
                let status = Quotation_Master_.Status;
                let statusId = Quotation_Master_.Status_Id;
                let statusName = Quotation_Master_.Status_Name;
                let statusStr = 'PENDING';

                if (!Quotation_Master_.SalesQuotationMaster_Id) {
                    // New quotation: force Pending
                    status = 2;
                    statusId = 1;
                    statusName = 'Pending';
                    statusStr = 'PENDING';
                } else {
                    // Edit quotation
                    if (statusId == 1) {
                        status = 2;
                        statusName = 'Pending';
                        statusStr = 'PENDING';
                    } else if (statusId == 2) {
                        status = 3;
                        statusName = 'Approved';
                        statusStr = 'APPROVED';
                    } else if (statusId == 3) {
                        status = 4;
                        statusName = 'Reject';
                        statusStr = 'REJECTED';
                    } else {
                        // Fallback mapping from status
                        if (status == 3) {
                            statusId = 2;
                            statusName = 'Approved';
                            statusStr = 'APPROVED';
                        } else if (status == 5) {
                            statusId = 2;
                            statusName = 'Approved';
                            statusStr = 'CONFIRMED';
                        } else if (status == 2) {
                            statusId = 1;
                            statusName = 'Pending';
                            statusStr = 'PENDING';
                        } else if (status == 4) {
                            statusId = 3;
                            statusName = 'Reject';
                            statusStr = 'REJECTED';
                        } else {
                            status = 2;
                            statusId = 1;
                            statusName = 'Pending';
                            statusStr = 'PENDING';
                        }
                    }
                }
                
                await connection.query(
                    "UPDATE salesquotationmaster SET Status = ?, workflow_status = ?, Status_Id = ?, Status_Name = ? WHERE SalesQuotationMaster_Id = ?",
                    [status, statusStr, statusId, statusName, qid]
                );

                if (Quotation_Master_.Lead_Id) {
                    Lead.Add_Lead_Activity({
                        Lead_Id: Number(Quotation_Master_.Lead_Id),
                        Activity_Type: 'QUOTE_SENT',
                        Activity_Title: 'Quote sent',
                        New_Value: Quotation_Master_.Supplier_Ref_No || Quotation_Master_.QuotationNo || String(qid),
                        User_Id: Number(Quotation_Master_.User_Id || 0)
                    }, () => {});
                }
            }
            return result;
        }, { log });
    },
    Search_Quotation: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_) {
        if (Quot_No_ == "undefined") Quot_No_ = "";
        if (Part_No_ == "undefined") Part_No_ = "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_Quotation(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?, @User_Type_ :=?, @Login_User_Id_ :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_]).then(r => r[0]);
    },

    Get_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_Quotation_Details(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Delete_Quotation_Master: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Delete_Quotation_Master(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Save_PerformaInvoice: async function (performainvoicemaster_, { log } = {}) {
        if (!performainvoicemaster_) throw new Error("Payload missing");
        if (performainvoicemaster_.SalesQuotationMaster_Id == undefined) performainvoicemaster_.SalesQuotationMaster_Id = 0;
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                performainvoicemaster_.PerformaInvoiceMaster_Id,
                performainvoicemaster_.Account_Party_Id, performainvoicemaster_.EntryDate, performainvoicemaster_.InvoiceNo, performainvoicemaster_.LPONo,
                performainvoicemaster_.CurrencyId, performainvoicemaster_.PaymentTerms, performainvoicemaster_.AttendEmployee, performainvoicemaster_.TotalAmount,
                performainvoicemaster_.TotalDiscount, performainvoicemaster_.Roundoff_Amt, performainvoicemaster_.Total_Amount, performainvoicemaster_.NetTotal,
                performainvoicemaster_.Brand, performainvoicemaster_.PriceBasis, performainvoicemaster_.Delivery, performainvoicemaster_.Validity, performainvoicemaster_.Description1,
                performainvoicemaster_.User_Id, performainvoicemaster_.Delivery_Address1, performainvoicemaster_.Delivery_Address2, performainvoicemaster_.Delivery_Address3,
                performainvoicemaster_.Delivery_Address4, performainvoicemaster_.Charge1, performainvoicemaster_.charge1_Amount, performainvoicemaster_.Charge2,
                performainvoicemaster_.charge2_Amount, performainvoicemaster_.Discount_Description, performainvoicemaster_.Additional_Discount, performainvoicemaster_.Description2,
                performainvoicemaster_.Amount_In_Words, performainvoicemaster_.PreparedBy, performainvoicemaster_.Charge1per, performainvoicemaster_.Payment_Term_Description,
                performainvoicemaster_.VAT_Percentage, performainvoicemaster_.VAT_Amount, performainvoicemaster_.TaxableAmount,
                performainvoicemaster_.KindAttend, performainvoicemaster_.performainvoicedetails, performainvoicemaster_.SalesQuotationMaster_Id,
                performainvoicemaster_.AccountType_Id, performainvoicemaster_.PaymentTermValue, performainvoicemaster_.Total,
            ]);
            if (log) log.info("sp.call", { name: "Save_PerformaInvoice" });
            var result = await (new storedProcedure("Save_PerformaInvoice", params, connection)).result();
            if (result && result[0] && result[0].PerformaInvoiceMaster_Id_ && performainvoicemaster_.Company_Id) {
                try {
                    await connection.query("UPDATE performainvoicemaster SET Company_Id=? WHERE PerformaInvoiceMaster_Id=?", [performainvoicemaster_.Company_Id, result[0].PerformaInvoiceMaster_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in performainvoicemaster. Column might be missing.", e);
                }
            }
            return result;
        }, { log });
    },

    Search_PerformaInvoice: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, InvoiceNo_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Type, Login_User_Id) {
        InvoiceNo_ = (InvoiceNo_ || "").trim();
        Part_No_ = (Part_No_ || "").trim();
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_PerformaInvoive(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@InvoiceNo_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?, @User_Type :=?, @Login_User_Id :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, InvoiceNo_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Type, Login_User_Id]).then(r => r[0]);
    },

    Get_Performa_invoice_Details: function (PerformaInvoiceMaster_Id_) {
        return db.promise().query("CALL Get_Performa_invoice_Details(@PerformaInvoiceMaster_Id_:=?)", [PerformaInvoiceMaster_Id_]).then(r => r[0]);
    },

    Delete_Performa_Invoice_Master: function (PerformaInvoiceMaster_Id_) {
        return db.promise().query("CALL Delete_Performa_Invoice_Master(@PerformaInvoiceMaster_Id_ :=?)", [PerformaInvoiceMaster_Id_]).then(r => r[0]);
    },

    Save_Purchase_order: async function (Purchase_Ordermaster_, { log } = {}) {
        if (!Purchase_Ordermaster_) throw new Error("Payload missing");
        if (Purchase_Ordermaster_.OrderNumber == null) Purchase_Ordermaster_.OrderNumber = 0;

        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Purchase_Ordermaster_.Purchase_OrderMaster_Id,
                Purchase_Ordermaster_.Account_Party_Id, Purchase_Ordermaster_.EntryDate, Purchase_Ordermaster_.DeliveryDate, Purchase_Ordermaster_.OrderNumber, Purchase_Ordermaster_.POnumber,
                Purchase_Ordermaster_.CurrencyId, Purchase_Ordermaster_.PaymentTerms, Purchase_Ordermaster_.AttendEmployee, Purchase_Ordermaster_.TotalAmount,
                Purchase_Ordermaster_.TotalDiscount, Purchase_Ordermaster_.Roundoff_Amt, Purchase_Ordermaster_.Total_Amount, Purchase_Ordermaster_.NetTotal,
                Purchase_Ordermaster_.Brand, Purchase_Ordermaster_.PriceBasis, Purchase_Ordermaster_.Delivery, Purchase_Ordermaster_.Validity, Purchase_Ordermaster_.Description1,
                Purchase_Ordermaster_.User_Id, Purchase_Ordermaster_.Delivery_Address1, Purchase_Ordermaster_.Delivery_Address2, Purchase_Ordermaster_.Delivery_Address3,
                Purchase_Ordermaster_.Delivery_Address4, Purchase_Ordermaster_.Charge1, Purchase_Ordermaster_.charge1_Amount, Purchase_Ordermaster_.Charge2,
                Purchase_Ordermaster_.charge2_Amount, Purchase_Ordermaster_.Discount_Description, Purchase_Ordermaster_.Additional_Discount, Purchase_Ordermaster_.Description2,
                Purchase_Ordermaster_.Amount_In_Words, Purchase_Ordermaster_.PreparedBy, Purchase_Ordermaster_.Charge1per, Purchase_Ordermaster_.Payment_Term_Description,
                Purchase_Ordermaster_.VAT_Percentage, Purchase_Ordermaster_.VAT_Amount, Purchase_Ordermaster_.TaxableAmount,
                Purchase_Ordermaster_.KindAttend, Purchase_Ordermaster_.Purchase_Orderdetails, Purchase_Ordermaster_.SalesQuotationMaster_Id,
                Purchase_Ordermaster_.AccountType_Id, Purchase_Ordermaster_.PaymentTermValue, Purchase_Ordermaster_.Basic_Discount, Purchase_Ordermaster_.Customer_Reference, Purchase_Ordermaster_.Supplier_Ref_No,
            ]);
            if (log) log.info("sp.call", { name: "Save_Purchase_order" });
            var result = await (new storedProcedure("Save_Purchase_order", params, connection)).result();
            if (result && result[0] && result[0].PurchaseOrderMaster_Id_ && Purchase_Ordermaster_.Company_Id) {
                try {
                    await connection.query("UPDATE purchaseordermaster SET Company_Id=? WHERE PurchaseOrderMaster_Id=?", [Purchase_Ordermaster_.Company_Id, result[0].PurchaseOrderMaster_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in purchaseordermaster. Column might be missing.", e);
                }
            }
            return result;
        }, { log });
    },

    Search_PurchaseOrder: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Order_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Type, Login_User_Id) {
        Order_No_ = Order_No_ || "";
        Part_No_ = Part_No_ || "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_PurchaseOrder(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Order_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?, @User_Type :=?, @Login_User_Id :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Order_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, AccountType_Id_, User_Type, Login_User_Id]).then(r => r[0]);
    },

    Get_PurchaseOrder_Details: function (Purchase_OrderMaster_Id_) {
        return db.promise().query("CALL Get_PurchaseOrder_Details(@Purchase_OrderMaster_Id_:=?)", [Purchase_OrderMaster_Id_]).then(r => r[0]);
    },

    Delete_Purchase_Order: function (Purchase_OrderMaster_Id_) {
        return db.promise().query("CALL Delete_Purchase_Order(@Purchase_OrderMaster_Id_ :=?)", [Purchase_OrderMaster_Id_]).then(r => r[0]);
    },

    Save_Delivery_Order: async function (Delivery_Order_Master_, { log } = {}) {
        if (!Delivery_Order_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Delivery_Order_Master_.DeliveryOrderMaster_Id, Delivery_Order_Master_.Account_Party_Id, Delivery_Order_Master_.EntryDate, Delivery_Order_Master_.DONo,
                Delivery_Order_Master_.CurrencyId, Delivery_Order_Master_.PaymentTerms, Delivery_Order_Master_.User_Id, Delivery_Order_Master_.Delivery_Address1,
                Delivery_Order_Master_.Delivery_Address2, Delivery_Order_Master_.Delivery_Address3, Delivery_Order_Master_.Delivery_Address4, Delivery_Order_Master_.payment_Term_Value,
                Delivery_Order_Master_.Payment_Term_Description, Delivery_Order_Master_.Received_By, Delivery_Order_Master_.TypeId, Delivery_Order_Master_.UserName,
                Delivery_Order_Master_.Kind_Attend, Delivery_Order_Master_.Delivery_Order_Details, Delivery_Order_Master_.SalesQuotationMaster_Id, Delivery_Order_Master_.PerformaInvoiceMaster_Id,
                Delivery_Order_Master_.TotalAmount, Delivery_Order_Master_.TotalDiscount, Delivery_Order_Master_.Total_Amount, Delivery_Order_Master_.NetTotal, Delivery_Order_Master_.LPONo1,
                Delivery_Order_Master_.Roundoff_Amt, Delivery_Order_Master_.Basic_Discount, Delivery_Order_Master_.Charge1, Delivery_Order_Master_.charge1_Amount,
                Delivery_Order_Master_.Charge2, Delivery_Order_Master_.charge2_Amount, Delivery_Order_Master_.Discount_Description, Delivery_Order_Master_.Additional_Discount,
                Delivery_Order_Master_.Amount_In_Words, Delivery_Order_Master_.Charge1per, Delivery_Order_Master_.VAT_Percentage, Delivery_Order_Master_.VAT_Amount,
                Delivery_Order_Master_.TaxableAmount, Delivery_Order_Master_.AttendEmployee, Delivery_Order_Master_.Description2,
            ]);
            if (log) log.info("sp.call", { name: "Save_Delivery_Order_Master" });
            return (new storedProcedure("Save_Delivery_Order_Master", params, connection)).result();
        }, { log });
    },

    Search_Delivery_Order: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, Account_Type_Id_, User_Type, Login_User_Id) {
        Quot_No_ = Quot_No_ || "";
        Part_No_ = Part_No_ || "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_Delivery_Order(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,@Account_Type_Id :=?, @User_Type :=?, @Login_User_Id :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, Account_Type_Id_, User_Type, Login_User_Id]).then(r => r[0]);
    },

    Get_Delivery_Order_Details: function (DeliveryOrderMaster_Id) {
        return db.promise().query("CALL Get_Delivery_Order_Details(@DeliveryOrderMaster_Id_:=?)", [DeliveryOrderMaster_Id]).then(r => r[0]);
    },

    Delete_Delivery_Order: function (DeliveryOrderMaster_Id_) {
        return db.promise().query("CALL Delete_Delivery_Order(@DeliveryOrderMaster_Id_ :=?)", [DeliveryOrderMaster_Id_]).then(r => r[0]);
    },

    Save_PackingDetails: async function (packinglist_master_, { log } = {}) {
        if (!packinglist_master_) throw new Error("Payload missing");
        packinglist_master_.TotalAmount = packinglist_master_.TotalAmount || 0;
        packinglist_master_.NetTotal = packinglist_master_.NetTotal || 0;
        packinglist_master_.TotalDiscount = packinglist_master_.TotalDiscount || 0;

        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                packinglist_master_.PackingList_Master_Id, packinglist_master_.EntryDate, packinglist_master_.Consignee_Address,
                packinglist_master_.Total_No_Of_Boxes, packinglist_master_.Box_Details, packinglist_master_.Total_Weight,
                packinglist_master_.Account_Party_Id, packinglist_master_.CurrencyId, packinglist_master_.PaymentTerms,
                packinglist_master_.AttendEmployee, packinglist_master_.Brand, packinglist_master_.PriceBasis, packinglist_master_.Delivery,
                packinglist_master_.Validity, packinglist_master_.Description1, packinglist_master_.User_Id,
                packinglist_master_.Delivery_Address1, packinglist_master_.Delivery_Address2, packinglist_master_.Delivery_Address3,
                packinglist_master_.Delivery_Address4, packinglist_master_.Payment_Term_Description, packinglist_master_.KindAttend,
                packinglist_master_.PaymentTermValue, packinglist_master_.Description2, packinglist_master_.SalesQuotationMaster_Id,
                packinglist_master_.TotalAmount, packinglist_master_.TotalDiscount, packinglist_master_.Total_Amount,
                packinglist_master_.NetTotal, packinglist_master_.Invoice_No, packinglist_master_.POnumber, packinglist_master_.packinglist_details,
            ]);
            if (log) log.info("sp.call", { name: "Save_PackingDetails" });
            return (new storedProcedure("Save_PackingDetails", params, connection)).result();
        }, { log });
    },

    Search_PackingDEtail: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_) {
        Quot_No_ = Quot_No_ || "";
        Part_No_ = Part_No_ || "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_PackingDEtail(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?, @User_Type_ :=?, @Login_User_Id_ :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_]).then(r => r[0]);
    },

    Get_Packing_Details: function (PackingList_Master_Id_) {
        return db.promise().query("CALL Get_Packing_Details(@PackingList_Master_Id_:=?)", [PackingList_Master_Id_]).then(r => r[0]);
    },

    Delete_Packing_Master: function (PackingList_Master_Id_) {
        return db.promise().query("CALL Delete_Packing_Master(@PackingList_Master_Id_ :=?)", [PackingList_Master_Id_]).then(r => r[0]);
    },

    Save_Sales_Returns_Master: async function (Sales_Return_Master_, { log } = {}) {
        if (!Sales_Return_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Sales_Return_Master_.Sales_Return_Master_Id, Sales_Return_Master_.Sales_Master_Id, Sales_Return_Master_.Account_Party_Id,
                Sales_Return_Master_.EntryDate, Sales_Return_Master_.Invoice_No, Sales_Return_Master_.User_Id,
                Sales_Return_Master_.Delivery_Address1, Sales_Return_Master_.Delivery_Address2, Sales_Return_Master_.Delivery_Address3,
                Sales_Return_Master_.Delivery_Address4, Sales_Return_Master_.Bill_Date, Sales_Return_Master_.LPONo,
                Sales_Return_Master_.DONo, Sales_Return_Master_.PackingListNumber, Sales_Return_Master_.CurrencyId,
                Sales_Return_Master_.TypeId, Sales_Return_Master_.PaymentTerms, Sales_Return_Master_.TotalAmount,
                Sales_Return_Master_.TotalDiscount, Sales_Return_Master_.TaxableAmount, Sales_Return_Master_.Roundoff_Amt,
                Sales_Return_Master_.NetTotal, Sales_Return_Master_.KindAttend, Sales_Return_Master_.Charge1,
                Sales_Return_Master_.charge1_Amount, Sales_Return_Master_.Charge2, Sales_Return_Master_.charge2_Amount,
                Sales_Return_Master_.Discount_Description, Sales_Return_Master_.Additional_Discount, Sales_Return_Master_.Description2,
                Sales_Return_Master_.Employee, Sales_Return_Master_.Basic_Discount, Sales_Return_Master_.Amount_In_Words,
                Sales_Return_Master_.Charge1per, Sales_Return_Master_.Payment_Term_Description, Sales_Return_Master_.VAT_percentage,
                Sales_Return_Master_.VAT_Amount, Sales_Return_Master_.SupplyDate, Sales_Return_Master_.DueDate,
                Sales_Return_Master_.CurrecnyName, Sales_Return_Master_.PaymentTermValue, Sales_Return_Master_.AttendEmployee,
                Sales_Return_Master_.Sales_Return_Details,
            ]);
            if (log) log.info("sp.call", { name: "Save_Sales_Returns_Master" });
            var result = await (new storedProcedure("Save_Sales_Returns_Master", params, connection)).result();
            if (result && result[0] && result[0].Sales_Return_Master_Id_ && Sales_Return_Master_.Company_Id) {
                try {
                    await connection.query("UPDATE sales_return_master SET Company_Id=? WHERE Sales_Return_Master_Id=?", [Sales_Return_Master_.Company_Id, result[0].Sales_Return_Master_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in sales_return_master. Column might be missing.", e);
                }
            }
            return result;
        }, { log });
    },

    Get_SalesReturn_Details: function (Sales_Return_Master_Id_) {
        return db.promise().query("CALL Get_SalesReturn_Details(@Sales_Return_Master_Id_:=?)", [Sales_Return_Master_Id_]).then(r => r[0]);
    },

    Delete_SalesReturn_Master: function (Sales_Return_Master_Id_) {
        return db.promise().query("CALL Delete_SalesReturn_Master(@Sales_Return_Master_Id_ :=?)", [Sales_Return_Master_Id_]).then(r => r[0]);
    },

    Save_AddStock: async function (Stock_Add_Master_, { log } = {}) {
        if (!Stock_Add_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Stock_Add_Master_.Stock_Add_Master_Id, Stock_Add_Master_.EntryDate, Stock_Add_Master_.Description, Stock_Add_Master_.User_Id, Stock_Add_Master_.Stock_Add_Details,
            ]);
            if (log) log.info("sp.call", { name: "Save_AddStock" });
            return (new storedProcedure("Save_AddStock", params, connection)).result();
        }, { log });
    },

    Search_AddStock: function (Is_Date_Check_, FromDate_, ToDate_, User_Type_, Login_User_Id_) {
        return db.promise().query("CALL Search_AddStock(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@User_Type_ :=?,@Login_User_Id_ :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, User_Type_, Login_User_Id_]).then(r => r[0]);
    },

    Get_AddStock_Details: function (Stock_Add_Master_Id_) {
        return db.promise().query("CALL Get_AddStock_Details(@Stock_Add_Master_Id_:=?)", [Stock_Add_Master_Id_]).then(r => r[0]);
    },

    Delete_AddStock_Master: function (Stock_Add_Master_Id_) {
        return db.promise().query("CALL Delete_AddStock_Master(@Stock_Add_Master_Id_ :=?)", [Stock_Add_Master_Id_]).then(r => r[0]);
    },

    Save_Price_Request: async function (Price_Request_Master_, { log } = {}) {
        if (!Price_Request_Master_) throw new Error("Payload missing");
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Price_Request_Master_.Price_Request_Master_Id,
                Price_Request_Master_.Account_Party_Id, Price_Request_Master_.EntryDate, Price_Request_Master_.POnumber,
                Price_Request_Master_.CurrencyId, Price_Request_Master_.PaymentTerms, Price_Request_Master_.AttendEmployee, Price_Request_Master_.TotalAmount,
                Price_Request_Master_.TotalDiscount, Price_Request_Master_.Roundoff_Amt, Price_Request_Master_.Total_Amount, Price_Request_Master_.Basic_Discount,
                Price_Request_Master_.NetTotal, Price_Request_Master_.Brand, Price_Request_Master_.PriceBasis, Price_Request_Master_.Delivery,
                Price_Request_Master_.Validity, Price_Request_Master_.Description1, Price_Request_Master_.User_Id, Price_Request_Master_.Delivery_Address1,
                Price_Request_Master_.Delivery_Address2, Price_Request_Master_.Delivery_Address3, Price_Request_Master_.Delivery_Address4, Price_Request_Master_.Charge1,
                Price_Request_Master_.charge1_Amount, Price_Request_Master_.Charge2, Price_Request_Master_.charge2_Amount, Price_Request_Master_.Discount_Description,
                Price_Request_Master_.Additional_Discount, Price_Request_Master_.Description2, Price_Request_Master_.Amount_In_Words, Price_Request_Master_.PreparedBy,
                Price_Request_Master_.Charge1per, Price_Request_Master_.Payment_Term_Description, Price_Request_Master_.VAT_Percentage, Price_Request_Master_.VAT_Amount, Price_Request_Master_.TaxableAmount,
                Price_Request_Master_.KindAttend, Price_Request_Master_.PaymentTermValue, Price_Request_Master_.Supplier_Ref_No,
                Price_Request_Master_.Mobile_No, Price_Request_Master_.Email, Price_Request_Master_.Price_Request_Details,
            ]);
            if (log) log.info("sp.call", { name: "Save_Price_Request" });
            var result = await (new storedProcedure("Save_Price_Request", params, connection)).result();
            if (result && result[0] && result[0].Price_Request_Master_Id_ && Price_Request_Master_.Company_Id) {
                try {
                    await connection.query("UPDATE price_request_master SET Company_Id=? WHERE Price_Request_Master_Id=?", [Price_Request_Master_.Company_Id, result[0].Price_Request_Master_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in price_request_master. Column might be missing.", e);
                }
            }
            return result;
        }, { log });
    },

    Search_Price_Request: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_) {
        Quot_No_ = Quot_No_ || "";
        Part_No_ = Part_No_ || "";
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        return db.promise().query("CALL Search_Price_Request(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?, @User_Type_ :=?, @Login_User_Id_ :=?)",
            [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_]).then(r => r[0]);
    },

    Get_Price_Request_Details: function (Price_Request_Master_Id_) {
        return db.promise().query("CALL Get_Price_Request_Details(@Price_Request_Master_Id_:=?)", [Price_Request_Master_Id_]).then(r => r[0]);
    },

    Delete_Price_Request_Master: function (Price_Request_Master_Id_) {
        return db.promise().query("CALL Delete_Price_Request_Master(@Price_Request_Master_Id_ :=?)", [Price_Request_Master_Id_]).then(r => r[0]);
    },

    Load_Price_Request_Master: function (Price_Request_Master_Id_) {
        return db.promise().query("CALL Load_Price_Request_Master(@Price_Request_Master_Id_ :=?)", [Price_Request_Master_Id_]).then(r => r[0]);
    },

    Get_Next_Price_Request_No: async function (EntryDate_) {
        const entryDate = EntryDate_ ? String(EntryDate_) : null;
        // Determine the accounting year range for the given entry date
        const [yrRows] = await db.promise().query(
            "SELECT YearFrom, YearTo FROM Account_Years WHERE DATE(?) BETWEEN DATE(YearFrom) AND DATE(YearTo) LIMIT 1",
            [entryDate || new Date()]
        );

        let yearFrom = null;
        let yearTo = null;
        if (Array.isArray(yrRows) && yrRows.length > 0) {
            yearFrom = yrRows[0].YearFrom;
            yearTo = yrRows[0].YearTo;
        }

        let maxQuery = "SELECT COALESCE(MAX(RequestNumber),0) AS MaxNo FROM price_request_master WHERE DeleteStatus = 0";
        const params = [];
        if (yearFrom && yearTo) {
            maxQuery += " AND DATE(EntryDate) BETWEEN DATE(?) AND DATE(?)";
            params.push(yearFrom, yearTo);
        }

        const [rows] = await db.promise().query(maxQuery, params);
        const maxNo = rows && rows[0] ? Number(rows[0].MaxNo || 0) : 0;
        return [{ NextNo: maxNo + 1 }];
    },

    Get_ReferenceId_ByQuotation: function (SalesQuotationMaster_Id_) {
        const qid = Number(SalesQuotationMaster_Id_ || 0);
        if (!qid) return Promise.resolve([[]]);
        return db.promise().query("SELECT ReferenceID FROM Reference_Quotation WHERE QuotationID = ? ORDER BY ReferenceID DESC LIMIT 1", [qid]).then(r => [r[0]]);
    },

    Get_Proforma_History_ByReference: async function (ReferenceID_) {
        const refId = Number(ReferenceID_ || 0);
        if (!refId) return [[]];
        const rows = await db.promise().query("SELECT QuotationID FROM Reference_Quotation WHERE ReferenceID = ?", [refId]).then(r => r[0]);
        const quotationIds = (rows || []).map(r => Number(r.QuotationID || 0)).filter(x => x > 0);
        if (quotationIds.length === 0) return [[]];
        let combined = [];
        for (const qid of quotationIds) {
            const spRows = await db.promise().query("CALL Get_Proforma_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [qid]).then(r => r[0]);
            if (spRows && spRows[0]) combined = combined.concat(spRows[0]);
        }
        return [combined];
    },

    Update_Quotation_Workflow_Status: async function (SalesQuotationMaster_Id_, StatusCode_) {
        const qid = Number(SalesQuotationMaster_Id_ || 0);
        const status = String(StatusCode_ || '').trim();
        if (!qid || !status) return [{ ok: 0 }];

        await db.promise().query(`
            CREATE TABLE IF NOT EXISTS quotation_workflow_status (
                id INT NOT NULL AUTO_INCREMENT,
                quotation_id INT NOT NULL,
                status_code VARCHAR(64) NOT NULL,
                entry_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                KEY idx_qws_quotation_id (quotation_id),
                KEY idx_qws_status_code (status_code)
            )
        `);
        await db.promise().query("INSERT INTO quotation_workflow_status (quotation_id, status_code) VALUES (?, ?)", [qid, status]);
        
        let statusInt = 1;
        let statusId = 1;
        let statusName = 'Pending';
        if (status === 'APPROVED') {
            statusInt = 3;
            statusId = 2;
            statusName = 'Approved';
        } else if (status === 'CONFIRMED') {
            statusInt = 5;
            statusId = 2;
            statusName = 'Approved';
        } else if (status === 'PENDING') {
            statusInt = 2;
            statusId = 1;
            statusName = 'Pending';
        } else if (status === 'REJECTED') {
            statusInt = 4;
            statusId = 3;
            statusName = 'Reject';
        } else if (status === 'DRAFT') {
            statusInt = 1;
            statusId = 1;
            statusName = 'Pending';
        }

        await db.promise().query("UPDATE salesquotationmaster SET workflow_status = ?, Status = ?, Status_Id = ?, Status_Name = ? WHERE SalesQuotationMaster_Id = ?", [status, statusInt, statusId, statusName, qid]);
        return [{ ok: 1 }];
    },

    Change_Bill_Status: function (Sales_Master_Id_, BillType_) {
        return db.promise().query("CALL Change_Bill_Status(@Sales_Master_Id_ :=?,@BillType_ :=?)", [Sales_Master_Id_, BillType_]).then(r => r[0]);
    },

    Search_Sales_Master_Mobile: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Invoice_No_, Employee_Id_) {
        return db.promise().query("CALL Search_Sales_Master_Mobile(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Invoice_No_ :=?,@Employee_Id_ :=?)", [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Invoice_No_, Employee_Id_]).then(r => r[0]);
    },

    Get_Sales_Master_Mobile: function (Sales_Master_Id_) {
        return db.promise().query("CALL Get_Sales_Master(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Get_Sales_Details_forprint: function (Sales_Master_Id_) {
        return db.promise().query("CALL Get_Sales_Details_forprint(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Selected_Delete: function (Sales_Master_Id_) {
        return db.promise().query("CALL Selected_Delete(@Sales_Master_Id_:=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Get_Store_Details: function (Store_Id_) {
        return db.promise().query("CALL Get_Store_Details(@Store_Id_ :=?)", [Store_Id_]).then(r => r[0]);
    },

    Get_Receipt_Voucher_Mobile: function (Sales_Master_Id_) {
        return db.promise().query("CALL Get_Receipt_Voucher_Mobile(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Search_Key_Value: function (Key_Value_Name_) {
        return db.promise().query("CALL Search_Key_Value(@Key_Value_Name_ :=?)", [Key_Value_Name_]).then(r => r[0]);
    },

    Delete_Sales_Master_Mobile: function (Sales_Master_Id_) {
        return db.promise().query("CALL Delete_Sales_Master_Mobile(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Save_Prodution_Master: async function (Prodution_Master_) {
        return withTransaction(async ({ connection }) => {
            const params = normalizeParams([
                Prodution_Master_.Prodution_Master_Id, Prodution_Master_.Date,
                Prodution_Master_.Labour_Charge, Prodution_Master_.Additional_Expense, Prodution_Master_.Production_No, Prodution_Master_.UserId,
                Prodution_Master_.TotalAmount, Prodution_Master_.Prodcution_Details, Prodution_Master_.Production_Materials
            ]);
            return (new storedProcedure("Save_Prodution_Master", params, connection)).result();
        });
    },

    Search_Prodution_Master: function (Is_Date_Check_, FromDate_, ToDate_, Production_No_) {
        return db.promise().query("CALL Search_Prodution_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Production_No_ :=?)", [Is_Date_Check_, FromDate_, ToDate_, Production_No_]).then(r => r[0]);
    },

    Delete_Prodution_Master: function (Prodution_Master_Id_) {
        return db.promise().query("CALL Delete_Prodution_Master(@Prodution_Master_Id_ :=?)", [Prodution_Master_Id_]).then(r => r[0]);
    },

    Get_Prodution_Master: function (Prodution_Master_Id_) {
        return db.promise().query("CALL Get_Prodution_Master(@Prodution_Master_Id_ :=?)", [Prodution_Master_Id_]).then(r => r[0]);
    },

    Load_B2B_SaleTax_Report: function (From_date_, To_date_) {
        return db.promise().query("CALL Load_B2B_SaleTax_Report(@From_date_ :=?,@To_date_ :=?)", [From_date_, To_date_]).then(r => r[0]);
    },

    Load_B2C_SaleTax_Report: function (From_date_, To_date_) {
        return db.promise().query("CALL Load_B2C_SaleTax_Report(@From_date_ :=?,@To_date_ :=?)", [From_date_, To_date_]).then(r => r[0]);
    },

    Load_StatementofAccount_Report: function (Client_Id_, FromDate_, ToDate_, Voucher_, CurrencyId_, TypeId_, User_Type, Login_User) {
        return db.promise().query("CALL Load_StatementofAccount_Report(@Client_Id_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Voucher_ :=?,@CurrencyId_ :=?,@TypeId_ :=?,@User_Type :=?, @Login_User :=?)", [Client_Id_, FromDate_, ToDate_, Voucher_, CurrencyId_, TypeId_, User_Type, Login_User]).then(r => r[0]);
    },

    Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo: function (DeliveryOrderMaster_Id_) {
        return db.promise().query("CALL Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(@DeliveryOrderMaster_Id_ :=?)", [DeliveryOrderMaster_Id_]).then(r => r[0]);
    },

    Load_Profoma_Items_Pending_List_ByQuotation: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_Profoma_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_Invoice_Items_Pending_List_ByQuotation: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_Invoice_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_Delivery_Items_Pending_List_ByQuotation: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_Delivery_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_Purchase_Items_Pending_List_ByQuotation: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_Purchase_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_PackingList_Items_Pending_List_ByQuotation: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_PackingList_Items_Pending_List_ByQuotation_new(@SalesQuotationMaster_Id_:=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_GRn_Pending_List_ByPurchaseOrder: function (Purchase_OrderMaster_Id_) {
        return db.promise().query("CALL Load_GRn_Pending_List_ByPurchaseOrder_new(@Purchase_OrderMaster_Id_:=?)", [Purchase_OrderMaster_Id_]).then(r => r[0]);
    },

    Search_GRN_Order: function (Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, Account_Type_Id_) {
        return db.promise().query("CALL Search_GRN_Order(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_ :=?,@Account_Type_Id :=?)", [Is_Date_Check_, FromDate_, ToDate_, Account_Party_Id_, Quot_No_, Part_No_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, Account_Type_Id_]).then(r => r[0]);
    },

    Load_Delivery_Order_Master: function (DeliveryOrderMaster_Id_) {
        return db.promise().query("CALL Load_Delivery_Order_Master(@DeliveryOrderMaster_Id_ :=?)", [DeliveryOrderMaster_Id_]).then(r => r[0]);
    },

    Load_SalesQuotationMaster: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Load_SalesQuotationMaster(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Get_Proforma_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_Proforma_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Load_PerformaInvoiceMaster: function (PerformaInvoiceMaster_Id_) {
        return db.promise().query("CALL Load_PerformaInvoiceMaster(@PerformaInvoiceMaster_Id_ :=?)", [PerformaInvoiceMaster_Id_]).then(r => r[0]);
    },

    Get_Salesmaster_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_Salesmaster_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Get_Proforma_InvoiceClick_Details: function (PerformaInvoiceMaster_Id_Edit_) {
        return db.promise().query("CALL Get_Proforma_InvoiceClick_Details(@PerformaInvoiceMaster_Id_Edit_ :=?)", [PerformaInvoiceMaster_Id_Edit_]).then(r => r[0]);
    },

    Load_SalesMaster: function (Sales_Master_Id_) {
        return db.promise().query("CALL Load_SalesMaster(@Sales_Master_Id_ :=?)", [Sales_Master_Id_]).then(r => r[0]);
    },

    Get_Proforma_DOClick_Details: function (PerformaInvoiceMaster_Id_Edit_) {
        return db.promise().query("CALL Get_Proforma_DOClick_Details(@PerformaInvoiceMaster_Id_Edit_ :=?)", [PerformaInvoiceMaster_Id_Edit_]).then(r => r[0]);
    },

    Get_DeliveryOrder_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_DeliveryOrder_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Get_Purchase_order_GRNClick_Details: function (Purchase_OrderMaster_Id_Edit_) {
        return db.promise().query("CALL Get_Purchase_order_GRNClick_Details(@Purchase_OrderMaster_Id_Edit_ :=?)", [Purchase_OrderMaster_Id_Edit_]).then(r => r[0]);
    },

    Get_PurchaseOrder_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_PurchaseOrder_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Get_PackingList_Quotation_Details: function (SalesQuotationMaster_Id_) {
        return db.promise().query("CALL Get_PackingList_Quotation_Details(@SalesQuotationMaster_Id_ :=?)", [SalesQuotationMaster_Id_]).then(r => r[0]);
    },

    Get_Delivery_Salesmaster: function (DeliveryOrderMaster_Id_) {
        return db.promise().query("CALL Get_Delivery_Salesmaster_1(@DeliveryOrderMaster_Id :=?)", [DeliveryOrderMaster_Id_]).then(r => r[0]);
    },

    Get_Item_Code_Typeahead_For_Purchase_Return: function (Purchase_Master_Id_, Item_Code_) {
        return db.promise().query("CALL Get_Item_Code_Typeahead_For_Purchase_Return(@Purchase_Master_Id_ :=?,@Item_Code_ :=?)", [Purchase_Master_Id_, Item_Code_ || '']).then(r => r[0]);
    },

    Get_Item_Name_Typeahead_For_Purchase_Return: function (Purchase_Master_Id_, Item_Name_) {
        return db.promise().query("CALL Get_Item_Name_Typeahead_For_Purchase_Return(@Purchase_Master_Id_ :=?,@Item_Name_ :=?)", [Purchase_Master_Id_, Item_Name_ || '']).then(r => r[0]);
    },

    Get_Item_Code_Typeahead_For_Sales_Return: function (Sales_Master_Id_, Item_Code_) {
        return db.promise().query("CALL Get_Item_Code_Typeahead_For_Sales_Return(@Sales_Master_Id_ :=?,@Item_Code_ :=?)", [Sales_Master_Id_, Item_Code_ || '']).then(r => r[0]);
    },

    Get_Item_Name_Typeahead_For_Sales_Return: function (Sales_Master_Id_, Item_Name_) {
        return db.promise().query("CALL Get_Item_Name_Typeahead_For_Sales_Return(@Sales_Master_Id_ :=?,@Item_Name_ :=?)", [Sales_Master_Id_, Item_Name_ || '']).then(r => r[0]);
    },

            Get_Max_Sales_Invoice_No: function () {
        return new Promise(async (resolve, reject) => {
            const pool = db.promise();
            var connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT COALESCE(MAX(CAST(Invoice_No AS UNSIGNED)), 0) AS MaxNo FROM sales_master WHERE Invoice_No REGEXP '^[0-9]+$'");
                const maxNo = rows && rows[0] ? Number(rows[0].MaxNo || 0) : 0;
                resolve([{ MaxNo: maxNo }]);
            } catch (err) {
                reject(err);
            } finally {
                if (connection) connection.release();
            }
        });
    },
Get_Max_Performa_Invoice_No: function () {
        return new Promise(async (resolve, reject) => {
            const pool = db.promise();
            var connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT COALESCE(MAX(CAST(PerformaInvNo AS UNSIGNED)), 0) AS MaxNo FROM performainvoicemaster WHERE PerformaInvNo REGEXP '^[0-9]+$'");
                const maxNo = rows && rows[0] ? Number(rows[0].MaxNo || 0) : 0;
                resolve([{ MaxNo: maxNo }]);
            } catch (err) {
                reject(err);
            } finally {
                connection.release();
            }
        });
    },

    Get_Max_Quotation_No: function () {
        return new Promise(async (resolve, reject) => {
            const pool = db.promise();
            var connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT COALESCE(MAX(CAST(QuotationNo AS UNSIGNED)), 0) AS MaxNo FROM salesquotationmaster WHERE QuotationNo REGEXP '^[0-9]+$'");
                const maxNo = rows && rows[0] ? Number(rows[0].MaxNo || 0) : 0;
                resolve([{ MaxNo: maxNo }]);
            } catch (err) {
                reject(err);
            } finally {
                connection.release();
            }
        });
    },
};

module.exports = Sales_Master;


