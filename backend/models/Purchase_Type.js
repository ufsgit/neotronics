var db=require('../dbconnection');
var fs = require('fs');
var Purchase_Type=
{ 

    Save_Purchase_Type:function(Purchase_Type_,callback)
    {    
        return db.query("CALL Save_Purchase_Type("+"@Purchase_Type_Id_ :=?,"+"@Purchase_Type_Name_ :=?,"+"@Status_ :=?,"+"@Email_ :=?,"+"@DeleteStatus_ :=?"+")" ,
        [Purchase_Type_.Purchase_Type_Id,Purchase_Type_.Purchase_Type_Name,Purchase_Type_.Status,Purchase_Type_.Email,Purchase_Type_.DeleteStatus],callback);
    } ,

    Search_Purchase_Type:function(Purchase_Type_Name_,callback)
    {         
    if (Purchase_Type_Name_==='undefined'||Purchase_Type_Name_===''||Purchase_Type_Name_===undefined )
    Purchase_Type_Name_='';
    return db.query("CALL Search_Purchase_Type(@Purchase_Type_Name_ :=?)",[Purchase_Type_Name_],callback);
    },

    Delete_Purchase_Type:function(Purchase_Type_Id_,callback)
    { 
    return db.query("CALL Delete_Purchase_Type(@Purchase_Type_Id_ :=?)",[Purchase_Type_Id_],callback);
    } ,

    
    Load_Purchase_type:function(callback)
    { 
    return db.query("CALL Load_Purchase_type()",[],callback);
    },   

};
module.exports=Purchase_Type;

