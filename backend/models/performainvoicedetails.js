 var db=require('../dbconnection');
 var fs = require('fs');
 var performainvoicedetails=
 { 
 Save_performainvoicedetails:function(performainvoicedetails_,callback)
 { 
return db.query("CALL Save_performainvoicedetails("+
"@PerformaInvoiceDetails_Id_ :=?,"+
"@PerformaMaster_Id_ :=?,"+
"@ItemId_ :=?,"+
"@ItemCode_ :=?,"+
"@ItemName_ :=?,"+
"@GroupId_ :=?,"+
"@GroupName_ :=?,"+
"@UnitId_ :=?,"+
"@UnitName_ :=?,"+
"@StockId_ :=?,"+
"@UnitPrice_ :=?,"+
"@MRP_ :=?,"+
"@HSNMasterId_ :=?,"+
"@HSNCODE_ :=?,"+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?,"+
"@SaleTax_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Item_Discount_Amount_ :=?,"+
"@Unit_Discount_ :=?"+")"
 ,[performainvoicedetails_.PerformaInvoiceDetails_Id,
performainvoicedetails_.PerformaMaster_Id,
performainvoicedetails_.ItemId,
performainvoicedetails_.ItemCode,
performainvoicedetails_.ItemName,
performainvoicedetails_.GroupId,
performainvoicedetails_.GroupName,
performainvoicedetails_.UnitId,
performainvoicedetails_.UnitName,
performainvoicedetails_.StockId,
performainvoicedetails_.UnitPrice,
performainvoicedetails_.MRP,
performainvoicedetails_.HSNMasterId,
performainvoicedetails_.HSNCODE,
performainvoicedetails_.Country_Id,
performainvoicedetails_.Country_Name,
performainvoicedetails_.SaleTax,
performainvoicedetails_.Quantity,
performainvoicedetails_.Amount,
performainvoicedetails_.Discount,
performainvoicedetails_.TaxableAmount,
performainvoicedetails_.TaxAmount,
performainvoicedetails_.NetValue,
performainvoicedetails_.Item_Discount_Amount,
performainvoicedetails_.Unit_Discount
],callback);
 }
 ,
 Delete_performainvoicedetails:function(performainvoicedetails_Id_,callback)
 { 
return db.query("CALL Delete_performainvoicedetails(@performainvoicedetails_Id_ :=?)",[performainvoicedetails_Id_],callback);
 }
 ,
 Get_performainvoicedetails:function(performainvoicedetails_Id_,callback)
 { 
return db.query("CALL Get_performainvoicedetails(@performainvoicedetails_Id_ :=?)",[performainvoicedetails_Id_],callback);
 }
 ,
 Search_performainvoicedetails:function(performainvoicedetails_Name_,callback)
 { 
 if (performainvoicedetails_Name_===undefined || performainvoicedetails_Name_==="undefined" )
performainvoicedetails_Name_='';
return db.query("CALL Search_performainvoicedetails(@performainvoicedetails_Name_ :=?)",[performainvoicedetails_Name_],callback);
 }
  };
  module.exports=performainvoicedetails;

