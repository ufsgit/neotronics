 var db=require('../dbconnection');
 var fs = require('fs');
 var salesordermaster=
 { 
 Save_salesordermaster:function(salesordermaster_,callback)
 { 
return db.query("CALL Save_salesordermaster("+
"@SalesOrderMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@SalesDate_ :=?,"+
"@SalesOrderNo_ :=?,"+
"@QuotationNo_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@AttendEmployee_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@NetTotal_ :=?,"+
"@Brand_ :=?,"+
"@PriceBasis_ :=?,"+
"@Delivery_ :=?,"+
"@Validity_ :=?,"+
"@Description1_ :=?,"+
"@User_Id_ :=?,"+
"@Sales_Order_Image_ :=?,"+
"@UserName_ :=?,"+
"@CurrecnyName_ :=?"+")"
 ,[salesordermaster_.SalesOrderMaster_Id,
salesordermaster_.Account_Party_Id,
salesordermaster_.EntryDate,
salesordermaster_.SalesDate,
salesordermaster_.SalesOrderNo,
salesordermaster_.QuotationNo,
salesordermaster_.CurrencyId,
salesordermaster_.TypeId,
salesordermaster_.PaymentTerms,
salesordermaster_.AttendEmployee,
salesordermaster_.TotalAmount,
salesordermaster_.TotalDiscount,
salesordermaster_.TaxableAmount,
salesordermaster_.VatAmount,
salesordermaster_.NetTotal,
salesordermaster_.Brand,
salesordermaster_.PriceBasis,
salesordermaster_.Delivery,
salesordermaster_.Validity,
salesordermaster_.Description1,
salesordermaster_.User_Id,
salesordermaster_.Sales_Order_Image,
salesordermaster_.UserName,
salesordermaster_.CurrecnyName
],callback);
 }
 ,
 Delete_salesordermaster:function(salesordermaster_Id_,callback)
 { 
return db.query("CALL Delete_salesordermaster(@salesordermaster_Id_ :=?)",[salesordermaster_Id_],callback);
 }
 ,
 Get_salesordermaster:function(salesordermaster_Id_,callback)
 { 
return db.query("CALL Get_salesordermaster(@salesordermaster_Id_ :=?)",[salesordermaster_Id_],callback);
 }
 ,
 Search_salesordermaster:function(salesordermaster_Name_,callback)
 { 
 if (salesordermaster_Name_===undefined || salesordermaster_Name_==="undefined" )
salesordermaster_Name_='';
return db.query("CALL Search_salesordermaster(@salesordermaster_Name_ :=?)",[salesordermaster_Name_],callback);
 }
  };
  module.exports=salesordermaster;

