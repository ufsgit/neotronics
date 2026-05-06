 var db=require('../dbconnection');
 var fs = require('fs');
 var request = require('request');
const fetch = require("node-fetch");
 const storedProcedure=require('../helpers/stored-procedure');
 var debitnote_master=
 { 
//  Save_debitnote_master:function(debitnote_master_,callback)
//  { 
// return db.query("CALL Save_debitnote_master("+
// "@DebitNote_Master_Id_ :=?,"+
// "@Account_Party_Id_ :=?,"+
// "@EntryDate_ :=?,"+
// "@InvNo_ :=?,"+
// "@LPONo_ :=?,"+
// "@DONo_ :=?,"+
// "@PackingListNumber_ :=?,"+
// "@CurrencyId_ :=?,"+
// "@TypeId_ :=?,"+
// "@PaymentTerms_ :=?,"+
// "@TotalAmount_ :=?,"+
// "@TotalDiscount_ :=?,"+
// "@TaxableAmount_ :=?,"+
// "@VatAmount_ :=?,"+
// "@Total_Amount_ :=?,"+
// "@Roundoff_Amt_ :=?,"+
// "@NetTotal_ :=?,"+
// "@Makes_ :=?,"+
// "@PriceBasis_ :=?,"+
// "@Description1_ :=?,"+
// "@User_Id_ :=?,"+
// "@Delivery_Address1_ :=?,"+
// "@Delivery_Address2_ :=?,"+
// "@Delivery_Address3_ :=?,"+
// "@Delivery_Address4_ :=?,"+
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
// "@Notes_ :=?,"+
// "@Charge1per_ :=?,"+
// "@Payment_Term_Description_ :=?,"+
// "@VAT_Description_ :=?,"+
// "@VAT_percentage_ :=?,"+
// "@VAT_Amount_ :=?,"+
// "@New_Entry_ :=?,"+
// "@Customer_Reference_ :=?,"+
// "@SupplyDate_ :=?,"+
// "@DueDate_ :=?,"+
// "@Debit_Node_Image_ :=?,"+
// "@CurrecnyName_ :=?,"+
// "@UserName_ :=?"+")"
//  ,[debitnote_master_.DebitNote_Master_Id,
// debitnote_master_.Account_Party_Id,
// debitnote_master_.EntryDate,
// debitnote_master_.InvNo,
// debitnote_master_.LPONo,
// debitnote_master_.DONo,
// debitnote_master_.PackingListNumber,
// debitnote_master_.CurrencyId,
// debitnote_master_.TypeId,
// debitnote_master_.PaymentTerms,
// debitnote_master_.TotalAmount,
// debitnote_master_.TotalDiscount,
// debitnote_master_.TaxableAmount,
// debitnote_master_.VatAmount,
// debitnote_master_.Total_Amount,
// debitnote_master_.Roundoff_Amt,
// debitnote_master_.NetTotal,
// debitnote_master_.Makes,
// debitnote_master_.PriceBasis,
// debitnote_master_.Description1,
// debitnote_master_.User_Id,
// debitnote_master_.Delivery_Address1,
// debitnote_master_.Delivery_Address2,
// debitnote_master_.Delivery_Address3,
// debitnote_master_.Delivery_Address4,
// debitnote_master_.KindAttend,
// debitnote_master_.Charge1,
// debitnote_master_.charge1_Amount,
// debitnote_master_.Charge2,
// debitnote_master_.charge2_Amount,
// debitnote_master_.Discount_Description,
// debitnote_master_.Additional_Discount,
// debitnote_master_.Description2,
// debitnote_master_.Employee,
// debitnote_master_.Basic_Discount,
// debitnote_master_.Amount_In_Words,
// debitnote_master_.Notes,
// debitnote_master_.Charge1per,
// debitnote_master_.Payment_Term_Description,
// debitnote_master_.VAT_Description,
// debitnote_master_.VAT_percentage,
// debitnote_master_.VAT_Amount,
// debitnote_master_.New_Entry,
// debitnote_master_.Customer_Reference,
// debitnote_master_.SupplyDate,
// debitnote_master_.DueDate,
// debitnote_master_.Debit_Node_Image,
// debitnote_master_.CurrecnyName,
// debitnote_master_.UserName
// ],callback);
//  }


Save_debitnote_master: async function (Sales_Master_) {
    return new Promise(async (rs,rej)=>{
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      try 
      {
       const result1 = await(new storedProcedure('Save_debitnote_master',[Sales_Master_.DebitNote_Master_Id,Sales_Master_.Account_Party_Id,Sales_Master_.EntryDate,Sales_Master_.LPONo,
           Sales_Master_.DONo,Sales_Master_.PackingListNumber,Sales_Master_.CurrencyId,Sales_Master_.TypeId,Sales_Master_.PaymentTerms,Sales_Master_.AttendEmployee,Sales_Master_.TotalAmount,Sales_Master_.TotalDiscount,Sales_Master_.Roundoff_Amt,
           Sales_Master_.Total_Amount,Sales_Master_.NetTotal,Sales_Master_.User_Id,Sales_Master_.Delivery_Address1,Sales_Master_.Delivery_Address2,
           Sales_Master_.Delivery_Address3, Sales_Master_.Delivery_Address4, Sales_Master_.Charge1, Sales_Master_.charge1_Amount,Sales_Master_.Charge2, Sales_Master_.charge2_Amount,
           Sales_Master_.Discount_Description, Sales_Master_.Additional_Discount, Sales_Master_.Description2, Sales_Master_.Amount_In_Words, Sales_Master_.Charge1per,Sales_Master_.Employee,
           Sales_Master_.DueDate,Sales_Master_.SupplyDate,Sales_Master_.Basic_Discount,
           Sales_Master_.Payment_Term_Description, Sales_Master_.VAT_percentage,Sales_Master_.VAT_Amount,Sales_Master_.TaxableAmount,Sales_Master_.KindAttend,Sales_Master_.PaymentTermValue, Sales_Master_.debitnote_details], connection)).result();
               console.log(result1)
           await connection.commit();
            connection.release();
            console.log(result1);
            rs( result1);
          }
       catch (err) {
           console.log('error:',err);
       await connection.rollback();
       rej(err);
       var result2=[{'DebitNote_Master_Id_':0}]      
       rs(result2);
     }
     finally 
        {
        connection.release();
        }
    })
}
 ,
 Delete_debitnote_master:function(debitnote_master_Id_,callback)
 { 
return db.query("CALL Delete_debitnote_master(@debitnote_master_Id_ :=?)",[debitnote_master_Id_],callback);
 }
 ,
 Get_debitnote_master:function(debitnote_master_Id_,callback)
 { 
return db.query("CALL Get_debitnote_master(@debitnote_master_Id_ :=?)",[debitnote_master_Id_],callback);
 }
 ,
//  Search_debitnote_master:function(debitnote_master_Name_,callback)
//  { 
//  if (debitnote_master_Name_===undefined || debitnote_master_Name_==="undefined" )
// debitnote_master_Name_='';
// return db.query("CALL Search_debitnote_master(@debitnote_master_Name_ :=?)",[debitnote_master_Name_],callback);
//  },
Search_debitnote_master:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,
    User_Type, Login_User_Id,callback)
    { 
        if(Invoice_No_ == "undefined"){
            Invoice_No_ = ""
        }
        if(Part_No_ == "undefined"){
            Part_No_ = ""
        }

        console.log('ItemName2_: ', Part_No_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
            console.log('Escaped Client_Accounts_Name:', Part_No_);
    
    
    return db.query("CALL Search_debitnote_master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,@User_Details_Id_ :=?, "+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,
        User_Type, Login_User_Id
    ],callback);
    },
    Get_debitnote_details:function(DebitNote_Master_Id_,callback)
    { 
    return db.query("CALL Get_debitnote_details(@DebitNote_Master_Id_:=?)",[DebitNote_Master_Id_],callback);
    } ,
  };
  module.exports=debitnote_master;

