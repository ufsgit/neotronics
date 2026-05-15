var db=require('../dbconnection');
var Department=
{ 
Save_Department:function(Department_,callback)
{ 
return db.query("CALL Save_Department("+"@Department_Id_ :=?,"+"@Department_Name_ :=?"+")"
,[Department_.Department_Id,Department_.Department_Name],callback);
},
Search_Department:function(Department_Name_,callback)
{ 
    if (Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined ) 
Department_Name_='';
return db.query("CALL Search_Department(@Department_Name_ :=?)",[Department_Name_],callback);
},
Delete_Department:function(Department_Id_,callback)
{ 
return db.query("CALL Delete_Department(@Department_Id_ :=?)",[Department_Id_],callback);
}
};
module.exports=Department;
