var db=require('../dbconnection');
var fs = require('fs');
var User_Menu_Selection=
{ 
Save_User_Menu_Selection:function(User_Menu_Selection_,callback)
    { 
    return db.query("CALL Save_User_Menu_Selection("+"@User_Menu_Selection_Id_ :=?,"+"@Menu_Id_ :=?,"+
    "@User_Id_ :=?,"+"@IsEdit_ :=?,"+"@IsSave_ :=?,"+"@IsDelete_ :=?,"+"@IsView_ :=?,"+"@Menu_Status_ :=?"+")"
    ,[User_Menu_Selection_.User_Menu_Selection_Id,User_Menu_Selection_.Menu_Id,
    User_Menu_Selection_.User_Id,User_Menu_Selection_.IsEdit,User_Menu_Selection_.IsSave,
    User_Menu_Selection_.IsDelete,User_Menu_Selection_.IsView,User_Menu_Selection_.Menu_Status
    ],callback);
    } ,
Delete_User_Menu_Selection:function(User_Menu_Selection_Id_,callback)
    { 
    return db.query("CALL Delete_User_Menu_Selection(@User_Menu_Selection_Id_ :=?)",[User_Menu_Selection_Id_],callback);
    } ,
Get_User_Menu_Selection:function(User_Menu_Selection_Id_,callback)
    { 
    return db.query("CALL Get_User_Menu_Selection(@User_Menu_Selection_Id_ :=?)",[User_Menu_Selection_Id_],callback);
    } ,
Search_User_Menu_Selection:function(User_Menu_Selection_Name_,callback)
    { 
    if (User_Menu_Selection_Name_==='undefined'||User_Menu_Selection_Name_===''||User_Menu_Selection_Name_===undefined )
    User_Menu_Selection_Name_='';
    return db.query("CALL Search_User_Menu_Selection(@User_Menu_Selection_Name_ :=?)",[User_Menu_Selection_Name_],callback);
    }
};
module.exports=User_Menu_Selection;

