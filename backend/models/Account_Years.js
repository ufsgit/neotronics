 var db=require('../dbconnection');
 var fs = require('fs');
 var Account_Years=
 { 
 Save_Account_Years:function(Account_Years_,callback)
 { 
        return db.query("CALL Save_Account_Years("+ "@Account_Years_Id_ :=?,"+ "@Account_Year_ :=?,"+
        "@YearFrom_ :=?,"+ "@YearTo_ :=?"+")"
        ,[Account_Years_.Account_Years_Id, Account_Years_.Account_Year,   Account_Years_.YearFrom,
        Account_Years_.YearTo],callback);
 } ,
 Delete_Account_Years:function(Account_Years_Id_,callback)
        { 
        return db.query("CALL Delete_Account_Years(@Account_Years_Id_ :=?)",[Account_Years_Id_],callback);
        } ,
 Get_Account_Years:function(Account_Years_Id_,callback)
        { 
        return db.query("CALL Get_Account_Years(@Account_Years_Id_ :=?)",[Account_Years_Id_],callback);
        }        ,
 Search_Account_Years:function(Account_Years_Name_,callback)
        { 
        if (Account_Years_Name_==='undefined'||Account_Years_Name_===''||Account_Years_Name_===undefined )
        Account_Years_Name_='';
        return db.query("CALL Search_Account_Years(@Account_Years_Name_ :=?)",[Account_Years_Name_],callback);
        }
};
  module.exports=Account_Years;

