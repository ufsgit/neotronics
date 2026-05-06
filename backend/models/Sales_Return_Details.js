 var db=require('../dbconnection');
 var fs = require('fs');
 var sales_return_details=
 { 
 Save_sales_return_details:function(sales_return_details_,callback)
 { 
return db.query("CALL Save_sales_return_details("+
"@Sales_Return_Details_Id_ :=?,"+
"@Sales_Return_Master_Id_ :=?,"+
"@ItemId_ :=?,"+
"@ItemCode_ :=?,"+
"@ItemName_ :=?,"+
"@GroupId_ :=?,"+
"@GroupName_ :=?,"+
"@UnitId_ :=?,"+
"@UnitName_ :=?,"+
"@StockId_ :=?,"+
"@UnitPrice_ :=?,"+
"@MRP_ :=?,"+
"@HSNCODE_ :=?,"+
"@HSNMasterId_ :=?,"+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?,"+
"@SaleTax_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Item_Discount_Amount_ :=?,"+
"@PurchaseRate_ :=?,"+
"@Unit_Discount_ :=?"+")"
 ,[sales_return_details_.Sales_Return_Details_Id,
sales_return_details_.Sales_Return_Master_Id,
sales_return_details_.ItemId,
sales_return_details_.ItemCode,
sales_return_details_.ItemName,
sales_return_details_.GroupId,
sales_return_details_.GroupName,
sales_return_details_.UnitId,
sales_return_details_.UnitName,
sales_return_details_.StockId,
sales_return_details_.UnitPrice,
sales_return_details_.MRP,
sales_return_details_.HSNCODE,
sales_return_details_.HSNMasterId,
sales_return_details_.Country_Id,
sales_return_details_.Country_Name,
sales_return_details_.SaleTax,
sales_return_details_.Quantity,
sales_return_details_.Amount,
sales_return_details_.Discount,
sales_return_details_.TaxableAmount,
sales_return_details_.TaxAmount,
sales_return_details_.NetValue,
sales_return_details_.Item_Discount_Amount,
sales_return_details_.PurchaseRate,
sales_return_details_.Unit_Discount
],callback);
 }
 ,
 Delete_sales_return_details:function(sales_return_details_Id_,callback)
 { 
return db.query("CALL Delete_sales_return_details(@sales_return_details_Id_ :=?)",[sales_return_details_Id_],callback);
 }
 ,
 Get_sales_return_details:function(sales_return_details_Id_,callback)
 { 
return db.query("CALL Get_sales_return_details(@sales_return_details_Id_ :=?)",[sales_return_details_Id_],callback);
 }
 ,
 Search_sales_return_details:function(sales_return_details_Name_,callback)
 { 
 if (sales_return_details_Name_===undefined || sales_return_details_Name_==="undefined" )
sales_return_details_Name_='';
return db.query("CALL Search_sales_return_details(@sales_return_details_Name_ :=?)",[sales_return_details_Name_],callback);
 }
  };
  module.exports=sales_return_details;

