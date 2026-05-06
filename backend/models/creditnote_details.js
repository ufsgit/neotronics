 var db=require('../dbconnection');
 var fs = require('fs');
 var creditnote_details=
 { 
 Save_creditnote_details:function(creditnote_details_,callback)
 { 
return db.query("CALL Save_creditnote_details("+
"@CreditNote_Details_Id_ :=?,"+
"@CreditNote_Master_Id_ :=?,"+
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
 ,[creditnote_details_.CreditNote_Details_Id,
creditnote_details_.CreditNote_Master_Id,
creditnote_details_.ItemId,
creditnote_details_.ItemCode,
creditnote_details_.ItemName,
creditnote_details_.GroupId,
creditnote_details_.GroupName,
creditnote_details_.UnitId,
creditnote_details_.UnitName,
creditnote_details_.StockId,
creditnote_details_.UnitPrice,
creditnote_details_.MRP,
creditnote_details_.HSNCODE,
creditnote_details_.HSNMasterId,
creditnote_details_.Country_Id,
creditnote_details_.Country_Name,
creditnote_details_.SaleTax,
creditnote_details_.Quantity,
creditnote_details_.Amount,
creditnote_details_.Discount,
creditnote_details_.TaxableAmount,
creditnote_details_.TaxAmount,
creditnote_details_.NetValue,
creditnote_details_.Item_Discount_Amount,
creditnote_details_.PurchaseRate,
creditnote_details_.Unit_Discount
],callback);
 }
 ,
 Delete_creditnote_details:function(creditnote_details_Id_,callback)
 { 
return db.query("CALL Delete_creditnote_details(@creditnote_details_Id_ :=?)",[creditnote_details_Id_],callback);
 }
 ,
 Get_creditnote_details:function(creditnote_details_Id_,callback)
 { 
return db.query("CALL Get_creditnote_details(@creditnote_details_Id_ :=?)",[creditnote_details_Id_],callback);
 }
 ,
 Search_creditnote_details:function(creditnote_details_Name_,callback)
 { 
 if (creditnote_details_Name_===undefined || creditnote_details_Name_==="undefined" )
creditnote_details_Name_='';
return db.query("CALL Search_creditnote_details(@creditnote_details_Name_ :=?)",[creditnote_details_Name_],callback);
 }
  };
  module.exports=creditnote_details;

