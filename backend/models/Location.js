var db=require('../dbconnection');
var fs = require('fs');
var Location=
{ 
Save_Location:function(Location_,callback)
        { 
        return db.query("CALL Save_Location("+
        "@Location_Id_ :=?,"+
        "@Location_Name_ :=?"+")"
        ,[Location_.Location_Id,
        Location_.Location_Name
        ],callback);
        },
Delete_Location:function(Location_Id_,callback)
        { 
        return db.query("CALL Delete_Location(@Location_Id_ :=?)",[Location_Id_],callback);
        },
Get_Location:function(Location_Id_,callback)
        { 
        return db.query("CALL Get_Location(@Location_Id_ :=?)",[Location_Id_],callback);
        },
Search_Location:function(Location_Name_,callback)
        { 
        if (Location_Name_==='undefined'||Location_Name_===''||Location_Name_===undefined )
        Location_Name_='';
        //else if (Location_Name_='');
        return db.query("CALL Search_Location(@Location_Name_ :=?)",[Location_Name_],callback);
        },
Load_Location:function(callback)
        { 
        return db.query("CALL Load_Location()",[],callback);
        },
};
module.exports=Location;

