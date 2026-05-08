var db=require('../dbconnection');
var fs = require('fs');
var requirementdetails=
{ 
Save_requirementdetails:function(requirementdetails_,callback)
{ 
    let details = requirementdetails_.Requirement_Details || [];
    if (typeof details !== 'string') {
        details = JSON.stringify(details);
    }
    return db.query("CALL Save_requirementdetails(@Requirement_Details_ :=?, @RequirementMaster_Id_ :=?, @RequirementNo_ :=?)",
        [details, requirementdetails_.RequirementMaster_Id, requirementdetails_.RequirementNo], callback);

 }
 ,
 Delete_requirementdetails:function(requirementdetails_Id_,callback)
 { 
return db.query("CALL Delete_requirementdetails(@requirementdetails_Id_ :=?)",[requirementdetails_Id_],callback);
 }
 ,
 Get_requirementdetails:function(requirementdetails_Id_,callback)
 { 
return db.query("CALL Get_requirementdetails(@requirementdetails_Id_ :=?)",[requirementdetails_Id_],callback);
 }
 ,
 Search_requirementdetails:function(requirementdetails_Name_,callback)
 { 
 if (requirementdetails_Name_===undefined || requirementdetails_Name_==="undefined" )
requirementdetails_Name_='';
return db.query("CALL Search_requirementdetails(@requirementdetails_Name_ :=?)",[requirementdetails_Name_],callback);
 }
  };
  module.exports=requirementdetails;

