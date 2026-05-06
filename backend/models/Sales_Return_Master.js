 var db=require('../dbconnection');
 var fs = require('fs');
 var sales_return_master=
 { 
 Save_sales_return_master:function(sales_return_master_,callback)
 { 
return db.query("CALL Save_sales_return_master("+
"@Sales_Return_Master_Id_ :=?,"+
"@SalesMaster_Id_ :=?,"+
"@Account_Party_Id_ :=?,"+
"@EntryDate_ :=?,"+
"@InvNo_ :=?,"+
"@Sales_Return_InvNo_ :=?,"+
"@LPONo_ :=?,"+
"@DONo_ :=?,"+
"@PackingListNumber_ :=?,"+
"@CurrencyId_ :=?,"+
"@TypeId_ :=?,"+
"@PaymentTerms_ :=?,"+
"@TotalAmount_ :=?,"+
"@TotalDiscount_ :=?,"+
"@TaxableAmount_ :=?,"+
"@VatAmount_ :=?,"+
"@Total_Amount_ :=?,"+
"@Roundoff_Amt_ :=?,"+
"@NetTotal_ :=?,"+
"@Makes_ :=?,"+
"@PriceBasis_ :=?,"+
"@Description1_ :=?,"+
"@User_Id_ :=?,"+
"@Delivery_Address1_ :=?,"+
"@Delivery_Address2_ :=?,"+
"@Delivery_Address3_ :=?,"+
"@Delivery_Address4_ :=?,"+
"@KindAttend_ :=?,"+
"@Charge1_ :=?,"+
"@charge1_Amount_ :=?,"+
"@Charge2_ :=?,"+
"@charge2_Amount_ :=?,"+
"@Discount_Description_ :=?,"+
"@Additional_Discount_ :=?,"+
"@Description2_ :=?,"+
"@Employee_ :=?,"+
"@Basic_Discount_ :=?,"+
"@Amount_In_Words_ :=?,"+
"@Notes_ :=?,"+
"@Charge1per_ :=?,"+
"@Payment_Term_Description_ :=?,"+
"@VAT_Description_ :=?,"+
"@VAT_percentage_ :=?,"+
"@VAT_Amount_ :=?,"+
"@New_Entry_ :=?,"+
"@Customer_Reference_ :=?,"+
"@Sales_Return_InvImgage_ :=?,"+
"@UserName_ :=?,"+
"@CurrecnyName_ :=?"+")"
 ,[sales_return_master_.Sales_Return_Master_Id,
sales_return_master_.SalesMaster_Id,
sales_return_master_.Account_Party_Id,
sales_return_master_.EntryDate,
sales_return_master_.InvNo,
sales_return_master_.Sales_Return_InvNo,
sales_return_master_.LPONo,
sales_return_master_.DONo,
sales_return_master_.PackingListNumber,
sales_return_master_.CurrencyId,
sales_return_master_.TypeId,
sales_return_master_.PaymentTerms,
sales_return_master_.TotalAmount,
sales_return_master_.TotalDiscount,
sales_return_master_.TaxableAmount,
sales_return_master_.VatAmount,
sales_return_master_.Total_Amount,
sales_return_master_.Roundoff_Amt,
sales_return_master_.NetTotal,
sales_return_master_.Makes,
sales_return_master_.PriceBasis,
sales_return_master_.Description1,
sales_return_master_.User_Id,
sales_return_master_.Delivery_Address1,
sales_return_master_.Delivery_Address2,
sales_return_master_.Delivery_Address3,
sales_return_master_.Delivery_Address4,
sales_return_master_.KindAttend,
sales_return_master_.Charge1,
sales_return_master_.charge1_Amount,
sales_return_master_.Charge2,
sales_return_master_.charge2_Amount,
sales_return_master_.Discount_Description,
sales_return_master_.Additional_Discount,
sales_return_master_.Description2,
sales_return_master_.Employee,
sales_return_master_.Basic_Discount,
sales_return_master_.Amount_In_Words,
sales_return_master_.Notes,
sales_return_master_.Charge1per,
sales_return_master_.Payment_Term_Description,
sales_return_master_.VAT_Description,
sales_return_master_.VAT_percentage,
sales_return_master_.VAT_Amount,
sales_return_master_.New_Entry,
sales_return_master_.Customer_Reference,
sales_return_master_.Sales_Return_InvImgage,
sales_return_master_.UserName,
sales_return_master_.CurrecnyName
],callback);
 }
 ,
 Delete_sales_return_master:function(sales_return_master_Id_,callback)
 { 
return db.query("CALL Delete_sales_return_master(@sales_return_master_Id_ :=?)",[sales_return_master_Id_],callback);
 }
 ,
 Get_sales_return_master:function(sales_return_master_Id_,callback)
 { 
return db.query("CALL Get_sales_return_master(@sales_return_master_Id_ :=?)",[sales_return_master_Id_],callback);
 }
 ,

 Search_SaleInvoice_By_Supplier_Typeahead: function (
    Client_Accounts_Id_,
    InvoiceNo_,
    callback
) {
    if (
        InvoiceNo_ === "undefined" ||
        InvoiceNo_ === "" ||
        InvoiceNo_ === undefined
    )
    InvoiceNo_ = "";
    return db.query(
        "CALL Search_SaleInvoice_By_Supplier_Typeahead(@Client_Accounts_Id_ :=?,@InvoiceNo_ :=?)",
        [Client_Accounts_Id_, InvoiceNo_],
        callback
    );
},


 Search_SalesReturn_Master:function(Is_Date_Check_,FromDate_,ToDate_,
     Account_Party_Id_,Invoice_No_,Part_No_,
     Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
     User_Type, Login_User_Id, callback)
     { 
         if(Invoice_No_ == "undefined"){
             Invoice_No_ = ""
         }
         if(Part_No_ == "undefined"){
             Part_No_ = ""
         }               
     console.log('ItemName2_: ', Is_Date_Check_);
     const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
        if (specialCharacters.test(Part_No_)) {
            console.log("String contains special characters.");
             Part_No_ = Part_No_.replace(/\\/g, '\\\\');
        } else {
            console.log("String does not contain special characters.");
        }	
        console.log('Escaped Client_Accounts_Name:', Part_No_);
     return db.query("CALL Search_SalesReturn_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,"+
         "@User_Type :=?, @Login_User_Id :=?)",
     [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
         User_Type, Login_User_Id],callback);
     },
 
//  Search_SalesReturn_Master:function(sales_return_master_Name_,callback)
//  { User_Details_Id_User_Details_Id_@User_Details_Id_ :=?,
//  if (sales_return_master_Name_===undefined || sales_return_master_Name_==="undefined" )
// sales_return_master_Name_='';
// return db.query("CALL Search_SalesReturn_Master(@sales_return_master_Name_ :=?)",[sales_return_master_Name_],callback);
//  }


  };
  module.exports=sales_return_master;

