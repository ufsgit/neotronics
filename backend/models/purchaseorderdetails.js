 var db=require('../dbconnection');
 var fs = require('fs');
 var purchaseorderdetails=
 { 
 Save_purchaseorderdetails:function(purchaseorderdetails_,callback)
 { 
return db.query("CALL Save_purchaseorderdetails("+
"@PurchaseOrderDetails_Id_ :=?,"+
"@PurchaseOrderId_ :=?,"+
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
"@SaleTax_ :=?,"+
"@HSNMasterId_ :=?,"+
"@HSNCODE_ :=?,"+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Item_Discount_Amount_ :=?,"+
"@Unit_Discount_ :=?"+")"
 ,[purchaseorderdetails_.PurchaseOrderDetails_Id,
purchaseorderdetails_.PurchaseOrderId,
purchaseorderdetails_.ItemId,
purchaseorderdetails_.ItemCode,
purchaseorderdetails_.ItemName,
purchaseorderdetails_.GroupId,
purchaseorderdetails_.GroupName,
purchaseorderdetails_.UnitId,
purchaseorderdetails_.UnitName,
purchaseorderdetails_.StockId,
purchaseorderdetails_.SaleRate,
purchaseorderdetails_.UnitPrice,
purchaseorderdetails_.MRP,
purchaseorderdetails_.SaleTax,
purchaseorderdetails_.HSNMasterId,
purchaseorderdetails_.HSNCODE,
purchaseorderdetails_.Country_Id,
purchaseorderdetails_.Country_Name,
purchaseorderdetails_.Quantity,
purchaseorderdetails_.Amount,
purchaseorderdetails_.Discount,
purchaseorderdetails_.TaxableAmount,
purchaseorderdetails_.TaxAmount,
purchaseorderdetails_.NetValue,
purchaseorderdetails_.Item_Discount_Amount,
purchaseorderdetails_.Unit_Discount
],callback);
 }
 ,
 Delete_purchaseorderdetails:function(purchaseorderdetails_Id_,callback)
 { 
return db.query("CALL Delete_purchaseorderdetails(@purchaseorderdetails_Id_ :=?)",[purchaseorderdetails_Id_],callback);
 }
 ,
 Get_purchaseorderdetails:function(purchaseorderdetails_Id_,callback)
 { 
return db.query("CALL Get_purchaseorderdetails(@purchaseorderdetails_Id_ :=?)",[purchaseorderdetails_Id_],callback);
 }
 ,
 Search_purchaseorderdetails:function(purchaseorderdetails_Name_,callback)
 { 
 if (purchaseorderdetails_Name_===undefined || purchaseorderdetails_Name_==="undefined" )
purchaseorderdetails_Name_='';
return db.query("CALL Search_purchaseorderdetails(@purchaseorderdetails_Name_ :=?)",[purchaseorderdetails_Name_],callback);
 }
  };
  module.exports=purchaseorderdetails;

