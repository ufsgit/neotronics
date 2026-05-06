var db=require('../dbconnection');
var fs = require('fs');
var Primary_Details=
{ 
Save_Primary_Details:function(Primary_Details_,callback)
    { 
    return db.query("CALL Save_Primary_Details("+"@Primary_Details_Id_ :=?,"+"@Primary_Code_ :=?,"+
    "@Primary_Name_ :=?"+")"
    ,[Primary_Details_.Primary_Details_Id,Primary_Details_.Primary_Code,
    Primary_Details_.Primary_Name],callback);
    },
Delete_Primary_Details:function(Primary_Details_Id_,callback)
    { 
    return db.query("CALL Delete_Primary_Details(@Primary_Details_Id_ :=?)",[Primary_Details_Id_],callback);
    },
Get_Primary_Details:function(Primary_Details_Id_,callback)
    { 
    return db.query("CALL Get_Primary_Details(@Primary_Details_Id_ :=?)",[Primary_Details_Id_],callback);
    },
Search_Primary_Details:function(Primary_Details_Name_,callback)
    { 
    if (Primary_Details_Name_==='undefined'||Primary_Details_Name_===''||Primary_Details_Name_===undefined )
    Primary_Details_Name_='';
    return db.query("CALL Search_Primary_Details(@Primary_Details_Name_ :=?)",[Primary_Details_Name_],callback);
    }
};
module.exports=Primary_Details;

