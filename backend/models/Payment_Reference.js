var db=require('../dbconnection');
var fs = require('fs');
var Payment_Reference=
{ 
Save_Payment_Reference:function(Payment_Reference_,callback)
    { 
    return db.query("CALL Save_Payment_Reference("+"@Payment_Reference_Id_ :=?,"+
    "@Payment_Voucher_Id_ :=?,"+"@Master_Id_ :=?,"+"@Amount_ :=?,"+"@Discount_ :=?"+")"
    ,[Payment_Reference_.Payment_Reference_Id,Payment_Reference_.Payment_Voucher_Id,
    Payment_Reference_.Master_Id,Payment_Reference_.Amount,Payment_Reference_.Discount],callback);
    } ,
Delete_Payment_Reference:function(Payment_Reference_Id_,callback)
    { 
    return db.query("CALL Delete_Payment_Reference(@Payment_Reference_Id_ :=?)",[Payment_Reference_Id_],callback);
    } ,
Get_Payment_Reference:function(Payment_Voucher_Id_,callback)
    { 
    return db.query("CALL Get_Payment_Reference(@Payment_Voucher_Id_ :=?)",[Payment_Voucher_Id_],callback);
    } ,
Search_Payment_Reference:function(Payment_Reference_Name_,callback)
    { 
    if (Payment_Reference_Name_==='undefined'||Payment_Reference_Name_===''||Payment_Reference_Name_===undefined )
    Payment_Reference_Name_='';
    return db.query("CALL Search_Payment_Reference(@Payment_Reference_Name_ :=?)",[Payment_Reference_Name_],callback);
    }
};
module.exports=Payment_Reference;

