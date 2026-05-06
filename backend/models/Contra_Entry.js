var db=require('../dbconnection');
var fs = require('fs');
var Contra_Entry=
{ 
Save_Contra_Entry:function(Contra_Entry_,callback)
    { 
    return db.query("CALL Save_Contra_Entry("+"@Contra_Entry_Id_ :=?,"+"@Date_ :=?,"+
    "@From_Account_Id_ :=?,"+"@Amount_ :=?,"+"@To_Account_Id_ :=?,"+"@PaymentModeName_ :=?,"+"@User_Id_ :=?,"+
    "@Payment_Status_ :=?,"+"@Description_ :=?)"
    ,[Contra_Entry_.Contra_Entry_Id,Contra_Entry_.Date,Contra_Entry_.From_Account_Id,
    Contra_Entry_.Amount,Contra_Entry_.To_Account_Id,Contra_Entry_.PaymentModeName,Contra_Entry_.User_Id,
    Contra_Entry_.Payment_Status,Contra_Entry_.Description],callback);
    },
Delete_Contra_Entry:function(Contra_Entry_Id_,callback)
    { 
    return db.query("CALL Delete_Contra_Entry(@Contra_Entry_Id_ :=?)",[Contra_Entry_Id_],callback);
    },
Get_Contra_Entry:function(Contra_Entry_Id_,callback)
    { 
    return db.query("CALL Get_Contra_Entry(@Contra_Entry_Id_ :=?)",[Contra_Entry_Id_],callback);
    },
Search_Contra_Entry:function(From_Date_,To_Date_,To_Account_Id_,Voucher_No_,Is_Date_Check_,User_Type,Login_User,callback)
    { 
    return db.query("CALL Search_Contra_Entry(@From_Date_ :=?,@To_Date_ :=?,@To_Account_Id_ :=?,@Voucher_No_  :=?,@Is_Date_Check_ :=?,@User_Type :=?,@Login_User :=?)",
        [From_Date_,To_Date_,To_Account_Id_,Voucher_No_,Is_Date_Check_,User_Type,Login_User],callback);
    }
};
module.exports=Contra_Entry;

