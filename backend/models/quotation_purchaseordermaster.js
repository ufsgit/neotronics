 var db=require('../dbconnection');
 var fs = require('fs');
 var quotation_purchaseordermaster=
 { 
 Save_quotation_purchaseordermaster:function(quotation_purchaseordermaster_,callback)
 { 
return db.query("CALL Save_quotation_purchaseordermaster("+
"@Quotation_PurchaseOrderMaster_Id_ :=?,"+
"@SalesQuotationMaster_Id_ :=?,"+
"@PurchaseOrderMaster_Id_ :=?"+")"
 ,[quotation_purchaseordermaster_.Quotation_PurchaseOrderMaster_Id,
quotation_purchaseordermaster_.SalesQuotationMaster_Id,
quotation_purchaseordermaster_.PurchaseOrderMaster_Id
],callback);
 }
 ,
 Delete_quotation_purchaseordermaster:function(quotation_purchaseordermaster_Id_,callback)
 { 
return db.query("CALL Delete_quotation_purchaseordermaster(@quotation_purchaseordermaster_Id_ :=?)",[quotation_purchaseordermaster_Id_],callback);
 }
 ,
 Get_quotation_purchaseordermaster:function(quotation_purchaseordermaster_Id_,callback)
 { 
return db.query("CALL Get_quotation_purchaseordermaster(@quotation_purchaseordermaster_Id_ :=?)",[quotation_purchaseordermaster_Id_],callback);
 }
 ,
 Search_quotation_purchaseordermaster:function(quotation_purchaseordermaster_Name_,callback)
 { 
 if (quotation_purchaseordermaster_Name_===undefined || quotation_purchaseordermaster_Name_==="undefined" )
quotation_purchaseordermaster_Name_='';
return db.query("CALL Search_quotation_purchaseordermaster(@quotation_purchaseordermaster_Name_ :=?)",[quotation_purchaseordermaster_Name_],callback);
 }
  };
  module.exports=quotation_purchaseordermaster;

