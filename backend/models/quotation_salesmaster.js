 var db=require('../dbconnection');
 var fs = require('fs');
 var quotation_salesmaster=
 { 
 Save_quotation_salesmaster:function(quotation_salesmaster_,callback)
 { 
return db.query("CALL Save_quotation_salesmaster("+
"@Quotation_Salesmaster_Id_ :=?,"+
"@SalesQuotationMaster_Id_ :=?,"+
"@SalesMaster_Id_ :=?"+")"
 ,[quotation_salesmaster_.Quotation_Salesmaster_Id,
quotation_salesmaster_.SalesQuotationMaster_Id,
quotation_salesmaster_.SalesMaster_Id
],callback);
 }
 ,
 Delete_quotation_salesmaster:function(quotation_salesmaster_Id_,callback)
 { 
return db.query("CALL Delete_quotation_salesmaster(@quotation_salesmaster_Id_ :=?)",[quotation_salesmaster_Id_],callback);
 }
 ,
 Get_quotation_salesmaster:function(quotation_salesmaster_Id_,callback)
 { 
return db.query("CALL Get_quotation_salesmaster(@quotation_salesmaster_Id_ :=?)",[quotation_salesmaster_Id_],callback);
 }
 ,
 Search_quotation_salesmaster:function(quotation_salesmaster_Name_,callback)
 { 
 if (quotation_salesmaster_Name_===undefined || quotation_salesmaster_Name_==="undefined" )
quotation_salesmaster_Name_='';
return db.query("CALL Search_quotation_salesmaster(@quotation_salesmaster_Name_ :=?)",[quotation_salesmaster_Name_],callback);
 }
  };
  module.exports=quotation_salesmaster;

