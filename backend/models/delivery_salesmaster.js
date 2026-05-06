 var db=require('../dbconnection');
 var fs = require('fs');
 var delivery_salesmaster=
 { 
 Save_delivery_salesmaster:function(delivery_salesmaster_,callback)
 { 
return db.query("CALL Save_delivery_salesmaster("+
"@Delivery_SalesMaster_Id_ :=?,"+
"@DeliveryOrderMaster_Id_ :=?,"+
"@SalesMaster_Id_ :=?,"+
"@Delivery_Order_No_ :=?"+")"
 ,[delivery_salesmaster_.Delivery_SalesMaster_Id,
delivery_salesmaster_.DeliveryOrderMaster_Id,
delivery_salesmaster_.SalesMaster_Id,
delivery_salesmaster_.Delivery_Order_No
],callback);
 }
 ,
 Delete_delivery_salesmaster:function(delivery_salesmaster_Id_,callback)
 { 
return db.query("CALL Delete_delivery_salesmaster(@delivery_salesmaster_Id_ :=?)",[delivery_salesmaster_Id_],callback);
 }
 ,
 Get_delivery_salesmaster:function(delivery_salesmaster_Id_,callback)
 { 
return db.query("CALL Get_delivery_salesmaster(@delivery_salesmaster_Id_ :=?)",[delivery_salesmaster_Id_],callback);
 }
 ,
 Search_delivery_salesmaster:function(delivery_salesmaster_Name_,callback)
 { 
 if (delivery_salesmaster_Name_===undefined || delivery_salesmaster_Name_==="undefined" )
delivery_salesmaster_Name_='';
return db.query("CALL Search_delivery_salesmaster(@delivery_salesmaster_Name_ :=?)",[delivery_salesmaster_Name_],callback);
 }
  };
  module.exports=delivery_salesmaster;

