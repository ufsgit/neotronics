var db=require('../dbconnection');
var fs = require('fs');
var Model=
{ 
Save_Model:function(Model_,callback)
{ 
return db.query("CALL Save_Model("+"@Model_Id_ :=?,"+"@Model_Name_ :=?,"+"@Model_Code_ :=?"+")"
,[Model_.Model_Id,Model_.Model_Name,Model_.Model_Code],callback);
},

Search_Model:function(Model_Name_,callback)
{ 
if (Model_Name_===undefined || Model_Name_==="undefined" )
Model_Name_='';
return db.query("CALL Search_Model(@Model_Name_ :=?)",[Model_Name_],callback);
},

};
module.exports=Model;

