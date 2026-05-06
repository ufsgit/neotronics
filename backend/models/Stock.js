 var db=require('../dbconnection');
 var fs = require('fs');
 var Stock=
 { 
 Save_Stock:function(Stock_,callback)
    { 
    return db.query("CALL Save_Stock("+"@Stock_Id_ :=?,"+"@ItemId_ :=?,"+"@Barcode_ :=?,"+"@ItemName_ :=?,"+
    "@GroupId_ :=?,"+"@GroupName_ :=?,"+"@UnitId_ :=?,"+"@UnitName_ :=?,"+"@PurchaseRate_ :=?,"+
    "@SaleRate_ :=?,"+"@MRP_ :=?,"+"@HSNMasterId_ :=?,"+"@HSNCODE_ :=?,"+"@SaleTax_ :=?,"+"@Quantity_ :=?,"+
    "@CGST_ :=?,"+"@SGST_ :=?,"+"@Is_Expiry_ :=?,"+"@Expiry_Date_ :=?"+")"
    ,[Stock_.Stock_Id,Stock_.ItemId,Stock_.Barcode,Stock_.ItemName,Stock_.GroupId,Stock_.GroupName,
    Stock_.UnitId,Stock_.UnitName,Stock_.PurchaseRate,Stock_.SaleRate,Stock_.MRP,Stock_.HSNMasterId,
    Stock_.HSNCODE,Stock_.SaleTax,Stock_.Quantity,Stock_.CGST,Stock_.SGST,Stock_.Is_Expiry,
    Stock_.Expiry_Date,],callback);
    } ,

Save_Stock_InStockReport:function(Stock_,callback)
{
    return db.query("CALL Save_Stock_InStockReport("+"@Stock_Id_ :=?,"+"@PurchaseRate_ :=?,"+"@SaleRate_ :=?,"+"@MRP_ :=?"+")"
    ,[Stock_.Stock_Id,Stock_.PurchaseRate,Stock_.SaleRate,Stock_.MRP,],callback);
} ,

 Delete_Stock:function(Stock_Id_,callback)
    { 
    return db.query("CALL Delete_Stock(@Stock_Id_ :=?)",[Stock_Id_],callback);
    } ,
 Get_Stock:function(Stock_Id_,callback)
    { 
    return db.query("CALL Get_Stock(@Stock_Id_ :=?)",[Stock_Id_],callback);
    } ,
 Search_Stock:function(Stock_Name_,callback)
    { 
    if (Stock_Name_==='undefined'||Stock_Name_===''||Stock_Name_===undefined )
    Stock_Name_='';
    return db.query("CALL Search_Stock(@Stock_Name_ :=?)",[Stock_Name_],callback);
    },

    
 Get_Stock_Item_Typeahead:function(ItemName_,callback)
    { 
      console.log('ItemName1_: ', ItemName_);
      if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';

      console.log('ItemName2_: ', ItemName_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(ItemName_)) {
			console.log("String contains special characters.");
			// ItemName_ = ItemName_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', ItemName_);

   return db.query("CALL Get_Stock_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },

    Get_Stock_Item_Code_Typeahead:function(Item_Code_,callback)
    { 
    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
      Item_Code_='';
    return db.query("CALL Get_Stock_Item_Code_Typeahead(@Item_Code_ :=?)",[Item_Code_],callback);
    },

    Get_Stock_Details_By_Item_Code_Typeahead:function(Item_Code_,callback)
    { 
    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
      Item_Code_='';
    return db.query("CALL Get_Stock_Details_By_Item_Code_Typeahead(@Item_Code_ :=?)",[Item_Code_],callback);
    },

 Get_Barcode_Typeahead:function(Barcode_,callback)
    { 
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Get_Barcode_Typeahead(@Barcode_ :=?)",[Barcode_],callback);
    },
Get_Sales_Item_Typeahead:function(ItemName_,callback)
    { 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
   return db.query("CALL Get_Sales_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },
    Get_ItemsforSalesReturn_Item_Typeahead:function(ItemName_,callback)
    { 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
   return db.query("CALL Get_ItemsforSalesReturn_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },
 Get_Sales_Barcode_Typeahead:function(Barcode_,callback)
    { 
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Get_Barcode_Typeahead(@Barcode_ :=?)",[Barcode_],callback);
    },
Load_Full_Stock:function(To_Employee_Id_,Barcode_,callback)
{ 
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Load_Full_Stock(@To_Employee_Id_ :=?,@Barcode_ :=?)",[To_Employee_Id_,Barcode_],callback);
},
    
Load_ItemDetails_MobileSales:function(To_Employee_Id_,callback)
{ 
    return db.query("CALL Load_ItemDetails_MobileSales(@To_Employee_Id_ :=?)",[To_Employee_Id_],callback);
    },


    Get_Purchase_Item_Code_Typeahead:function(Item_Code_,callback)
    { 
    if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
      Item_Code_='';

    console.log('ItemName1_: ', Item_Code_);

   //  const plusCharacters = /%2B/g;    
   //  if (plusCharacters.test(Item_Code_)) {
   //     console.log("String contains plus characters.");
   //     encodeURIComponent(Item_Code_);    
   //    } else {
   //     console.log("String does not contain plus characters.");
   //  }


    console.log('ItemName2_: ', Item_Code_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Item_Code_)) {
			console.log("String contains special characters.");
			// Item_Code_ = Item_Code_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}	
		console.log('Escaped Client_Accounts_Name:', Item_Code_);
    return db.query("CALL Get_Purchase_Item_Code_Typeahead(@Item_Code_ :=?)",[Item_Code_],callback);
    },


    Search_PurchaseItem_Typeahead:function(ItemName_,callback)
    { 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
   return db.query("CALL Search_PurchaseItem_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },


    Search_Stock_Details_Item_Typeahead:function(ItemName_,callback)
    { 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
   return db.query("CALL Search_Stock_Details_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
    },


};
  module.exports=Stock;

