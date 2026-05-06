 var db=require('../dbconnection');
 var fs = require('fs');
 var sales_quotation_order=
 { 
 Save_sales_quotation_order:function(sales_quotation_order_,callback)
 { 
return db.query("CALL Save_sales_quotation_order("+
"@Sales_Quotation_Order_Id_ :=?,"+
"@Quotation_Id_ :=?,"+
"@Order_Id_ :=?"+")"
 ,[sales_quotation_order_.Sales_Quotation_Order_Id,
sales_quotation_order_.Quotation_Id,
sales_quotation_order_.Order_Id
],callback);
 }
 ,
 Delete_sales_quotation_order:function(sales_quotation_order_Id_,callback)
 { 
return db.query("CALL Delete_sales_quotation_order(@sales_quotation_order_Id_ :=?)",[sales_quotation_order_Id_],callback);
 }
 ,
 Get_sales_quotation_order:function(sales_quotation_order_Id_,callback)
 { 
return db.query("CALL Get_sales_quotation_order(@sales_quotation_order_Id_ :=?)",[sales_quotation_order_Id_],callback);
 }
 ,
 Search_sales_quotation_order:function(sales_quotation_order_Name_,callback)
 { 
 if (sales_quotation_order_Name_===undefined || sales_quotation_order_Name_==="undefined" )
sales_quotation_order_Name_='';
return db.query("CALL Search_sales_quotation_order(@sales_quotation_order_Name_ :=?)",[sales_quotation_order_Name_],callback);
 }
  };
  module.exports=sales_quotation_order;

