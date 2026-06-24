var db = require('../dbconnection');
var fs = require('fs');
const storedProcedure = require('../helpers/stored-procedure');
const Lead = require('./Lead');
var requirementmaster = {

    Save_Requirement: async function (requirementmaster_, { log } = {}) {
        if (!requirementmaster_) throw new Error("Payload missing");
        const { withTransaction, normalizeParams } = require("../helpers/transaction");
        return withTransaction(async ({ connection }) => {
            
            const safeNum = (val) => {
                const parsed = Number(val);
                return isNaN(parsed) ? 0 : parsed;
            };

            const params = normalizeParams([
                safeNum(requirementmaster_.RequirementMaster_Id), 
                safeNum(requirementmaster_.Account_Party_Id), 
                requirementmaster_.EntryDate || new Date().toISOString().split('T')[0],
                requirementmaster_.RequirementNo || "0", 
                requirementmaster_.POnumber || "", 
                safeNum(requirementmaster_.CurrencyId),
                requirementmaster_.PaymentTerms || "", 
                safeNum(requirementmaster_.AttendEmployee), 
                safeNum(requirementmaster_.TotalAmount),
                safeNum(requirementmaster_.TotalDiscount), 
                safeNum(requirementmaster_.Roundoff_Amt), 
                safeNum(requirementmaster_.Total_Amount),
                safeNum(requirementmaster_.Basic_Discount), 
                safeNum(requirementmaster_.NetTotal), 
                requirementmaster_.Brand || "",
                requirementmaster_.PriceBasis || "", 
                requirementmaster_.Delivery || "", 
                requirementmaster_.Validity || "",
                requirementmaster_.Description1 || "", 
                safeNum(requirementmaster_.User_Id), 
                requirementmaster_.Delivery_Address1 || "",
                requirementmaster_.Delivery_Address2 || "", 
                requirementmaster_.Delivery_Address3 || "", 
                requirementmaster_.Delivery_Address4 || "",
                safeNum(requirementmaster_.Charge1), 
                safeNum(requirementmaster_.charge1_Amount), 
                safeNum(requirementmaster_.Charge2),
                safeNum(requirementmaster_.charge2_Amount), 
                safeNum(requirementmaster_.Discount_Description), 
                safeNum(requirementmaster_.Additional_Discount),
                requirementmaster_.Description2 || "", 
                requirementmaster_.Amount_In_Words || "", 
                safeNum(requirementmaster_.PreparedBy),
                safeNum(requirementmaster_.Charge1per), 
                safeNum(requirementmaster_.Payment_Term_Description), 
                safeNum(requirementmaster_.VAT_Percentage),
                safeNum(requirementmaster_.VAT_Amount), 
                safeNum(requirementmaster_.TaxableAmount), 
                safeNum(requirementmaster_.KindAttend),
                safeNum(requirementmaster_.PaymentTermValue), 
                requirementmaster_.Supplier_Ref_No || "", 
                requirementmaster_.Requirement_Details
            ]);
            if (log) log.info("sp.call", { name: "Save_Requirement" });
            let result;
            try {
                result = await (new storedProcedure("Save_Requirement", params, connection)).result();
            } catch (err) {
                if (err && err.code === "ER_SP_WRONG_NO_OF_ARGS") {
                    const legacyParams = params.slice(0, 40).concat(params.slice(41));
                    result = await (new storedProcedure("Save_Requirement", legacyParams, connection)).result();
                } else {
                    throw err;
                }
            }
            if (result && result[0] && result[0].RequirementMaster_Id_ && requirementmaster_.Company_Id) {
                try {
                    await connection.query("UPDATE requirementmaster SET Company_Id=? WHERE RequirementMaster_Id=?", [requirementmaster_.Company_Id, result[0].RequirementMaster_Id_]);
                } catch (e) {
                    if (log) log.error("Failed to update Company_Id in requirementmaster. Column might be missing.", e);
                }
            }
            if (requirementmaster_.Lead_Id) {
                Lead.Add_Lead_Activity({
                    Lead_Id: Number(requirementmaster_.Lead_Id),
                    Activity_Type: 'REQUIREMENT_ADDED',
                    Activity_Title: 'Requirement added',
                    New_Value: requirementmaster_.RequirementNo || requirementmaster_.Description1 || '',
                    User_Id: Number(requirementmaster_.User_Id || requirementmaster_.Login_User_Id || 0)
                }, () => {});
            }
            return result;
        }, { log });
    },

    Get_Next_Requirement_No: async function () {
        // RequirementNo is stored as string but usually numeric; follow Save_Requirement SP logic (MAX(CAST(...))+1)
        const [rows] = await db.promise().query(
            "SELECT COALESCE(MAX(CAST(RequirementNo AS UNSIGNED)),0) AS MaxNo FROM requirementmaster WHERE DeleteStatus = 0"
        );
        const maxNo = rows && rows[0] ? Number(rows[0].MaxNo || 0) : 0;
        return [{ NextNo: maxNo + 1 }];
    },
    Delete_requirementmaster: function (requirementmaster_Id_, callback) {
        return db.query("CALL Delete_requirementmaster(@requirementmaster_Id_ :=?)", [requirementmaster_Id_], callback);
    },

    Get_requirementmaster: function (requirementmaster_Id_, callback) {
        return db.query("CALL Get_requirementmaster(@requirementmaster_Id_ :=?)", [requirementmaster_Id_], callback);
    },

    Search_Requirement: function (Is_Date_Check_, From_Date_, To_Date_, Customer_, RequirementNo_, partNo_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_, callback) {
        if (RequirementNo_ === undefined || RequirementNo_ === "undefined" || RequirementNo_ === null) RequirementNo_ = '';
        if (partNo_ === undefined || partNo_ === "undefined" || partNo_ === null) partNo_ = '';
        return db.query("CALL Search_Requirement(@Is_Date_Check_ :=?, @From_Date_ :=?, @To_Date_ :=?, @Customer_ :=?, @RequirementNo_ :=?, @partNo_ :=?, @Item_Group_Id_ :=?, @CurrencyDetails_Id_ :=?, @User_Details_Id_ :=?, @User_Type_ :=?, @Login_User_Id_ :=?)",
            [Is_Date_Check_, From_Date_, To_Date_, Customer_, RequirementNo_, partNo_, Item_Group_Id_, CurrencyDetails_Id_, User_Details_Id_, User_Type_, Login_User_Id_], callback);
    },

    Get_Requirement_Details: function (Requirement_Master_Id_, callback) {
        return db.query("CALL Get_Requirement_Details(@Requirement_Master_Id_ :=?)", [Requirement_Master_Id_], callback);
    },

    Get_Bill_Type: function (Group_Id_, callback) {
        return db.query("CALL Get_Bill_Type(@Group_Id_ :=?)", [Group_Id_], callback);
    },

    Load_Company: function (callback) {
        return db.query("CALL Load_Company()", [], callback);
    },

    Load_Vat_Percentage: function (callback) {
        return db.query("CALL Load_Vat_Percentage()", [], callback);
    },

    Get_salesPerformaInvoicemaster: function (PerformaInvoiceId_, callback) {
        return db.query("CALL Get_salesPerformaInvoicemaster(@PerformaInvoiceId_ :=?)", [PerformaInvoiceId_], callback);
    },

    Get_salesGRNmaster: function (requirementmaster_Id_, callback) {
        return db.query("CALL Get_salesGRNmaster(@requirementmaster_Id_ :=?)", [requirementmaster_Id_], callback);
    },

    Load_DeliveryOrder: function (DeliveryOrderMaster_Id_, callback) {
        return db.query("CALL Load_DeliveryOrder(@DeliveryOrderMaster_Id_ :=?)", [DeliveryOrderMaster_Id_], callback);
    },

    Load_PurchaseOrder: function (PurchaseOrderMaster_Id_, callback) {
        return db.query("CALL Load_PurchaseOrder(@PurchaseOrderMaster_Id_ :=?)", [PurchaseOrderMaster_Id_], callback);
    },

    /*** Added on 18-10-2024 */
    Load_PackingList: function (PackingList_Master_Id_, callback) {
        return db.query("CALL Load_PackingList(@PackingList_Master_Id_ :=?)", [PackingList_Master_Id_], callback);
    },

    Get_Salesmaster_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_Salesmaster_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_DeliveryOrder_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_DeliveryOrder_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_PackingList_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_PackingList_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_PurchaseOrder_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_PurchaseOrder_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Load_Profoma_Items_Pending_List_ByRequirement: function (Requirement_Master_Id, callback) {
        return db.query("CALL Load_Profoma_Items_Pending_List_ByRequirement(@Requirement_Master_Id :=?)", [Requirement_Master_Id], callback);
    },

    Load_Invoice_Items_Pending_List_ByRequirement: function (Requirement_Master_Id, callback) {
        return db.query("CALL Load_Invoice_Items_Pending_List_ByRequirement(@Requirement_Master_Id :=?)", [Requirement_Master_Id], callback);
    },

    Load_Delivery_Items_Pending_List_ByRequirement: function (Requirement_Master_Id, callback) {
        return db.query("CALL Load_Delivery_Items_Pending_List_ByRequirement(@Requirement_Master_Id :=?)", [Requirement_Master_Id], callback);
    },

    Load_Purchase_Items_Pending_List_ByRequirement: function (Requirement_Master_Id, callback) {
        return db.query("CALL Load_Purchase_Items_Pending_List_ByRequirement(@Requirement_Master_Id :=?)", [Requirement_Master_Id], callback);
    },

    Load_PackingList_Items_Pending_List_ByRequirement: function (Requirement_Master_Id, callback) {
        return db.query("CALL Load_PackingList_Items_Pending_List_ByRequirement(@Requirement_Master_Id :=?)", [Requirement_Master_Id], callback);
    },

    Get_Proforma_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_Proforma_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_Quotation_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_Quotation_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_PriceRequest_Requirement_Details: function (Requirement_Master_Id_Edit, callback) {
        return db.query("CALL Get_PriceRequest_Requirement_Details(@Requirement_Master_Id_Edit :=?)", [Requirement_Master_Id_Edit], callback);
    },

    Get_Quotation_Pending_Items: function (Requirement_Master_Id, callback) {
        const sql = `
            SELECT 
                rd.*, 
                rd.Quantity AS ReferenceQuantity,
                COALESCE(SUM(sqd.Quantity), 0) AS QuotedQuantity,
                (rd.Quantity - COALESCE(SUM(sqd.Quantity), 0)) AS BalanceQuantity
            FROM requirementdetails rd
            LEFT JOIN Reference_Quotation rq ON rd.RequirementMaster_Id = rq.ReferenceID
            LEFT JOIN salesquotationdetails sqd ON rq.QuotationID = sqd.QuotationMaster_Id AND rd.ItemId = sqd.ItemId
            WHERE rd.RequirementMaster_Id = ? AND IFNULL(rd.DeleteStatus,0) = 0
            GROUP BY rd.RequirementDetails_Id
            HAVING BalanceQuantity > 0
        `;
        return db.query(sql, [Requirement_Master_Id], function(err, rows) {
            if (err) return callback(err, null);
            callback(null, [rows]);
        });
    },

    Get_PriceRequest_Pending_Items: function (Requirement_Master_Id, callback) {
        const sql = `
            SELECT 
                rd.*, 
                rd.Quantity AS ReferenceQuantity,
                COALESCE(SUM(prd.Quantity), 0) AS RequestedQuantity,
                (rd.Quantity - COALESCE(SUM(prd.Quantity), 0)) AS BalanceQuantity
            FROM requirementdetails rd
            LEFT JOIN Price_Request_Reference prr ON rd.RequirementMaster_Id = prr.ReferenceID
            LEFT JOIN price_request_details prd ON prr.RequestID = prd.PriceRequestMaster_Id AND rd.ItemId = prd.ItemId
            WHERE rd.RequirementMaster_Id = ? AND IFNULL(rd.DeleteStatus,0) = 0
            GROUP BY rd.RequirementDetails_Id
            HAVING BalanceQuantity > 0
        `;
        return db.query(sql, [Requirement_Master_Id], function(err, rows) {
            if (err) return callback(err, null);
            callback(null, [rows]);
        });
    },

    Get_Requirement_By_No: function (RequirementNo, callback) {
        return db.query("SELECT * FROM requirementmaster WHERE RequirementNo = ? AND IFNULL(DeleteStatus,0) = 0 LIMIT 1", [RequirementNo], callback);
    },

    Check_Requirement_By_Lead: function (Lead_Id, callback) {
        const sql = `
            SELECT lal.*, rm.RequirementMaster_Id 
            FROM lead_activity_log lal
            JOIN requirementmaster rm ON lal.New_Value = rm.RequirementNo
            WHERE lal.Lead_Id = ? 
              AND lal.Activity_Type = 'REQUIREMENT_ADDED' 
              AND IFNULL(lal.DeleteStatus,0) = 0
              AND IFNULL(rm.DeleteStatus,0) = 0
            ORDER BY lal.Activity_Date DESC LIMIT 1
        `;
        return db.query(sql, [Lead_Id], callback);
    },

    Get_requirementmaster_Promise: function (id) {
        return new Promise((resolve, reject) => {
            this.Get_requirementmaster(id, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    Get_Requirement_Details_Promise: function (id) {
        return new Promise((resolve, reject) => {
            this.Get_Requirement_Details(id, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    Load_Company_Promise: function () {
        return new Promise((resolve, reject) => {
            this.Load_Company((err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};

module.exports = requirementmaster;
