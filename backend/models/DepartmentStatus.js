var db=require('../dbconnection');
var DepartmentStatus=
{ 
Save_DepartmentStatus:function(DepartmentStatus_,callback)
{ 
return db.query("CALL Save_DepartmentStatus("+"@DepartmentStatus_Id_ :=?,"+"@DepartmentStatus_Name_ :=?"+")"
,[DepartmentStatus_.DepartmentStatus_Id,DepartmentStatus_.DepartmentStatus_Name],callback);
},
Search_DepartmentStatus:function(DepartmentStatus_Name_,callback)
{ 
    if (DepartmentStatus_Name_==='undefined'||DepartmentStatus_Name_===''||DepartmentStatus_Name_===undefined ) 
DepartmentStatus_Name_='';
return db.query("CALL Search_DepartmentStatus(@DepartmentStatus_Name_ :=?)",[DepartmentStatus_Name_],callback);
},
Delete_DepartmentStatus:function(DepartmentStatus_Id_,callback)
{ 
return db.query("CALL Delete_DepartmentStatus(@DepartmentStatus_Id_ :=?)",[DepartmentStatus_Id_],callback);
}
};
module.exports=DepartmentStatus;
