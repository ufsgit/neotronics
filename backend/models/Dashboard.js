var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
var Dashboard=
{ 
 
    Search_Dashboard_Details:function(FromDate_,ToDate_,Is_Date_Check_,Branch_,Login_User_,callback)
    { 
        console.log(FromDate_);
    return db.query("CALL Search_Dashboard_Details(@FromDate_ :=?,@ToDate_ :=?,@Is_Date_Check_ :=?,@Branch_ :=?,@Login_User_ :=? )",
    [FromDate_,ToDate_,Is_Date_Check_,Branch_,Login_User_],callback);
    },

    Get_Dashboard_New_Count:function(Date_,Branch_,callback)
    { 
    return db.query("CALL Get_Dashboard_New_Count(@Date_ :=?,@Branch_ :=?)",
    [Date_,Branch_],callback);
    },

    Get_Dashboard_Details:function(Date_,Branch_Id_,Account_Name_,callback)
    { 
        if (Account_Name_ == null || Account_Name_ == undefined || Account_Name_ == 'undefined')
        {
            Account_Name_ = '';
        }
    return db.query("CALL Get_Dashboard_Details(@Date_ :=?,@Branch_Id_ :=?, @Account_Name_ :=?)",
    [Date_,Branch_Id_,Account_Name_],callback);
    },
 

};
module.exports=Dashboard;
