 var db=require('../dbconnection');
 var fs = require('fs');
 var sales_delivery=
 { 
 Save_sales_delivery:function(sales_delivery_,callback)
 { 
return db.query("CALL Save_sales_delivery("+
"@Sales_Delivery_Id_ :=?,"+
"@Sales_Id_ :=?,"+
"@Delivery_Id_ :=?"+")"
 ,[sales_delivery_.Sales_Delivery_Id,
sales_delivery_.Sales_Id,
sales_delivery_.Delivery_Id
],callback);
 }
 ,
 Delete_sales_delivery:function(sales_delivery_Id_,callback)
 { 
return db.query("CALL Delete_sales_delivery(@sales_delivery_Id_ :=?)",[sales_delivery_Id_],callback);
 }
 ,
 Get_sales_delivery:function(sales_delivery_Id_,callback)
 { 
return db.query("CALL Get_sales_delivery(@sales_delivery_Id_ :=?)",[sales_delivery_Id_],callback);
 }
 ,
 Search_sales_delivery:function(sales_delivery_Name_,callback)
 { 
 if (sales_delivery_Name_===undefined || sales_delivery_Name_==="undefined" )
sales_delivery_Name_='';
return db.query("CALL Search_sales_delivery(@sales_delivery_Name_ :=?)",[sales_delivery_Name_],callback);
 }
  };
  module.exports=sales_delivery;

