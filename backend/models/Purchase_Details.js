var db=require('../dbconnection');
var fs = require('fs');
var Purchase_Details=
{ 
Save_Purchase_Details:function(Purchase_Details_,callback)
{ 
return db.query("CALL Save_Purchase_Details("+"@Purchase_Details_Id_ :=?,"+"@Purchase_Master_Id_ :=?,"+
"@ItemId_ :=?,"+"@Barcode_ :=?,"+"@ItemName_ :=?,"+"@GroupId_ :=?,"+"@GroupName_ :=?,"+
"@UnitId_ :=?,"+"@UnitName_ :=?,"+"@StockId_ :=?,"+"@PurchaseRate_ :=?,"+"@SaleRate_ :=?,"+
"@MRP_ :=?,"+"@HSNMasterId_ :=?,"+"@HSNCODE_ :=?,"+"@Include_Tax_ :=?,"+"@SaleTax_ :=?,"+"@Quantity_ :=?,"+
"@Stock_Details_Id_ :=?,"+"@To_Employee_Id_ :=?,"+"@GrssValue_ :=?,"+"@Discount_ :=?,"+
"@NetValue_ :=?,"+"@CGST_ :=?,"+"@CGST_AMT_ :=?,"+"@SGST_ :=?,"+"@SGST_AMT_ :=?,"+"@IGST_ :=?,"+
"@IGST_AMT_ :=?,"+"@TotalAmount_ :=?,"+"@Is_Expiry_ :=?,"+"@Expiry_Date_ :=?"+")"
,[Purchase_Details_.Purchase_Details_Id,Purchase_Details_.Purchase_Master_Id,Purchase_Details_.ItemId,
Purchase_Details_.Barcode,Purchase_Details_.ItemName,Purchase_Details_.GroupId,Purchase_Details_.GroupName,
Purchase_Details_.UnitId,Purchase_Details_.UnitName,Purchase_Details_.StockId,Purchase_Details_.PurchaseRate,
Purchase_Details_.SaleRate,Purchase_Details_.MRP,Purchase_Details_.HSNMasterId,Purchase_Details_.HSNCODE,
Purchase_Details_.Include_Tax,Purchase_Details_.SaleTax,Purchase_Details_.Quantity,Purchase_Details_.Stock_Details_Id,
Purchase_Details_.To_Employee_Id,Purchase_Details_.GrssValue,Purchase_Details_.Discount,
Purchase_Details_.NetValue,Purchase_Details_.CGST,Purchase_Details_.CGST_AMT,Purchase_Details_.SGST,
Purchase_Details_.SGST_AMT,Purchase_Details_.IGST,Purchase_Details_.IGST_AMT,Purchase_Details_.TotalAmount,
Purchase_Details_.Is_Expiry,Purchase_Details_.Expiry_Date,],callback);
} ,
Delete_Purchase_Details:function(Purchase_Details_Id_,callback)
    { 
    return db.query("CALL Delete_Purchase_Details(@Purchase_Details_Id_ :=?)",[Purchase_Details_Id_],callback);
    } ,
Get_Purchase_Details:function(Purchase_Details_Id_,callback)
    { 
    return db.query("CALL Get_Purchase_Details(@Purchase_Details_Id_ :=?)",[Purchase_Details_Id_],callback);
    } ,
Search_Purchase_Details:function(Purchase_Details_Name_,callback)
    { 
    if (Purchase_Details_Name_==='undefined'||Purchase_Details_Name_===''||Purchase_Details_Name_===undefined )
    Purchase_Details_Name_='';
    return db.query("CALL Search_Purchase_Details(@Purchase_Details_Name_ :=?)",[Purchase_Details_Name_],callback);
    },
    
};
module.exports=Purchase_Details;

