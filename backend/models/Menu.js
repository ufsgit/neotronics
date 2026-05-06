var db=require('../dbconnection');
var fs = require('fs');
var Menu=
{ 
Save_Menu:function(Menu_,callback)
    { 
    return db.query("CALL Save_Menu("+"@Menu_Id_ :=?,"+"@Menu_Name_ :=?,"+"@Menu_Order_ :=?,"+
    "@Menu_Edit_ :=?,"+"@Menu_Delete_ :=?,"+"@Menu_All_ :=?,"+"@Menu_Status_ :=?,"+
    "@Parent_Menu_slno_ :=?,"+"@Menu_Slno_ :=?"+")"
    ,[Menu_.Menu_Id,Menu_.Menu_Name,Menu_.Menu_Order,Menu_.Menu_Edit,Menu_.Menu_Delete,
    Menu_.Menu_All,Menu_.Menu_Status,Menu_.Parent_Menu_slno,Menu_.Menu_Slno],callback);
    } ,
Delete_Menu:function(Menu_Id_,callback)
    { 
    return db.query("CALL Delete_Menu(@Menu_Id_ :=?)",[Menu_Id_],callback);
    } ,
Get_Menu:function(Menu_Id_,callback)
    { 
    return db.query("CALL Get_Menu(@Menu_Id_ :=?)",[Menu_Id_],callback);
    } ,
Search_Menu:function(Menu_Name_,callback)
    { 
    return db.query("CALL Search_Menu(@Menu_Name_ :=?)",[Menu_Name_],callback);
    }
};
module.exports=Menu;

