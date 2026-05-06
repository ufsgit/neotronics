 var db=require('../dbconnection');
 var fs = require('fs');
 var performa_delivery_order=
 { 
 Save_performa_delivery_order:function(performa_delivery_order_,callback)
 { 
return db.query("CALL Save_performa_delivery_order("+
"@Performa_Delivery_Id_ :=?,"+
"@PerformaInvoiceMaster_Id_ :=?,"+
"@DeliveryOrderMaster_Id_ :=?"+")"
 ,[performa_delivery_order_.Performa_Delivery_Id,
performa_delivery_order_.PerformaInvoiceMaster_Id,
performa_delivery_order_.DeliveryOrderMaster_Id
],callback);
 }
 ,
 Delete_performa_delivery_order:function(performa_delivery_order_Id_,callback)
 { 
return db.query("CALL Delete_performa_delivery_order(@performa_delivery_order_Id_ :=?)",[performa_delivery_order_Id_],callback);
 }
 ,
 Get_performa_delivery_order:function(performa_delivery_order_Id_,callback)
 { 
return db.query("CALL Get_performa_delivery_order(@performa_delivery_order_Id_ :=?)",[performa_delivery_order_Id_],callback);
 }
 ,
 Search_performa_delivery_order:function(performa_delivery_order_Name_,callback)
 { 
 if (performa_delivery_order_Name_===undefined || performa_delivery_order_Name_==="undefined" )
performa_delivery_order_Name_='';
return db.query("CALL Search_performa_delivery_order(@performa_delivery_order_Name_ :=?)",[performa_delivery_order_Name_],callback);
 }
  };
  module.exports=performa_delivery_order;

