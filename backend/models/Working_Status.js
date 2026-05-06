 var db=require('../dbconnection');
 var fs = require('fs');
 var Working_Status=
 { 
 Save_Working_Status:function(Working_Status_,callback)
 { 
return db.query("CALL Save_Working_Status("+
"@Working_Status_Id_ :=?,"+
"@Working_Status_Name_ :=?"+")"
 ,[Working_Status_.Working_Status_Id,
Working_Status_.Working_Status_Name
],callback);
 }
 ,
 Delete_Working_Status:function(Working_Status_Id_,callback)
 { 
return db.query("CALL Delete_Working_Status(@Working_Status_Id_ :=?)",[Working_Status_Id_],callback);
 }
 ,
 Get_Working_Status:function(Working_Status_Id_,callback)
 { 
return db.query("CALL Get_Working_Status(@Working_Status_Id_ :=?)",[Working_Status_Id_],callback);
 }
 ,
 Search_Working_Status:function(Working_Status_Name_,callback)
 { 
 if (Working_Status_Name_===undefined || Working_Status_Name_==="undefined" )
Working_Status_Name_='';
return db.query("CALL Search_Working_Status(@Working_Status_Name_ :=?)",[Working_Status_Name_],callback);
 }
  };
  module.exports=Working_Status;

