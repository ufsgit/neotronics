 var db=require('../dbconnection');
 var fs = require('fs');
 var Country_Of_Orgin=
 { 
 Save_Country_Of_Orgin:function(Country_Of_Orgin_,callback)
 { 
return db.query("CALL Save_Country_Of_Orgin("+
"@Country_Of_Orgin_Id_ :=?,"+
"@Country_Of_Orgin_Name_ :=?"+")"
 ,[Country_Of_Orgin_.Country_Of_Orgin_Id,
Country_Of_Orgin_.Country_Of_Orgin_Name
],callback);
 }
 ,
 Delete_Country_Of_Orgin:function(Country_Of_Orgin_Id_,callback)
 { 
return db.query("CALL Delete_Country_Of_Orgin(@Country_Of_Orgin_Id_ :=?)",[Country_Of_Orgin_Id_],callback);
 }
 ,
 Get_Country_Of_Orgin:function(Country_Of_Orgin_Id_,callback)
 { 
return db.query("CALL Get_Country_Of_Orgin(@Country_Of_Orgin_Id_ :=?)",[Country_Of_Orgin_Id_],callback);
 }
 ,
 Search_Country_Of_Orgin:function(Country_Of_Orgin_Name_,callback)
 { 
 if (Country_Of_Orgin_Name_===undefined || Country_Of_Orgin_Name_==="undefined" )
Country_Of_Orgin_Name_='';
return db.query("CALL Search_Country_Of_Orgin(@Country_Of_Orgin_Name_ :=?)",[Country_Of_Orgin_Name_],callback);
 }
  };
  module.exports=Country_Of_Orgin;

