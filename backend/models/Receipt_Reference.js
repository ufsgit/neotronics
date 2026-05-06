var db=require('../dbconnection');
var fs = require('fs');
var Receipt_Reference=
{ 
Save_Receipt_Reference:function(Receipt_Reference_,callback)
    { 
    return db.query("CALL Save_Receipt_Reference("+"@Receipt_Voucher_Reference_Id_ :=?,"+
    "@Payment_Voucher_Id_ :=?,"+"@Master_Id_ :=?,"+"@Amount_ :=?,"+"@Discount_ :=?"+")"
    ,[Receipt_Reference_.Receipt_Voucher_Reference_Id,Receipt_Reference_.Payment_Voucher_Id,
    Receipt_Reference_.Master_Id,Receipt_Reference_.Amount,Receipt_Reference_.Discount],callback);
    },
Delete_Receipt_Reference:function(Receipt_Reference_Id_,callback)
    { 
    return db.query("CALL Delete_Receipt_Reference(@Receipt_Reference_Id_ :=?)",[Receipt_Reference_Id_],callback);
    },
Get_Receipt_Reference:function(Receipt_Reference_Id_,callback)
    { 
    return db.query("CALL Get_Receipt_Reference(@Receipt_Voucher_Id_ :=?)",[Receipt_Reference_Id_],callback);
    },
Search_Receipt_Reference:function(Receipt_Reference_Name_,callback)
    { 
    if (Receipt_Reference_Name_==='undefined'||Receipt_Reference_Name_===''||Receipt_Reference_Name_===undefined )
    Receipt_Reference_Name_='';
    return db.query("CALL Search_Receipt_Reference(@Receipt_Reference_Name_ :=?)",[Receipt_Reference_Name_],callback);
    }
};
module.exports=Receipt_Reference;

