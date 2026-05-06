 var db=require('../dbconnection');
 var fs = require('fs');
 var deliveryordermaster=
 { 
 Save_deliveryordermaster:function(deliveryordermaster_,callback)
 { 
return db.query("CALL Save_deliveryordermaster("+
"@DeliveryOrderMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@DONo_ :=?,"+
"@LPONo_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@NetTotal_ :=?,"+
"@Makes_ :=?,"+
"@PriceBasis_ :=?,"+
"@Description1_ :=?,"+
"@User_Id_ :=?,"+
"@Delivery_Address1_ :=?,"+
"@Delivery_Address2_ :=?,"+
"@Delivery_Address3_ :=?,"+
"@Delivery_Address4_ :=?,"+
"@Kind_Attend_ :=?,"+
"@Payment_Term_Description_ :=?,"+
"@Deliver_Order_Image_ :=?,"+
"@CurrecnyName_ :=?,"+
"@UserName_ :=?"+")"
 ,[deliveryordermaster_.DeliveryOrderMaster_Id,
deliveryordermaster_.Account_Party_Id,
deliveryordermaster_.EntryDate,
deliveryordermaster_.DONo,
deliveryordermaster_.LPONo,
deliveryordermaster_.CurrencyId,
deliveryordermaster_.TypeId,
deliveryordermaster_.PaymentTerms,
deliveryordermaster_.TotalAmount,
deliveryordermaster_.TotalDiscount,
deliveryordermaster_.TaxableAmount,
deliveryordermaster_.VatAmount,
deliveryordermaster_.NetTotal,
deliveryordermaster_.Makes,
deliveryordermaster_.PriceBasis,
deliveryordermaster_.Description1,
deliveryordermaster_.User_Id,
deliveryordermaster_.Delivery_Address1,
deliveryordermaster_.Delivery_Address2,
deliveryordermaster_.Delivery_Address3,
deliveryordermaster_.Delivery_Address4,
deliveryordermaster_.Kind_Attend,
deliveryordermaster_.Payment_Term_Description,
deliveryordermaster_.Deliver_Order_Image,
deliveryordermaster_.CurrecnyName,
deliveryordermaster_.UserName
],callback);
 }
 ,
 Delete_deliveryordermaster:function(deliveryordermaster_Id_,callback)
 { 
return db.query("CALL Delete_deliveryordermaster(@deliveryordermaster_Id_ :=?)",[deliveryordermaster_Id_],callback);
 }
 ,
 Get_deliveryordermaster:function(deliveryordermaster_Id_,callback)
 { 
return db.query("CALL Get_deliveryordermaster(@deliveryordermaster_Id_ :=?)",[deliveryordermaster_Id_],callback);
 }
 ,
 Search_deliveryordermaster:function(deliveryordermaster_Name_,callback)
 { 
 if (deliveryordermaster_Name_===undefined || deliveryordermaster_Name_==="undefined" )
deliveryordermaster_Name_='';
return db.query("CALL Search_deliveryordermaster(@deliveryordermaster_Name_ :=?)",[deliveryordermaster_Name_],callback);
 }
  };
  module.exports=deliveryordermaster;

