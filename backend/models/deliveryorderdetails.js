 var db=require('../dbconnection');
 var fs = require('fs');
 var deliveryorderdetails=
 { 
 Save_deliveryorderdetails:function(deliveryorderdetails_,callback)
 { 
return db.query("CALL Save_deliveryorderdetails("+
"@DeliveryOrderDetails_Id_ :=?,"+
"@DeliveryMaster_Id_ :=?,"+
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
"@NetValue_ :=?"+")"
 ,[deliveryorderdetails_.DeliveryOrderDetails_Id,
deliveryorderdetails_.DeliveryMaster_Id,
deliveryorderdetails_.ItemId,
deliveryorderdetails_.ItemCode,
deliveryorderdetails_.ItemName,
deliveryorderdetails_.GroupId,
deliveryorderdetails_.GroupName,
deliveryorderdetails_.UnitId,
deliveryorderdetails_.UnitName,
deliveryorderdetails_.StockId,
deliveryorderdetails_.UnitPrice,
deliveryorderdetails_.MRP,
deliveryorderdetails_.HSNMasterId,
deliveryorderdetails_.HSNCODE,
deliveryorderdetails_.Country_Id,
deliveryorderdetails_.Country_Name,
deliveryorderdetails_.SaleTax,
deliveryorderdetails_.Quantity,
deliveryorderdetails_.Amount,
deliveryorderdetails_.Discount,
deliveryorderdetails_.TaxableAmount,
deliveryorderdetails_.TaxAmount,
deliveryorderdetails_.NetValue
],callback);
 }
 ,
 Delete_deliveryorderdetails:function(deliveryorderdetails_Id_,callback)
 { 
return db.query("CALL Delete_deliveryorderdetails(@deliveryorderdetails_Id_ :=?)",[deliveryorderdetails_Id_],callback);
 }
 ,
 Get_deliveryorderdetails:function(deliveryorderdetails_Id_,callback)
 { 
return db.query("CALL Get_deliveryorderdetails(@deliveryorderdetails_Id_ :=?)",[deliveryorderdetails_Id_],callback);
 }
 ,
 Search_deliveryorderdetails:function(deliveryorderdetails_Name_,callback)
 { 
 if (deliveryorderdetails_Name_===undefined || deliveryorderdetails_Name_==="undefined" )
deliveryorderdetails_Name_='';
return db.query("CALL Search_deliveryorderdetails(@deliveryorderdetails_Name_ :=?)",[deliveryorderdetails_Name_],callback);
 }
  };
  module.exports=deliveryorderdetails;

