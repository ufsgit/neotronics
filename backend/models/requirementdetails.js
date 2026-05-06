var db=require('../dbconnection');
var fs = require('fs');
var requirementdetails=
{ 
Save_requirementdetails:function(requirementdetails_,callback)
{ 
return db.query("CALL Save_requirementdetails("+
"@RequirementDetails_Id_ :=?,"+
"@RequirementMaster_Id_ :=?,"+
"@ItemId_ :=?,"+
"@ItemCode_ :=?,"+
"@ItemName_ :=?,"+
"@GroupId_ :=?,"+
"@GroupName_ :=?,"+
"@UnitId_ :=?,"+
"@UnitName_ :=?,"+
"@StockId_ :=?,"+
"@HSNMasterId_ :=?,"+
"@HSNCODE_ :=?,"+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?,"+
"@UnitPrice_ :=?,"+
"@Quantity_ :=?,"+
"@Amount_ :=?,"+
"@Discount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@TaxAmount_ :=?,"+
"@NetValue_ :=?,"+
"@Availability_ :=?,"+
"@Item_Discount_Amount_ :=?,"+
"@Unit_Discount_ :=?"+")"
 ,[requirementdetails_.RequirementDetails_Id,
requirementdetails_.RequirementMaster_Id,
requirementdetails_.ItemId,
requirementdetails_.ItemCode,
requirementdetails_.ItemName,
requirementdetails_.GroupId,
requirementdetails_.GroupName,
requirementdetails_.UnitId,
requirementdetails_.UnitName,
requirementdetails_.StockId,
requirementdetails_.HSNMasterId,
requirementdetails_.HSNCODE,
requirementdetails_.Country_Id,
requirementdetails_.Country_Name,
requirementdetails_.UnitPrice,
requirementdetails_.Quantity,
requirementdetails_.Amount,
requirementdetails_.Discount,
requirementdetails_.TaxableAmount,
requirementdetails_.TaxAmount,
requirementdetails_.NetValue,
requirementdetails_.Availability,
requirementdetails_.Item_Discount_Amount,
requirementdetails_.Unit_Discount
],callback);
 }
 ,
 Delete_requirementdetails:function(requirementdetails_Id_,callback)
 { 
return db.query("CALL Delete_requirementdetails(@requirementdetails_Id_ :=?)",[requirementdetails_Id_],callback);
 }
 ,
 Get_requirementdetails:function(requirementdetails_Id_,callback)
 { 
return db.query("CALL Get_requirementdetails(@requirementdetails_Id_ :=?)",[requirementdetails_Id_],callback);
 }
 ,
 Search_requirementdetails:function(requirementdetails_Name_,callback)
 { 
 if (requirementdetails_Name_===undefined || requirementdetails_Name_==="undefined" )
requirementdetails_Name_='';
return db.query("CALL Search_requirementdetails(@requirementdetails_Name_ :=?)",[requirementdetails_Name_],callback);
 }
  };
  module.exports=requirementdetails;

