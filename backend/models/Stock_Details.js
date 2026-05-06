var db=require('../dbconnection');
var fs = require('fs');
var Stock_Details=
{ 
Save_Stock_Details:function(Stock_Details_,callback)
    { 
    return db.query("CALL Save_Stock_Details("+"@Stock_Details_Id_ :=?,"+"@Stock_Id_ :=?,"+
    "@To_Employee_Id_ :=?,"+"@Quantity_ :=?"+")"
    ,[Stock_Details_.Stock_Details_Id,Stock_Details_.Stock_Id,Stock_Details_.To_Employee_Id,
    Stock_Details_.Quantity],callback);
    } ,
Delete_Stock_Details:function(Stock_Details_Id_,callback)
    { 
    return db.query("CALL Delete_Stock_Details(@Stock_Details_Id_ :=?)",[Stock_Details_Id_],callback);
    } ,
Get_Stock_Details:function(Stock_Details_Id_,callback)
    { 
    return db.query("CALL Get_Stock_Details(@Stock_Details_Id_ :=?)",[Stock_Details_Id_],callback);
    } ,
Search_Stock_Details:function(Stock_Details_Name_,callback)
    { 
    if (Stock_Details_Name_==='undefined'||Stock_Details_Name_===''||Stock_Details_Name_===undefined )
    Stock_Details_Name_='';
    return db.query("CALL Search_Stock_Details(@Stock_Details_Name_ :=?)",[Stock_Details_Name_],callback);
    }
};
module.exports=Stock_Details;

