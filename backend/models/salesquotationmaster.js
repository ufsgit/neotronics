 var db=require('../dbconnection');
 var fs = require('fs');
 var salesquotationmaster=
 { 
 Save_salesquotationmaster:function(salesquotationmaster_,callback)
 { 
return db.query("CALL Save_salesquotationmaster("+
"@SalesQuotationMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@SONo_ :=?,"+
"@QuotationNo_ :=?,"+
"@POnumber_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@AttendEmployee_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@Roundoff_Amt_ :=?,"+
"@Total_Amount_ :=?,"+
"@NetTotal_ :=?,"+
"@Brand_ :=?,"+
"@PriceBasis_ :=?,"+
"@Delivery_ :=?,"+
"@Validity_ :=?,"+
"@Description1_ :=?,"+
"@User_Id_ :=?,"+
"@Delivery_Address1_ :=?,"+
"@Delivery_Address2_ :=?,"+
"@Delivery_Address3_ :=?,"+
"@Delivery_Address4_ :=?,"+
"@KindAttend_ :=?,"+
"@Charge1_ :=?,"+
"@charge1_Amount_ :=?,"+
"@Charge2_ :=?,"+
"@charge2_Amount_ :=?,"+
"@Discount_Description_ :=?,"+
"@Additional_Discount_ :=?,"+
"@Description2_ :=?,"+
"@Basic_Discount_ :=?,"+
"@Amount_In_Words_ :=?,"+
"@PreparedBy_ :=?,"+
"@Charge1per_ :=?,"+
"@Payment_Term_Description_ :=?,"+
"@VAT_Description_ :=?,"+
"@VAT_Percentage_ :=?,"+
"@VAT_Amount_ :=?,"+
"@SalesQuotation_Image_ :=?,"+
"@Acknolodgement_Image_ :=?,"+
"@CurrecnyName_ :=?,"+
"@UserName_ :=?"+")"
 ,[salesquotationmaster_.SalesQuotationMaster_Id,
salesquotationmaster_.Account_Party_Id,
salesquotationmaster_.EntryDate,
salesquotationmaster_.SONo,
salesquotationmaster_.QuotationNo,
salesquotationmaster_.POnumber,
salesquotationmaster_.CurrencyId,
salesquotationmaster_.TypeId,
salesquotationmaster_.PaymentTerms,
salesquotationmaster_.AttendEmployee,
salesquotationmaster_.TotalAmount,
salesquotationmaster_.TotalDiscount,
salesquotationmaster_.TaxableAmount,
salesquotationmaster_.VatAmount,
salesquotationmaster_.Roundoff_Amt,
salesquotationmaster_.Total_Amount,
salesquotationmaster_.NetTotal,
salesquotationmaster_.Brand,
salesquotationmaster_.PriceBasis,
salesquotationmaster_.Delivery,
salesquotationmaster_.Validity,
salesquotationmaster_.Description1,
salesquotationmaster_.User_Id,
salesquotationmaster_.Delivery_Address1,
salesquotationmaster_.Delivery_Address2,
salesquotationmaster_.Delivery_Address3,
salesquotationmaster_.Delivery_Address4,
salesquotationmaster_.KindAttend,
salesquotationmaster_.Charge1,
salesquotationmaster_.charge1_Amount,
salesquotationmaster_.Charge2,
salesquotationmaster_.charge2_Amount,
salesquotationmaster_.Discount_Description,
salesquotationmaster_.Additional_Discount,
salesquotationmaster_.Description2,
salesquotationmaster_.Basic_Discount,
salesquotationmaster_.Amount_In_Words,
salesquotationmaster_.PreparedBy,
salesquotationmaster_.Charge1per,
salesquotationmaster_.Payment_Term_Description,
salesquotationmaster_.VAT_Description,
salesquotationmaster_.VAT_Percentage,
salesquotationmaster_.VAT_Amount,
salesquotationmaster_.SalesQuotation_Image,
salesquotationmaster_.Acknolodgement_Image,
salesquotationmaster_.CurrecnyName,
salesquotationmaster_.UserName
],callback);
 }
 ,
 Delete_salesquotationmaster:function(salesquotationmaster_Id_,callback)
 { 
return db.query("CALL Delete_salesquotationmaster(@salesquotationmaster_Id_ :=?)",[salesquotationmaster_Id_],callback);
 }
 ,
 Get_salesquotationmaster:function(salesquotationmaster_Id_,callback)
 { 
return db.query("CALL Get_salesquotationmaster(@salesquotationmaster_Id_ :=?)",[salesquotationmaster_Id_],callback);
 }
 ,
 Search_salesquotationmaster:function(salesquotationmaster_Name_,callback)
 { 
 if (salesquotationmaster_Name_===undefined || salesquotationmaster_Name_==="undefined" )
salesquotationmaster_Name_='';
return db.query("CALL Search_salesquotationmaster(@salesquotationmaster_Name_ :=?)",[salesquotationmaster_Name_],callback);
 },
 Get_salesPerformaInvoicemaster:function(PerformaInvoiceId_,callback)
 { 
return db.query("CALL Get_salesPerformaInvoicemaster(@PerformaInvoiceId_ :=?)",[PerformaInvoiceId_],callback);
 }
 ,


 Get_salesGRNmaster:function(salesquotationmaster_Id_,callback)
 { 
return db.query("CALL Get_salesGRNmaster(@salesquotationmaster_Id_ :=?)",[salesquotationmaster_Id_],callback);
 },

 Load_DeliveryOrder:function(DeliveryOrderMaster_Id_,callback)
 { return db.query("CALL Load_DeliveryOrder(@DeliveryOrderMaster_Id_ :=?)",[DeliveryOrderMaster_Id_],callback); },

 Load_PurchaseOrder:function(PurchaseOrderMaster_Id_,callback)
 { return db.query("CALL Load_PurchaseOrder(@PurchaseOrderMaster_Id_ :=?)",[PurchaseOrderMaster_Id_],callback); },

 /*** Added on 18-10-2024 */

 Load_PackingList:function(PackingList_Master_Id_,callback)
 { return db.query("CALL Load_PackingList(@PackingList_Master_Id_ :=?)",[PackingList_Master_Id_],callback); },


  };
  module.exports=salesquotationmaster;

