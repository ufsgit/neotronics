var db=require('../dbconnection');
var fs = require('fs');
var Accounts=
{ 
Save_Accounts:function(Accounts_,callback)
{ 
   return db.query("CALL Save_Accounts("+"@Accounts_Id_ :=?,"+"@Entry_Date_ :=?,"+ "@Client_Id_ :=?,"+
   "@Dr_ :=?,"+"@Cr_ :=?,"+"@X_Client_Id_ :=?,"+"@Tran_Type_ :=?,"+ "@Tran_Id_ :=?,"+"@Voucher_No_ :=?,"+
   "@VoucherType_ :=?,"+"@Description1_:=?,"+"@Status_ =?,"+ "@DayBook_ :=?,"+ "@Payment_Status_ :=?"+")"
   ,[Accounts_.Accounts_Id,Accounts_.Entry_Date,Accounts_.Client_Id,Accounts_.Dr,Accounts_.Cr,
   Accounts_.X_Client_Id,Accounts_.Tran_Type, Accounts_.Tran_Id,Accounts_.Voucher_No,Accounts_.VoucherType,
   Accounts_.Description1,Accounts_.Status,Accounts_.DayBook,Accounts.Payment_Status],callback);
} ,
Delete_Accounts:function(Accounts_Id_,callback)
{ 
   return db.query("CALL Delete_Accounts(@Accounts_Id_ :=?)",[Accounts_Id_],callback);
} ,
Get_Accounts:function(Accounts_Id_,callback)
{ 
      return db.query("CALL Get_Accounts(@Accounts_Id_ :=?)",[Accounts_Id_],callback);
} ,
Search_Accounts:function(Accounts_Name_,callback)
{ 
   if (Accounts_Name_==='undefined'||Accounts_Name_===''||Accounts_Name_===undefined )
   Accounts_Name_='';
   return db.query("CALL Search_Accounts(@Accounts_Name_ :=?)",[Accounts_Name_],callback);
},

};
module.exports=Accounts;

