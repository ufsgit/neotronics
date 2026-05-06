 var db=require('../dbconnection');
 var fs = require('fs');
 var quotation_performa=
 { 
 Save_quotation_performa:function(quotation_performa_,callback)
 { 
return db.query("CALL Save_quotation_performa("+
"@Quotation_Performa_Id_ :=?,"+
"@SalesQuotationMaster_Id_ :=?,"+
"@PerformaInvoiceMaster_Id_ :=?"+")"
 ,[quotation_performa_.Quotation_Performa_Id,
quotation_performa_.SalesQuotationMaster_Id,
quotation_performa_.PerformaInvoiceMaster_Id
],callback);
 }
 ,
 Delete_quotation_performa:function(quotation_performa_Id_,callback)
 { 
return db.query("CALL Delete_quotation_performa(@quotation_performa_Id_ :=?)",[quotation_performa_Id_],callback);
 }
 ,
 Get_quotation_performa:function(quotation_performa_Id_,callback)
 { 
return db.query("CALL Get_quotation_performa(@quotation_performa_Id_ :=?)",[quotation_performa_Id_],callback);
 }
 ,
 Search_quotation_performa:function(quotation_performa_Name_,callback)
 { 
 if (quotation_performa_Name_===undefined || quotation_performa_Name_==="undefined" )
quotation_performa_Name_='';
return db.query("CALL Search_quotation_performa(@quotation_performa_Name_ :=?)",[quotation_performa_Name_],callback);
 }
  };
  module.exports=quotation_performa;

