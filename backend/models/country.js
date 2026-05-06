 var db=require('../dbconnection');
 var fs = require('fs');
 var country=
 { 
 Save_country:function(country_,callback)
 { 
return db.query("CALL Save_country("+
"@Country_Id_ :=?,"+
"@Country_Name_ :=?"+")"
 ,[country_.Country_Id,
country_.Country_Name
],callback);
 }
 ,
 Delete_country:function(country_Id_,callback)
 { 
return db.query("CALL Delete_country(@country_Id_ :=?)",[country_Id_],callback);
 }
 ,
 Get_country:function(country_Id_,callback)
 { 
return db.query("CALL Get_country(@country_Id_ :=?)",[country_Id_],callback);
 }
 ,
 Load_Country:function(callback)
 { 

return db.query("CALL Load_Country()",[],callback);
 },

 Search_country:function(country_Name_,callback)
 { 
 if (country_Name_===undefined || country_Name_==="undefined" )
country_Name_='';
return db.query("CALL Search_country(@country_Name_ :=?)",[country_Name_],callback);
 }
  };
  module.exports=country;

