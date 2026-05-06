 var db=require('../dbconnection');
 var fs = require('fs');
 var quotation_delivery_order=
 { 
 Save_quotation_delivery_order:function(quotation_delivery_order_,callback)
 { 
return db.query("CALL Save_quotation_delivery_order("+
"@Quotation_Delivery_Order_Id_ :=?,"+
"@SalesQuotationMaster_Id_ :=?,"+
"@DeliveryOrderMaster_Id_ :=?"+")"
 ,[quotation_delivery_order_.Quotation_Delivery_Order_Id,
quotation_delivery_order_.SalesQuotationMaster_Id,
quotation_delivery_order_.DeliveryOrderMaster_Id
],callback);
 }
 ,
 Delete_quotation_delivery_order:function(quotation_delivery_order_Id_,callback)
 { 
return db.query("CALL Delete_quotation_delivery_order(@quotation_delivery_order_Id_ :=?)",[quotation_delivery_order_Id_],callback);
 }
 ,
 Get_quotation_delivery_order:function(quotation_delivery_order_Id_,callback)
 { 
return db.query("CALL Get_quotation_delivery_order(@quotation_delivery_order_Id_ :=?)",[quotation_delivery_order_Id_],callback);
 }
 ,
 Search_quotation_delivery_order:function(quotation_delivery_order_Name_,callback)
 { 
 if (quotation_delivery_order_Name_===undefined || quotation_delivery_order_Name_==="undefined" )
quotation_delivery_order_Name_='';
return db.query("CALL Search_quotation_delivery_order(@quotation_delivery_order_Name_ :=?)",[quotation_delivery_order_Name_],callback);
 }
  };
  module.exports=quotation_delivery_order;

