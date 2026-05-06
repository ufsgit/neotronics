 var db=require('../dbconnection');
 var fs = require('fs');
 var performa_salesmaster=
 { 
 Save_performa_salesmaster:function(performa_salesmaster_,callback)
 { 
return db.query("CALL Save_performa_salesmaster("+
"@Performa_SalesMaster_Id_ :=?,"+
"@PerformaInvoiceMaster_Id_ :=?,"+
"@SalesMaster_Id_ :=?"+")"
 ,[performa_salesmaster_.Performa_SalesMaster_Id,
performa_salesmaster_.PerformaInvoiceMaster_Id,
performa_salesmaster_.SalesMaster_Id
],callback);
 }
 ,
 Delete_performa_salesmaster:function(performa_salesmaster_Id_,callback)
 { 
return db.query("CALL Delete_performa_salesmaster(@performa_salesmaster_Id_ :=?)",[performa_salesmaster_Id_],callback);
 }
 ,
 Get_performa_salesmaster:function(performa_salesmaster_Id_,callback)
 { 
return db.query("CALL Get_performa_salesmaster(@performa_salesmaster_Id_ :=?)",[performa_salesmaster_Id_],callback);
 }
 ,
 Search_performa_salesmaster:function(performa_salesmaster_Name_,callback)
 { 
 if (performa_salesmaster_Name_===undefined || performa_salesmaster_Name_==="undefined" )
performa_salesmaster_Name_='';
return db.query("CALL Search_performa_salesmaster(@performa_salesmaster_Name_ :=?)",[performa_salesmaster_Name_],callback);
 }
  };
  module.exports=performa_salesmaster;

