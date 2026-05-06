var db=require('../dbconnection');
var fs = require('fs');
var Journal_Entry=
{ 
Save_Journal_Entry:function(Journal_Entry_,callback)
   { 
          //console.log(Journal_Entry_)
   return db.query("CALL Save_Journal_Entry("+"@Journal_Entry_Id_ :=?,"+"@Date_ :=?,"+"@From_Account_Id_ :=?,"+"@Amount_ :=?,"+"@To_Account_Id_ :=?,"+"@PaymentMode_ :=?,"+
      "@User_Id_ :=?,"+"@Payment_Status_ :=?,"+"@Description_ :=?,"+"@CurrencyId_ :=?,"+"@AccountType_Id_ :=?,"+"@Payment_Term_Description_ :=?,"+"@PaymentTerms_ :=?,"+
      "@Notes_ :=?,"+"@PaymentTermValue_ :=?"+")"
   ,[Journal_Entry_.Journal_Entry_Id,Journal_Entry_.Date,Journal_Entry_.From_Account_Id,Journal_Entry_.Amount,Journal_Entry_.To_Account_Id,Journal_Entry_.PaymentMode,
      Journal_Entry_.User_Id,Journal_Entry_.Payment_Status,Journal_Entry_.Description, Journal_Entry_.CurrencyId,Journal_Entry_.AccountType_Id ,
   Journal_Entry_.Payment_Term_Description,Journal_Entry_.PaymentTerms,Journal_Entry_.Notes,Journal_Entry_.PaymentTermValue],callback);
   },
Delete_Journal_Entry:function(Journal_Entry_Id_,callback)
   { 
   return db.query("CALL Delete_Journal_Entry(@Journal_Entry_Id_ :=?)",[Journal_Entry_Id_],callback);
   },
Get_Journal_Entry:function(Journal_Entry_Id_,callback)
   { 
   return db.query("CALL Get_Journal_Entry(@Journal_Entry_Id_ :=?)",[Journal_Entry_Id_],callback);
   },
Search_Journal_Entry:function(From_Date_,To_Date_,From_Account_Id_,To_Account_Id_,Voucher_No_,Is_Date_Check_,User_Type,Login_User,callback)
   { 
   return db.query("CALL Search_Journal_Entry(@From_Date_ :=?,@To_Date_ :=?,@From_Account_Id_ :=?,@To_Account_Id_ :=?,@Voucher_No_  :=?,@Is_Date_Check_ :=?,@User_Type :=?,@Login_User :=?)",
      [From_Date_,To_Date_,From_Account_Id_,To_Account_Id_,Voucher_No_,Is_Date_Check_,User_Type,Login_User],callback);
   }
};
module.exports=Journal_Entry;

