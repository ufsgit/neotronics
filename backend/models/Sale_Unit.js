var db=require('../dbconnection');
var fs = require('fs');
var Sale_Unit=
{ 
Save_Sale_Unit:function(Sale_Unit_,callback)
{ 
         console.log(Sale_Unit_)
    return db.query("CALL Save_Sale_Unit("+"@Sale_Unit_Id_ :=?,"+"@Sale_Unit_Code_ :=?,"+
    "@Sale_Unit_Name_ :=?"+")"
    ,[Sale_Unit_.Sale_Unit_Id,Sale_Unit_.Sale_Unit_Code,Sale_Unit_.Sale_Unit_Name],callback);
}
,
Delete_Sale_Unit:function(Sale_Unit_Id_,callback)
    { 
    return db.query("CALL Delete_Sale_Unit(@Sale_Unit_Id_ :=?)",[Sale_Unit_Id_],callback);
    },
Get_Sale_Unit:function(Sale_Unit_Id_,callback)
    { 
    return db.query("CALL Get_Sale_Unit(@Sale_Unit_Id_ :=?)",[Sale_Unit_Id_],callback);
    },
Search_Sale_Unit:function(Sale_Unit_Name_,callback)
    { 
    if (Sale_Unit_Name_==='undefined'||Sale_Unit_Name_===''||Sale_Unit_Name_===undefined )
    Sale_Unit_Name_='';
    return db.query("CALL Search_Sale_Unit(@Sale_Unit_Name_ :=?)",[Sale_Unit_Name_],callback);
    }
};
module.exports=Sale_Unit;

