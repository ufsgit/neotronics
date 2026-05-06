 var db=require('../dbconnection');
 var fs = require('fs');
 var salesquotationdetails=
 { 
 Save_salesquotationdetails:function(salesquotationdetails_,callback)
 { 
return db.query("CALL Save_salesquotationdetails("+
"@SalesQuotationDetails_Id_ :=?,"+
"@QuotationMaster_Id_ :=?,"+
"@ItemId_ :=?,"+
"@ItemCode_ :=?,"+
"@ItemName_ :=?,"+
"@GroupId_ :=?,"+
"@GroupName_ :=?,"+
"@UnitId_ :=?,"+
"@UnitName_ :=?,"+
"@StockId_ :=?,"+
"@HSNMasterId_ :=?,"+
"@HSNCODE_ :=?,"+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?,"+
"@UnitPrice_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Availability_ :=?,"+
"@Item_Discount_Amount_ :=?,"+
"@Unit_Discount_ :=?"+")"
 ,[salesquotationdetails_.SalesQuotationDetails_Id,
salesquotationdetails_.QuotationMaster_Id,
salesquotationdetails_.ItemId,
salesquotationdetails_.ItemCode,
salesquotationdetails_.ItemName,
salesquotationdetails_.GroupId,
salesquotationdetails_.GroupName,
salesquotationdetails_.UnitId,
salesquotationdetails_.UnitName,
salesquotationdetails_.StockId,
salesquotationdetails_.HSNMasterId,
salesquotationdetails_.HSNCODE,
salesquotationdetails_.Country_Id,
salesquotationdetails_.Country_Name,
salesquotationdetails_.UnitPrice,
salesquotationdetails_.Quantity,
salesquotationdetails_.Amount,
salesquotationdetails_.Discount,
salesquotationdetails_.TaxableAmount,
salesquotationdetails_.TaxAmount,
salesquotationdetails_.NetValue,
salesquotationdetails_.Availability,
salesquotationdetails_.Item_Discount_Amount,
salesquotationdetails_.Unit_Discount
],callback);
 }
 ,
 Delete_salesquotationdetails:function(salesquotationdetails_Id_,callback)
 { 
return db.query("CALL Delete_salesquotationdetails(@salesquotationdetails_Id_ :=?)",[salesquotationdetails_Id_],callback);
 }
 ,
 Get_salesquotationdetails:function(salesquotationdetails_Id_,callback)
 { 
return db.query("CALL Get_salesquotationdetails(@salesquotationdetails_Id_ :=?)",[salesquotationdetails_Id_],callback);
 }
 ,
 Search_salesquotationdetails:function(salesquotationdetails_Name_,callback)
 { 
 if (salesquotationdetails_Name_===undefined || salesquotationdetails_Name_==="undefined" )
salesquotationdetails_Name_='';
return db.query("CALL Search_salesquotationdetails(@salesquotationdetails_Name_ :=?)",[salesquotationdetails_Name_],callback);
 }
  };
  module.exports=salesquotationdetails;

