 var db=require('../dbconnection');
 var fs = require('fs');
 var Account_Group=
 { 
Save_Account_Group:function(Account_Group_,callback)
{ 
              //console.log(Account_Group_)
    return db.query("CALL Save_Account_Group("+
    "@Account_Group_Id_ :=?,"+"@Primary_Id_ :=?,"+"@Group_Code_ :=?,"+"@Group_Name_:=?,"+ "@Link_Left_ :=?,"+
    "@Link_Right_ :=?,"+"@Under_Group_ :=?,"+"@IsPrimary_ :=?,"+"@CanDelete_ :=?,"+"@UserId_ :=?"+")"
    ,[Account_Group_.Account_Group_Id, Account_Group_.Primary_Id,Account_Group_.Group_Code,
     Account_Group_.Group_Name,Account_Group_.Link_Left,Account_Group_.Link_Right,Account_Group_.Under_Group,
     Account_Group_.IsPrimary,Account_Group_.CanDelete,Account_Group_.UserId ],callback);
} ,
Save_Store:function(Store_,callback)
{ 
              //console.log(Store_)
    return db.query("CALL Save_Store("+"@Store_Id_ :=?,"+"@Store_Name_ :=?,"+"@Address1_ :=?,"+"@Address2_:=?,"+ 
    "@Address3_ :=?,"+"@Phone_ :=?,"+"@Phone_ :=?,"+"@Description_ :=?,"+"@Store_Code_ :=?"+")"
    ,[Store_.Store_Id, Store_.Store_Name,Store_.Address1,Store_.Address2,Store_.Address3,Store_.Phone,Store_.Mobile1,
     Store_.Description,Store_.Store_Code ],callback);
} ,
 Delete_Account_Group:function(Account_Group_Id_,callback)
        { 
        return db.query("CALL Delete_Account_Group(@Account_Group_Id_ :=?)",[Account_Group_Id_],callback);
        } ,
Delete_Store:function(Store_Id_,callback)
       { 
       return db.query("CALL Delete_Store(@Store_Id_ :=?)",[Store_Id_],callback);
       } ,
Search_Store:function(Store_Name_,callback)
       { 
       if (Store_Name_==='undefined'||Store_Name_===''||Store_Name_===undefined )
       Store_Name_='';
       return db.query("CALL Search_Store(@Store_Name_ :=?)",[Store_Name_],callback);
       },
 Get_Account_Group:function(Account_Group_Id_,callback)
        { 
        return db.query("CALL Get_Account_Group(@Account_Group_Id_ :=?)",[Account_Group_Id_],callback);
        } ,
 Search_Account_Group:function(Group_Name_,callback)
        { 
        if (Group_Name_==='undefined'||Group_Name_===''||Group_Name_===undefined )
        Group_Name_='';
        return db.query("CALL Search_Account_Group(@Group_Name_ :=?)",[Group_Name_],callback);
        },
 Search_Account_Group_Typeahead:function(Group_Name_,callback)
        { 
        if (Group_Name_==='undefined'||Group_Name_===''||Group_Name_===undefined )
        Group_Name_='';
        return db.query("CALL Search_Account_Group_Typeahead(@Group_Name_ :=?)",[Group_Name_],callback);
        },

 AccountGroup_Typeahead:function(Group_Name_,callback)
        { 
        if (Group_Name_==='undefined'||Group_Name_===''||Group_Name_===undefined)
        Group_Name_='';
        return db.query("CALL AccountGroup_Typeahead(@Group_Name_ :=?)",[Group_Name_],callback);
        },
Load_Account_Group:function(Group_Name_,callback)
       { 
              if (Group_Name_==='undefined'||Group_Name_===''||Group_Name_===undefined)
        Group_Name_='';
       return db.query("CALL Load_Account_Group(@Group_Name_ :=?)",[Group_Name_],callback);
       },
  };
module.exports=Account_Group;