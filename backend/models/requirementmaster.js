var db = require('../dbconnection');
var fs = require('fs');
const storedProcedure = require('../helpers/stored-procedure');
var requirementmaster = {

Save_Requirement: async function (requirementmaster_) {
        console.log('requirementmaster_ :',requirementmaster_);

        return new Promise(async (rs,rej)=>{
          const pool = db.promise();
          var connection = await pool.getConnection();
          try 
          {
           const result1 = await(new storedProcedure('Save_Requirement',[requirementmaster_.RequirementMaster_Id,
               requirementmaster_.Account_Party_Id,requirementmaster_.EntryDate,requirementmaster_.RequirementNo,requirementmaster_.POnumber,
               requirementmaster_.CurrencyId,requirementmaster_.PaymentTerms,requirementmaster_.AttendEmployee,requirementmaster_.TotalAmount,
               requirementmaster_.TotalDiscount,requirementmaster_.Roundoff_Amt,requirementmaster_.Total_Amount,requirementmaster_.Basic_Discount,
               requirementmaster_.NetTotal, requirementmaster_.Brand, requirementmaster_.PriceBasis, requirementmaster_.Delivery,
               requirementmaster_.Validity, requirementmaster_.Description1, requirementmaster_.User_Id, requirementmaster_.Delivery_Address1,
               requirementmaster_.Delivery_Address2, requirementmaster_.Delivery_Address3, requirementmaster_.Delivery_Address4, requirementmaster_.Charge1,
               requirementmaster_.charge1_Amount, requirementmaster_.Charge2, requirementmaster_.charge2_Amount,requirementmaster_.Discount_Description,
               requirementmaster_.Additional_Discount, requirementmaster_.Description2,requirementmaster_.Amount_In_Words,requirementmaster_.PreparedBy,
               requirementmaster_.Charge1per,requirementmaster_.Payment_Term_Description,requirementmaster_.VAT_Percentage,requirementmaster_.VAT_Amount,
               requirementmaster_.TaxableAmount,requirementmaster_.KindAttend,requirementmaster_.PaymentTermValue,requirementmaster_.Supplier_Ref_No,
               requirementmaster_.Requirement_Details], connection)).result();
                   console.log(result1)
               await connection.commit();
                connection.release();
              console.log(result1);
                rs( result1);
              }
           catch (err) {
           console.log(err);
           await connection.rollback();
           rej(err);
           var result2=[{'Sales_Master_Id_':0}]      
           rs(result2);
         }
         finally 
         {
         connection.release();
      }
    })
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
        return db.query(sql, [Requirement_Master_Id], callback);
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
        return db.query(sql, [Requirement_Master_Id], callback);
    }
};

module.exports = requirementmaster;


