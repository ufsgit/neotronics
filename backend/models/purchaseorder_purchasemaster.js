 var db=require('../dbconnection');
 var fs = require('fs');
 var purchaseorder_purchasemaster=
 { 
 Save_purchaseorder_purchasemaster:function(purchaseorder_purchasemaster_,callback)
 { 
return db.query("CALL Save_purchaseorder_purchasemaster("+
"@PurchaseOrder_Purchasemaster_Id_ :=?,"+
"@PurchaseOrderMaster_Id_ :=?,"+
"@PurchaseMaster_Id_ :=?"+")"
 ,[purchaseorder_purchasemaster_.PurchaseOrder_Purchasemaster_Id,
purchaseorder_purchasemaster_.PurchaseOrderMaster_Id,
purchaseorder_purchasemaster_.PurchaseMaster_Id
],callback);
 }
 ,
 Delete_purchaseorder_purchasemaster:function(purchaseorder_purchasemaster_Id_,callback)
 { 
return db.query("CALL Delete_purchaseorder_purchasemaster(@purchaseorder_purchasemaster_Id_ :=?)",[purchaseorder_purchasemaster_Id_],callback);
 }
 ,
 Get_purchaseorder_purchasemaster:function(purchaseorder_purchasemaster_Id_,callback)
 { 
return db.query("CALL Get_purchaseorder_purchasemaster(@purchaseorder_purchasemaster_Id_ :=?)",[purchaseorder_purchasemaster_Id_],callback);
 }
 ,
 Search_purchaseorder_purchasemaster:function(purchaseorder_purchasemaster_Name_,callback)
 { 
 if (purchaseorder_purchasemaster_Name_===undefined || purchaseorder_purchasemaster_Name_==="undefined" )
purchaseorder_purchasemaster_Name_='';
return db.query("CALL Search_purchaseorder_purchasemaster(@purchaseorder_purchasemaster_Name_ :=?)",[purchaseorder_purchasemaster_Name_],callback);
 }
  };
  module.exports=purchaseorder_purchasemaster;

