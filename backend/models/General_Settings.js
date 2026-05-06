 var db=require('../dbconnection');
 var fs = require('fs');
 var General_Settings=
 { 
 Save_General_Settings:function(General_Settings_,callback)
 { 
return db.query("CALL Save_General_Settings("+
"@General_Settings_Id_ :=?,"+
"@Invoice_No_ :=?,"+
"@Purchase_Retrun_No_ :=?,"+
"@Sales_Return_No_ :=?,"+
"@Damage_No_ :=?,"+
"@Contra_Voucher_No_ :=?,"+
"@Jouranl_Voucher_No_ :=?,"+
"@Receipt_Voucher_No_ :=?,"+
"@Payment_Voucher_No_ :=?"+")"
 ,[General_Settings_.General_Settings_Id,
General_Settings_.Invoice_No,
General_Settings_.Purchase_Retrun_No,
General_Settings_.Sales_Return_No,
General_Settings_.Damage_No,
General_Settings_.Contra_Voucher_No,
General_Settings_.Jouranl_Voucher_No,
General_Settings_.Receipt_Voucher_No,
General_Settings_.Payment_Voucher_No
],callback);
 }
 ,
 Delete_General_Settings:function(General_Settings_Id_,callback)
 { 
return db.query("CALL Delete_General_Settings(@General_Settings_Id_ :=?)",[General_Settings_Id_],callback);
 }
 ,
 Get_General_Settings:function(General_Settings_Id_,callback)
 { 
return db.query("CALL Get_General_Settings(@General_Settings_Id_ :=?)",[General_Settings_Id_],callback);
 }
 ,
 Search_General_Settings:function(General_Settings_Name_,callback)
 { 
 if (General_Settings_Name_==='undefined'||General_Settings_Name_===''||General_Settings_Name_===undefined )
General_Settings_Name_='';
return db.query("CALL Search_General_Settings(@General_Settings_Name_ :=?)",[General_Settings_Name_],callback);
 }
  };
  module.exports=General_Settings;

