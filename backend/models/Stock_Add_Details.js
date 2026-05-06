var db=require('../dbconnection');
var fs = require('fs');
var Stock_Add_Details=
{ 
Delete_Stock_Add_Details:function(Stock_Add_Details_Id_,callback)
    { 
    return db.query("CALL Delete_Stock_Add_Details(@Stock_Add_Details_Id_ :=?)",[Stock_Add_Details_Id_],callback);
    } ,
Get_Stock_Add_Details:function(Stock_Add_Master_Id_,callback)
    { 
    return db.query("CALL Get_Stock_Add_Details(@Stock_Add_Master_Id_ :=?)",[Stock_Add_Master_Id_],callback);
    } ,
Search_Stock_Add_Details:function(Stock_Add_Details_Name_,callback)
    { 
    if (Stock_Add_Details_Name_==='undefined'||Stock_Add_Details_Name_===''||Stock_Add_Details_Name_===undefined )
    Stock_Add_Details_Name_='';
    return db.query("CALL Search_Stock_Add_Details(@Stock_Add_Details_Name_ :=?)",[Stock_Add_Details_Name_],callback);
    },
    Get_ItemGroup_Load_Data:function(callback)
    { 
    return db.query("CALL Get_StockTransfer_Dropdowns()",[],callback);
    },

    	/***Added on 23-02-2024 */
    Get_Item_Name_Get_With_Code_Stock_Add_Details:function(Item_Code_,Item_Group_Id_,callback)
    { 
	    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined || Item_Code_==="0" || Item_Code_==='0')
	    Item_Code_='';
    console.log(Item_Code_);
	    return db.query("CALL Get_Item_Name_Get_With_Code_Stock_Add_Details(@Item_Code_ :=?,@Item_Group_Id_:=?)",[Item_Code_,Item_Group_Id_],callback);
},

Get_Item_Name_Get_With_Code_Stock_Add_Details_App:function(Item_Code_,Item_Group_Id_,callback)
{ 
    console.log('Item_Group_Id_: ', Item_Group_Id_);
    console.log('Item_Code_: ', Item_Code_);
    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined || Item_Code_=='0'||Item_Code_==0)
        Item_Code_='';
    console.log('Item_Code_: ', Item_Code_);

    return db.query("CALL Get_Item_Name_Get_With_Code_Stock_Add_Details_App(@Item_Code_ :=?,@Item_Group_Id_:=?)",[Item_Code_,Item_Group_Id_],callback);
},


/** Added on 22-08-2024 */

Get_Stock_Add_Details_Report:function(Stock_Add_Master_Id_,callback)
    { 
        return db.query("CALL Get_Stock_Add_Details_Report(@Stock_Add_Master_Id_ :=?)",[Stock_Add_Master_Id_],callback);
    } ,


};
module.exports=Stock_Add_Details;

