 var db=require('../dbconnection');
 var fs = require('fs');
 var purchaseordermaster=
 { 
 Save_purchaseordermaster:function(purchaseordermaster_,callback)
 { 
return db.query("CALL Save_purchaseordermaster("+
"@PurchaseOrderMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@PurchaseDate_ :=?,"+
"@InvoiceNo_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@AttendEmployee_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@NetTotal_ :=?,"+
"@Total_Amount_ :=?,"+
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
"@Customer_Reference_ :=?,"+
"@Roundoff_Amt_ :=?,"+
"@Purchase_Order_Image_ :=?,"+
"@UserName_ :=?,"+
"@CurrecnyName_ :=?"+")"
 ,[purchaseordermaster_.PurchaseOrderMaster_Id,
purchaseordermaster_.Account_Party_Id,
purchaseordermaster_.EntryDate,
purchaseordermaster_.PurchaseDate,
purchaseordermaster_.InvoiceNo,
purchaseordermaster_.CurrencyId,
purchaseordermaster_.TypeId,
purchaseordermaster_.PaymentTerms,
purchaseordermaster_.AttendEmployee,
purchaseordermaster_.TotalAmount,
purchaseordermaster_.TotalDiscount,
purchaseordermaster_.TaxableAmount,
purchaseordermaster_.VatAmount,
purchaseordermaster_.NetTotal,
purchaseordermaster_.Total_Amount,
purchaseordermaster_.Brand,
purchaseordermaster_.PriceBasis,
purchaseordermaster_.Delivery,
purchaseordermaster_.Validity,
purchaseordermaster_.Description1,
purchaseordermaster_.User_Id,
purchaseordermaster_.Delivery_Address1,
purchaseordermaster_.Delivery_Address2,
purchaseordermaster_.Delivery_Address3,
purchaseordermaster_.Delivery_Address4,
purchaseordermaster_.KindAttend,
purchaseordermaster_.Charge1,
purchaseordermaster_.charge1_Amount,
purchaseordermaster_.Charge2,
purchaseordermaster_.charge2_Amount,
purchaseordermaster_.Discount_Description,
purchaseordermaster_.Additional_Discount,
purchaseordermaster_.Description2,
purchaseordermaster_.Basic_Discount,
purchaseordermaster_.Amount_In_Words,
purchaseordermaster_.PreparedBy,
purchaseordermaster_.Charge1per,
purchaseordermaster_.Payment_Term_Description,
purchaseordermaster_.VAT_Description,
purchaseordermaster_.VAT_Percentage,
purchaseordermaster_.VAT_Amount,
purchaseordermaster_.Customer_Reference,
purchaseordermaster_.Roundoff_Amt,
purchaseordermaster_.Purchase_Order_Image,
purchaseordermaster_.UserName,
purchaseordermaster_.CurrecnyName
],callback);
 }
 ,
 Delete_purchaseordermaster:function(purchaseordermaster_Id_,callback)
 { 
return db.query("CALL Delete_purchaseordermaster(@purchaseordermaster_Id_ :=?)",[purchaseordermaster_Id_],callback);
 }
 ,
 Get_purchaseordermaster:function(purchaseordermaster_Id_,callback)
 { 
return db.query("CALL Get_purchaseordermaster(@purchaseordermaster_Id_ :=?)",[purchaseordermaster_Id_],callback);
 }
 ,
 Search_purchaseordermaster:function(purchaseordermaster_Name_,callback)
 { 
 if (purchaseordermaster_Name_===undefined || purchaseordermaster_Name_==="undefined" )
purchaseordermaster_Name_='';
return db.query("CALL Search_purchaseordermaster(@purchaseordermaster_Name_ :=?)",[purchaseordermaster_Name_],callback);
 },
 Search_PurchaseOrderNumber_Typeahead: function (InvoiceNo_, callback) {
	if (InvoiceNo_ === undefined || InvoiceNo_ === "undefined") InvoiceNo_ = "";
	return db.query(
		"CALL Search_PurchaseOrderNumber_Typeahead(@InvoiceNo_ :=?)",
		[InvoiceNo_],
		callback
	);
},


Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead: function (InvoiceNo_,DeliveryOrderMaster_Id_, callback) {
	if (InvoiceNo_ === undefined || InvoiceNo_ === "undefined" || InvoiceNo_ ==="a&" || InvoiceNo_ === null || InvoiceNo_ === "null") InvoiceNo_ = "";
	return db.query(
		"CALL Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead(@InvoiceNo_ :=?, @DeliveryOrderMaster_Id_ :=?)",
		[InvoiceNo_,DeliveryOrderMaster_Id_],
		callback
	);
},
};
  module.exports=purchaseordermaster;

