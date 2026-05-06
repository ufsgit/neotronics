 var db=require('../dbconnection');
 var fs = require('fs');
 var currencydetails=
 { 
 Save_currencydetails:function(currencydetails_,callback)
 { 
return db.query("CALL Save_currencydetails("+
"@CurrencyDetails_Id_ :=?,"+
"@CurrecnyName_ :=?,"
+"@SubCurrecnyName_ :=?"
+")"
 ,[currencydetails_.CurrencyDetails_Id,
currencydetails_.CurrecnyName,currencydetails_.SubCurrecnyName
],callback);
 }
 ,
 Delete_currencydetails:function(currencydetails_Id_,callback)
 { 
return db.query("CALL Delete_currencydetails(@currencydetails_Id_ :=?)",[currencydetails_Id_],callback);
 }
 ,
 Get_currencydetails:function(currencydetails_Id_,callback)
 { 
return db.query("CALL Get_currencydetails(@currencydetails_Id_ :=?)",[currencydetails_Id_],callback);
 }
 ,
 Search_currencydetails:function(currencydetails_Name_,callback)
 { 
 if (currencydetails_Name_===undefined || currencydetails_Name_==="undefined" )
currencydetails_Name_='';
return db.query("CALL Search_currencydetails(@currencydetails_Name_ :=?)",[currencydetails_Name_],callback);
 },

 /*** Added on 13-09-2024 */

 Load_All_Account_Type:function(currencydetails_Name_,callback)
 { 
 if (currencydetails_Name_===undefined || currencydetails_Name_==="undefined" )
currencydetails_Name_='';
return db.query("CALL Load_All_Account_Type(@currencydetails_Name_ :=?)",[currencydetails_Name_],callback);
 },


 Load_InvoiceType:function(InvoiceType_Name_,callback)
 { 
 if (InvoiceType_Name_===undefined || InvoiceType_Name_==="undefined" )
InvoiceType_Name_='';
return db.query("CALL Load_InvoiceType(@InvoiceType_Name_ :=?)",[InvoiceType_Name_],callback);
 },

  };
  module.exports=currencydetails;

