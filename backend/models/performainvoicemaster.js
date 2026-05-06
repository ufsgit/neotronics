 var db=require('../dbconnection');
 var fs = require('fs');
 var performainvoicemaster=
 { 
 Save_performainvoicemaster:function(performainvoicemaster_,callback)
 { 
return db.query("CALL Save_performainvoicemaster("+
"@PerformaInvoiceMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@PerformaInvNo_ :=?,"+
"@LPONo_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@Total_Amount_ :=?,"+
"@NetTotal_ :=?,"+
"@Roundoff_Amt_ :=?,"+
"@Makes_ :=?,"+
"@PriceBasis_ :=?,"+
"@Description1_ :=?,"+
"@User_Id_ :=?,"+
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
"@Delivery_ :=?,"+
"@Validity_ :=?,"+
"@Profoma_Invoice_image_ :=?,"+
"@CurrecnyName_ :=?,"+
"@UserName_ :=?"+")"
 ,[performainvoicemaster_.PerformaInvoiceMaster_Id,
performainvoicemaster_.Account_Party_Id,
performainvoicemaster_.EntryDate,
performainvoicemaster_.PerformaInvNo,
performainvoicemaster_.LPONo,
performainvoicemaster_.CurrencyId,
performainvoicemaster_.TypeId,
performainvoicemaster_.PaymentTerms,
performainvoicemaster_.TotalAmount,
performainvoicemaster_.TotalDiscount,
performainvoicemaster_.TaxableAmount,
performainvoicemaster_.VatAmount,
performainvoicemaster_.Total_Amount,
performainvoicemaster_.NetTotal,
performainvoicemaster_.Roundoff_Amt,
performainvoicemaster_.Makes,
performainvoicemaster_.PriceBasis,
performainvoicemaster_.Description1,
performainvoicemaster_.User_Id,
performainvoicemaster_.KindAttend,
performainvoicemaster_.Charge1,
performainvoicemaster_.charge1_Amount,
performainvoicemaster_.Charge2,
performainvoicemaster_.charge2_Amount,
performainvoicemaster_.Discount_Description,
performainvoicemaster_.Additional_Discount,
performainvoicemaster_.Description2,
performainvoicemaster_.Basic_Discount,
performainvoicemaster_.Amount_In_Words,
performainvoicemaster_.PreparedBy,
performainvoicemaster_.Charge1per,
performainvoicemaster_.Payment_Term_Description,
performainvoicemaster_.VAT_Description,
performainvoicemaster_.VAT_Percentage,
performainvoicemaster_.VAT_Amount,
performainvoicemaster_.Delivery,
performainvoicemaster_.Validity,
performainvoicemaster_.Profoma_Invoice_image,
performainvoicemaster_.CurrecnyName,
performainvoicemaster_.UserName
],callback);
 }
 ,
 Delete_performainvoicemaster:function(performainvoicemaster_Id_,callback)
 { 
return db.query("CALL Delete_performainvoicemaster(@performainvoicemaster_Id_ :=?)",[performainvoicemaster_Id_],callback);
 }
 ,
 Get_performainvoicemaster:function(performainvoicemaster_Id_,callback)
 { 
return db.query("CALL Get_performainvoicemaster(@performainvoicemaster_Id_ :=?)",[performainvoicemaster_Id_],callback);
 }
 ,
 Search_performainvoicemaster:function(performainvoicemaster_Name_,callback)
 { 
 if (performainvoicemaster_Name_===undefined || performainvoicemaster_Name_==="undefined" )
performainvoicemaster_Name_='';
return db.query("CALL Search_performainvoicemaster(@performainvoicemaster_Name_ :=?)",[performainvoicemaster_Name_],callback);
 }
  };
  module.exports=performainvoicemaster;

