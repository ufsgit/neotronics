 var db=require('../dbconnection');
 var fs = require('fs');
 var purchase_return_details=
 { 
 Save_purchase_return_details:function(purchase_return_details_,callback)
 { 
return db.query("CALL Save_purchase_return_details("+
"@Purchase_Return_Details_Id_ :=?,"+
"@Purchase_Return_Master_Id_ :=?,"+
"@ItemId_ :=?,"+
"@ItemCode_ :=?,"+
"@ItemName_ :=?,"+
"@GroupId_ :=?,"+
"@GroupName_ :=?,"+
"@UnitId_ :=?,"+
"@UnitName_ :=?,"+
"@StockId_ :=?,"+
"@SaleRate_ :=?,"+
"@UnitPrice_ :=?,"+
"@MRP_ :=?,"+
"@HSNMasterId_ :=?,"+
"@HSNCODE_ :=?,"+
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
"@Unit_Discount_ :=?"+")"
 ,[purchase_return_details_.Purchase_Return_Details_Id,
purchase_return_details_.Purchase_Return_Master_Id,
purchase_return_details_.ItemId,
purchase_return_details_.ItemCode,
purchase_return_details_.ItemName,
purchase_return_details_.GroupId,
purchase_return_details_.GroupName,
purchase_return_details_.UnitId,
purchase_return_details_.UnitName,
purchase_return_details_.StockId,
purchase_return_details_.SaleRate,
purchase_return_details_.UnitPrice,
purchase_return_details_.MRP,
purchase_return_details_.HSNMasterId,
purchase_return_details_.HSNCODE,
purchase_return_details_.Country_Id,
purchase_return_details_.Country_Name,
purchase_return_details_.SaleTax,
purchase_return_details_.Quantity,
purchase_return_details_.Amount,
purchase_return_details_.Discount,
purchase_return_details_.TaxableAmount,
purchase_return_details_.TaxAmount,
purchase_return_details_.NetValue,
purchase_return_details_.Item_Discount_Amount,
purchase_return_details_.Unit_Discount
],callback);
 }
 ,
 Delete_purchase_return_details:function(purchase_return_details_Id_,callback)
 { 
return db.query("CALL Delete_purchase_return_details(@purchase_return_details_Id_ :=?)",[purchase_return_details_Id_],callback);
 }
 ,
 Get_purchase_return_details:function(purchase_return_details_Id_,callback)
 { 
return db.query("CALL Get_purchase_return_details(@purchase_return_details_Id_ :=?)",[purchase_return_details_Id_],callback);
 }
 ,
 Search_purchase_return_details:function(purchase_return_details_Name_,callback)
 { 
 if (purchase_return_details_Name_===undefined || purchase_return_details_Name_==="undefined" )
purchase_return_details_Name_='';
return db.query("CALL Search_purchase_return_details(@purchase_return_details_Name_ :=?)",[purchase_return_details_Name_],callback);
 }
  };
  module.exports=purchase_return_details;

