var db=require('../dbconnection');
var fs = require('fs');
var Sales_Details=
{ 
Save_Sales_Details:function(Sales_Details_,callback)
    { 
    return db.query("CALL Save_Sales_Details("+"@Sales_Details_Id_ :=?,"+"@Sales_Master_Id_ :=?,"+
    "@Stock_Id_ :=?,"+"@Stock_Details_Id_ :=?,"+"@ItemId_ :=?,"+"@ItemName_ :=?,"+"@Barcode_ :=?,"+
    "@GroupId_ :=?,"+"@GroupName_ :=?,"+"@UnitId_ :=?,"+"@UnitName_ :=?,"+"@PurchaseRate_ :=?,"+
    "@SaleRate_ :=?,"+"@MRP_ :=?,"+"@HSNId_ :=?,"+"@HSNCODE_ :=?,"+"@SaleTax_ :=?,"+"@CGST_ :=?,"+
    "@IGST_ :=?,"+"@SGST_ :=?,"+"@Cesspers_ :=?,"+"@Quantity_ :=?,"+"@GrossValue_ :=?,"+
    "@Discount_ :=?,"+"@NetValue_ :=?,"+"@CGSTAMT_ :=?,"+"@SGSTAMT_ :=?,"+"@IGSTAMT_ :=?,"+
    "@CessAMT_ :=?,"+"@TotalAmount_ :=?"+")"
    ,[Sales_Details_.Sales_Details_Id,Sales_Details_.Sales_Master_Id,Sales_Details_.Stock_Id,
    Sales_Details_.Stock_Details_Id,Sales_Details_.ItemId,Sales_Details_.ItemName,Sales_Details_.Barcode,
    Sales_Details_.GroupId,Sales_Details_.GroupName,Sales_Details_.UnitId,Sales_Details_.UnitName,
    Sales_Details_.PurchaseRate,Sales_Details_.SaleRate,Sales_Details_.MRP,Sales_Details_.HSNId,
    Sales_Details_.HSNCODE,Sales_Details_.SaleTax,Sales_Details_.CGST,Sales_Details_.IGST,
    Sales_Details_.SGST,Sales_Details_.Cesspers,Sales_Details_.Quantity,Sales_Details_.GrossValue,
    Sales_Details_.Discount,Sales_Details_.NetValue,Sales_Details_.CGSTAMT,Sales_Details_.SGSTAMT,
    Sales_Details_.IGSTAMT,Sales_Details_.CessAMT,Sales_Details_.TotalAmount],callback);
    } ,
Delete_Sales_Details:function(Sales_Details_Id_,callback)
    { 
    return db.query("CALL Delete_Sales_Details(@Sales_Details_Id_ :=?)",[Sales_Details_Id_],callback);
    } ,
Get_Sales_Details:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Details(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    } ,
Get_Sales_Details_Mobile:function(Sales_Master_Id_,callback)
    { 
    return db.query("CALL Get_Sales_Details_Mobile(@Sales_Master_Id_ :=?)",[Sales_Master_Id_],callback);
    } ,
Search_Sales_Details:function(Sales_Details_Name_,callback)
    { 
    if (Sales_Details_Name_==='undefined'||Sales_Details_Name_===''||Sales_Details_Name_===undefined )
    Sales_Details_Name_='';
    return db.query("CALL Search_Sales_Details(@Sales_Details_Name_ :=?)",[Sales_Details_Name_],callback);
    }
};
module.exports=Sales_Details;

