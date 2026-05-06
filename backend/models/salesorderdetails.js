 var db=require('../dbconnection');
 var fs = require('fs');
 var salesorderdetails=
 { 
 Save_salesorderdetails:function(salesorderdetails_,callback)
 { 
return db.query("CALL Save_salesorderdetails("+
"@SalesOrderDetails_Id_ :=?,"+
"@OrderMaster_Id_ :=?,"+
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
"@HSNCODE_ :=?,"+
"@SaleTax_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Avalilability_ :=?"+")"
 ,[salesorderdetails_.SalesOrderDetails_Id,
salesorderdetails_.OrderMaster_Id,
salesorderdetails_.ItemId,
salesorderdetails_.ItemCode,
salesorderdetails_.ItemName,
salesorderdetails_.GroupId,
salesorderdetails_.GroupName,
salesorderdetails_.UnitId,
salesorderdetails_.UnitName,
salesorderdetails_.StockId,
salesorderdetails_.UnitPrice,
salesorderdetails_.MRP,
salesorderdetails_.HSNCODE,
salesorderdetails_.SaleTax,
salesorderdetails_.Quantity,
salesorderdetails_.Amount,
salesorderdetails_.Discount,
salesorderdetails_.TaxableAmount,
salesorderdetails_.TaxAmount,
salesorderdetails_.NetValue,
salesorderdetails_.Avalilability
],callback);
 }
 ,
 Delete_salesorderdetails:function(salesorderdetails_Id_,callback)
 { 
return db.query("CALL Delete_salesorderdetails(@salesorderdetails_Id_ :=?)",[salesorderdetails_Id_],callback);
 }
 ,
 Get_salesorderdetails:function(salesorderdetails_Id_,callback)
 { 
return db.query("CALL Get_salesorderdetails(@salesorderdetails_Id_ :=?)",[salesorderdetails_Id_],callback);
 }
 ,
 Search_salesorderdetails:function(salesorderdetails_Name_,callback)
 { 
 if (salesorderdetails_Name_===undefined || salesorderdetails_Name_==="undefined" )
salesorderdetails_Name_='';
return db.query("CALL Search_salesorderdetails(@salesorderdetails_Name_ :=?)",[salesorderdetails_Name_],callback);
 }
  };
  module.exports=salesorderdetails;

