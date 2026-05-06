 var db=require('../dbconnection');
 var fs = require('fs');
 var purchase_return_master=
 { 
//  Save_purchase_return_master:function(purchase_return_master_,callback)
//  { 
// return db.query("CALL Save_purchase_return_master("+
// "@Purchase_Return_Master_Id_ :=?,"+
// "@PurchaseMaster_Id_ :=?,"+
// "@Account_Party_Id_ :=?,"+
// "@EntryDate_ :=?,"+
// "@PurchaseDate_ :=?,"+
// "@Purchase_Return_No_ :=?,"+
// "@InvoiceNo_ :=?,"+
// "@CurrencyId_ :=?,"+
// "@TypeId_ :=?,"+
// "@PaymentTerms_ :=?,"+
// "@AttendEmployee_ :=?,"+
// "@TotalAmount_ :=?,"+
// "@TotalDiscount_ :=?,"+
// "@TaxableAmount_ :=?,"+
// "@VatAmount_ :=?,"+
// "@NetTotal_ :=?,"+
// "@Brand_ :=?,"+
// "@PriceBasis_ :=?,"+
// "@Payment_Term_Description_ :=?,"+
// "@Delivery_ :=?,"+
// "@Validity_ :=?,"+
// "@Description1_ :=?,"+
// "@User_Id_ :=?,"+
// "@KindAttend_ :=?,"+
// "@Charge1_ :=?,"+
// "@charge1_Amount_ :=?,"+
// "@Charge2_ :=?,"+
// "@charge2_Amount_ :=?,"+
// "@Discount_Description_ :=?,"+
// "@Additional_Discount_ :=?,"+
// "@Description2_ :=?,"+
// "@Employee_ :=?,"+
// "@Basic_Discount_ :=?,"+
// "@Amount_In_Words_ :=?,"+
// "@Ponumber_ :=?,"+
// "@Conversion_ :=?,"+
// "@VAT_Description_ :=?,"+
// "@VAT_Percentage_ :=?,"+
// "@VAT_Amount_ :=?,"+
// "@Roundoff_Amt_ :=?,"+
// "@Purchase__Return_Invoice_Image_ :=?,"+
// "@UserName_ :=?,"+
// "@CurrecnyName_ :=?"+")"
//  ,[purchase_return_master_.Purchase_Return_Master_Id,
// purchase_return_master_.PurchaseMaster_Id,
// purchase_return_master_.Account_Party_Id,
// purchase_return_master_.EntryDate,
// purchase_return_master_.PurchaseDate,
// purchase_return_master_.Purchase_Return_No,
// purchase_return_master_.InvoiceNo,
// purchase_return_master_.CurrencyId,
// purchase_return_master_.TypeId,
// purchase_return_master_.PaymentTerms,
// purchase_return_master_.AttendEmployee,
// purchase_return_master_.TotalAmount,
// purchase_return_master_.TotalDiscount,
// purchase_return_master_.TaxableAmount,
// purchase_return_master_.VatAmount,
// purchase_return_master_.NetTotal,
// purchase_return_master_.Brand,
// purchase_return_master_.PriceBasis,
// purchase_return_master_.Payment_Term_Description,
// purchase_return_master_.Delivery,
// purchase_return_master_.Validity,
// purchase_return_master_.Description1,
// purchase_return_master_.User_Id,
// purchase_return_master_.KindAttend,
// purchase_return_master_.Charge1,
// purchase_return_master_.charge1_Amount,
// purchase_return_master_.Charge2,
// purchase_return_master_.charge2_Amount,
// purchase_return_master_.Discount_Description,
// purchase_return_master_.Additional_Discount,
// purchase_return_master_.Description2,
// purchase_return_master_.Employee,
// purchase_return_master_.Basic_Discount,
// purchase_return_master_.Amount_In_Words,
// purchase_return_master_.Ponumber,
// purchase_return_master_.Conversion,
// purchase_return_master_.VAT_Description,
// purchase_return_master_.VAT_Percentage,
// purchase_return_master_.VAT_Amount,
// purchase_return_master_.Roundoff_Amt,
// purchase_return_master_.Purchase__Return_Invoice_Image,
// purchase_return_master_.UserName,
// purchase_return_master_.CurrecnyName
// ],callback);
//  }
//  ,

Save_Purchase_Return_Master: function (Purchase_Data, callback)
{
     var Purchase_Value_ = 0;
     var Purchase_Value_document_Value_=0
     let Purchase_ = Purchase_Data;   
     if (Purchase_ != undefined && Purchase_ != '' && Purchase_ != null)
     Purchase_Value_ = 1 
       Purchase_Value_document_Value_ = 1;
       console.log("Purchase_ : ", Purchase_);
        return db.query("CALL Save_Purchase_Return_Master(@Purchase_:=?," + "@Purchase_Value_ :=?)", 
        [Purchase_,Purchase_Value_],callback); 
},

 Delete_purchase_return_master:function(purchase_return_master_Id_,callback)
 { 
return db.query("CALL Delete_purchase_return_master(@purchase_return_master_Id_ :=?)",[purchase_return_master_Id_],callback);
 }
 ,
 Get_purchase_return_details:function(purchase_return_master_Id_,callback)
 { 
return db.query("CALL Get_purchase_return_details(@purchase_return_master_Id_ :=?)",[purchase_return_master_Id_],callback);
 }
 ,
 Search_purchase_return_master:function(Is_Date_Check,FromDate,ToDate,InvoiceNo,Customer,AccountType_Id_,CurrencyDetails_Id_,
    partNo,Item_Group_Id_,User_Type,Login_User_Id,callback)
    { 

        console.log('InvoiceNo: ',InvoiceNo)

        if (InvoiceNo.includes('\\') || InvoiceNo.includes('%') || InvoiceNo.includes("'")) {
            console.log("String contains special characters: \\, ', or %");
            InvoiceNo = InvoiceNo.replace(/([\\%'])/g, '\\$1');
    
        } else {
            console.log("String does not contain special characters.");
        }
        if(InvoiceNo === 0 || InvoiceNo ==='undefined' || InvoiceNo=== '' || InvoiceNo === undefined ||InvoiceNo === '0')
        {
            InvoiceNo = '';
        }
        else{ InvoiceNo = InvoiceNo.trim();}
        if(partNo === 0 || partNo ==='undefined' || partNo=== '' || partNo === undefined ||partNo === '0')
            {
                partNo = '';
            }
            else{partNo = partNo.trim();}

            
           
    console.log('ItemName2_: ', partNo);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(partNo)) {
			console.log("String contains special characters.");
            partNo = partNo.replace(/\\/g, '\\\\');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', partNo);


    return db.query("CALL Search_purchase_return_master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@InvoiceNo_:=?,@Customer_ :=?,"+
        "@AccountType_Id_ :=?,@CurrencyDetails_Id_ :=?,@partNo_ :=?,@Item_Group_Id_:=?,@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check,FromDate,ToDate,InvoiceNo,Customer,AccountType_Id_,CurrencyDetails_Id_,partNo,Item_Group_Id_,
        User_Type, Login_User_Id],callback);
    },


 Search_Invoice_By_Supplier_Typeahead: function (
    Client_Accounts_Id_,
    InvoiceNo_,
    callback
) {

    if (InvoiceNo_.includes('\\') || InvoiceNo_.includes('%') || InvoiceNo_.includes("'")) {
        console.log("String contains special characters: \\, ', or %");
        InvoiceNo_ = InvoiceNo_.replace(/([\\%'])/g, '\\$1');

    } else {
        console.log("String does not contain special characters.");
    }

    if (
        InvoiceNo_ === "undefined" ||
        InvoiceNo_ === "" ||
        InvoiceNo_ === undefined
    )
    InvoiceNo_ = "";
    return db.query(
        "CALL Search_Invoice_By_Supplier_Typeahead(@Client_Accounts_Id_ :=?,@InvoiceNo_ :=?)",
        [Client_Accounts_Id_, InvoiceNo_],
        callback
    );
},


Get_PurchaseReturn_Item_Code_Typeahead: function (Purchase_Master_Id,Item_Code_, callback) {
         if (Item_Code_ === 'undefined' || Item_Code_ === '' || Item_Code_ === undefined)
             Item_Code_ = '';
         return db.query("CALL Get_PurchaseReturn_Item_Code_Typeahead(@Purchase_Master_Id_ :=?,@Item_Code_ :=?)", [Purchase_Master_Id,Item_Code_], callback);
     },



  };
  module.exports=purchase_return_master;

