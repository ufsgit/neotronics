var db=require('../dbconnection');
var fs = require('fs');
var Item_Group=
{ 
    
Save_Item_Group:function(Item_Group_,callback)
    { 
    return db.query("CALL Save_Item_Group("+"@Item_Group_Id_ :=?,"+"@Item_Group_Code_ :=?,"+
    "@Item_Group_Name_ :=?,"+"@UnderGroupId_ :=?"+")"
    ,[Item_Group_.Item_Group_Id,Item_Group_.Item_Group_Code,Item_Group_.Item_Group_Name,
    Item_Group_.UnderGroupId],callback);
    },

Delete_Item_Group:function(Item_Group_Id_,callback)
    { 
     
    return db.query("CALL Delete_Item_Group(@Item_Group_Id_ :=?)",[Item_Group_Id_],callback);
    },
Get_Item_Group:function(Item_Group_Id_,callback)
    { 
            //console.log(Item_Group_Id_)
    return db.query("CALL Get_Item_Group(@Item_Group_Id_ :=?)",[Item_Group_Id_],callback);
    },
Search_Item_Group:function(Item_Group_Name_,callback)
    { 
    if (Item_Group_Name_==='undefined'||Item_Group_Name_===''||Item_Group_Name_===undefined )
    Item_Group_Name_='';

    console.log('ItemName2_: ', Item_Group_Name_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Group_Name_)) {
			console.log("String contains special characters.");
			// Item_Group_Name_ = Item_Group_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Item_Group_Name_);

    return db.query("CALL Search_Item_Group(@Item_Group_Name_ :=?)",[Item_Group_Name_],callback);
    },
ItemGroup_Typehead:function(Item_Group_Name_,callback)
    { 
    if (Item_Group_Name_==='undefined'||Item_Group_Name_===''||Item_Group_Name_===undefined )
    Item_Group_Name_='';
    return db.query("CALL ItemGroup_Typehead(@Item_Group_Name_ :=?)",[Item_Group_Name_],callback);
    },
Load_Item_Group:function(callback)
    {  
    return db.query("CALL Load_Item_Group()",[],callback);
    },

/** Added on 17-7-24 */

Save_Master_Category:function(Item_Group_,callback)
    { 
    return db.query("CALL Save_Master_Category("+"@Master_Category_Id_ :=?,"+"@Master_Category_Name_ :=?)",
    [Item_Group_.Master_Category_Id,Item_Group_.Master_Category_Name,],callback);
    },

/** */


/** Added on 18-7-24*/

Delete_Master_Category:function(Item_Group_Id_,callback)
    { 
        return db.query("CALL Delete_Master_Category(@Item_Group_Id_ :=?)",[Item_Group_Id_],callback);
    },

Get_Master_Category:function(Item_Group_Id_,callback)
    { 
        return db.query("CALL Get_Master_Category(@Item_Group_Id_ :=?)",[Item_Group_Id_],callback);
    },

Search_Master_Category:function(Item_Group_Name_,callback)
    { 
        if (Item_Group_Name_==='undefined'||Item_Group_Name_===''||Item_Group_Name_===undefined )
        Item_Group_Name_='';
        return db.query("CALL Search_Master_Category(@Item_Group_Name_ :=?)",[Item_Group_Name_],callback);
    },

Get_Item_Group_DropDown_App:function(callback)
    { 
        return db.query("CALL Get_Item_Group_DropDown_App()",[],callback);
    },

Get_Master_Category_DropDown_App:function(callback)
    { 
        return db.query("CALL Get_Master_Category_DropDown_App()",[],callback);
    },

};
module.exports=Item_Group;