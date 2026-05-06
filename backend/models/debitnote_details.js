 var db=require('../dbconnection');
 var fs = require('fs');
 var debitnote_details=
 { 
 Save_debitnote_details:function(debitnote_details_,callback)
 { 
return db.query("CALL Save_debitnote_details("+
"@DebitNote_Details_Id_ :=?,"+
"@DebitNote_Master_Id_ :=?,"+
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
 ,[debitnote_details_.DebitNote_Details_Id,
debitnote_details_.DebitNote_Master_Id,
debitnote_details_.ItemId,
debitnote_details_.ItemCode,
debitnote_details_.ItemName,
debitnote_details_.GroupId,
debitnote_details_.GroupName,
debitnote_details_.UnitId,
debitnote_details_.UnitName,
debitnote_details_.StockId,
debitnote_details_.UnitPrice,
debitnote_details_.MRP,
debitnote_details_.HSNCODE,
debitnote_details_.HSNMasterId,
debitnote_details_.Country_Id,
debitnote_details_.Country_Name,
debitnote_details_.SaleTax,
debitnote_details_.Quantity,
debitnote_details_.Amount,
debitnote_details_.Discount,
debitnote_details_.TaxableAmount,
debitnote_details_.TaxAmount,
debitnote_details_.NetValue,
debitnote_details_.Item_Discount_Amount,
debitnote_details_.PurchaseRate,
debitnote_details_.Unit_Discount
],callback);
 }
 ,
 Delete_debitnote_details:function(debitnote_details_Id_,callback)
 { 
return db.query("CALL Delete_debitnote_details(@debitnote_details_Id_ :=?)",[debitnote_details_Id_],callback);
 }
 ,
 Get_debitnote_details:function(debitnote_details_Id_,callback)
 { 
return db.query("CALL Get_debitnote_details(@debitnote_details_Id_ :=?)",[debitnote_details_Id_],callback);
 }
 ,
 Search_debitnote_details:function(debitnote_details_Name_,callback)
 { 
 if (debitnote_details_Name_===undefined || debitnote_details_Name_==="undefined" )
debitnote_details_Name_='';
return db.query("CALL Search_debitnote_details(@debitnote_details_Name_ :=?)",[debitnote_details_Name_],callback);
 }
  };
  module.exports=debitnote_details;

