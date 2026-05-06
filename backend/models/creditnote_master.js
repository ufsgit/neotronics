 var db=require('../dbconnection');
 var fs = require('fs');
 var request = require('request');
const fetch = require("node-fetch");
const storedProcedure=require('../helpers/stored-procedure');
 var creditnote_master=
 { 

    
    Save_creditnote_master: async function (creditnote_master_) {    
        console.log(creditnote_master_);
         return new Promise(async (rs,rej)=>{
           const pool = db.promise();
           let result1;
           var connection = await pool.getConnection();         
           try 
           {
            const result1 = await(new storedProcedure('Save_creditnote_master',[creditnote_master_.CreditNote_Master_Id,
                creditnote_master_.Account_Party_Id,creditnote_master_.EntryDate,creditnote_master_.LPONo,creditnote_master_.DONo,
                creditnote_master_.CurrencyId,creditnote_master_.TypeId,creditnote_master_.PaymentTerms,creditnote_master_.TotalAmount,
                creditnote_master_.TotalDiscount,creditnote_master_.Roundoff_Amt,creditnote_master_.Total_Amount,creditnote_master_.NetTotal,
                creditnote_master_.User_Id,creditnote_master_.Delivery_Address1,creditnote_master_.Delivery_Address2,
                creditnote_master_.Delivery_Address3,creditnote_master_.Delivery_Address4,creditnote_master_.Charge1,
                creditnote_master_.charge1_Amount,creditnote_master_.Charge2,creditnote_master_.charge2_Amount,
                creditnote_master_.Discount_Description,creditnote_master_.Additional_Discount,creditnote_master_.Description2, 
                creditnote_master_.Amount_In_Words,creditnote_master_.Charge1per,creditnote_master_.Employee,
                creditnote_master_.Basic_Discount,creditnote_master_.Payment_Term_Description,creditnote_master_.VAT_Percentage,
                creditnote_master_.VAT_Amount,creditnote_master_.TaxableAmount,creditnote_master_.KindAttend,
                creditnote_master_.PaymentTermValue,creditnote_master_.creditnote_details,creditnote_master_.Invoice_No,
                creditnote_master_.Sales_Master_Id       
            ], connection)).result();
                    console.log(result1)
                await connection.commit();
                 connection.release();
                 console.log(result1);
                 rs( result1);
               }
            catch (err) {
                console.log(err);
            await connection.rollback();
            rej(err);
            var result2=[{'CreditNote_Master_Id_':0}]      
            rs(result2);
          }
          finally 
          {
          connection.release();
       }
    })
},


//  Save_creditnote_master:function(creditnote_master_,callback)
//  { 
// return db.query("CALL Save_creditnote_master("+
// "@CreditNote_Master_Id_ :=?,"+
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
// "@Credit_Note_Image_ :=?,"+
// "@UserName_ :=?,"+
// "@CurrecnyName_ :=?"+")"
//  ,[creditnote_master_.CreditNote_Master_Id,
// creditnote_master_.Account_Party_Id,
// creditnote_master_.EntryDate,
// creditnote_master_.InvNo,
// creditnote_master_.LPONo,
// creditnote_master_.DONo,
// creditnote_master_.PackingListNumber,
// creditnote_master_.CurrencyId,
// creditnote_master_.TypeId,
// creditnote_master_.PaymentTerms,
// creditnote_master_.TotalAmount,
// creditnote_master_.TotalDiscount,
// creditnote_master_.TaxableAmount,
// creditnote_master_.VatAmount,
// creditnote_master_.Total_Amount,
// creditnote_master_.Roundoff_Amt,
// creditnote_master_.NetTotal,
// creditnote_master_.Makes,
// creditnote_master_.PriceBasis,
// creditnote_master_.Description1,
// creditnote_master_.User_Id,
// creditnote_master_.Delivery_Address1,
// creditnote_master_.Delivery_Address2,
// creditnote_master_.Delivery_Address3,
// creditnote_master_.Delivery_Address4,
// creditnote_master_.KindAttend,
// creditnote_master_.Charge1,
// creditnote_master_.charge1_Amount,
// creditnote_master_.Charge2,
// creditnote_master_.charge2_Amount,
// creditnote_master_.Discount_Description,
// creditnote_master_.Additional_Discount,
// creditnote_master_.Description2,
// creditnote_master_.Employee,
// creditnote_master_.Basic_Discount,
// creditnote_master_.Amount_In_Words,
// creditnote_master_.Notes,
// creditnote_master_.Charge1per,
// creditnote_master_.Payment_Term_Description,
// creditnote_master_.VAT_Description,
// creditnote_master_.VAT_percentage,
// creditnote_master_.VAT_Amount,
// creditnote_master_.New_Entry,
// creditnote_master_.Customer_Reference,
// creditnote_master_.SupplyDate,
// creditnote_master_.DueDate,
// creditnote_master_.Credit_Note_Image,
// creditnote_master_.UserName,
// creditnote_master_.CurrecnyName
// ],callback);
//  }
//  ,
 Delete_creditnote_master:function(creditnote_master_Id_,callback)
 { 
return db.query("CALL Delete_creditnote_master(@creditnote_master_Id_ :=?)",[creditnote_master_Id_],callback);
 }
 ,
 Get_creditnote_master:function(creditnote_master_Id_,callback)
 { 
return db.query("CALL Get_creditnote_master(@creditnote_master_Id_ :=?)",[creditnote_master_Id_],callback);
 }
 ,

  Get_creditnote_details:function(CreditNote_Master_Id_,callback)
 { 
return db.query("CALL Get_creditnote_details(@CreditNote_Master_Id_ :=?)",[CreditNote_Master_Id_],callback);
 }
 ,
 
 Search_creditnote_master:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Search_Item_Group_Id_,
    CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,User_Type, Login_User_Id,callback)
    { 
        if(Invoice_No_ == "undefined" || Invoice_No_ == undefined || Invoice_No_ == null){
            Invoice_No_ = ""
        }
        if(Part_No_ == "undefined" || Part_No_ == undefined || Part_No_ == null){
            Part_No_ = ""
        }

               if( Account_Party_Id_ == undefined || Account_Party_Id_ == null){
            Account_Party_Id_ =0;
        }

            if(Search_Item_Group_Id_ == undefined || Search_Item_Group_Id_ == null){
            Search_Item_Group_Id_ =0;
        }
        
               if(Account_Party_Id_ == undefined || Account_Party_Id_ == null){
            Account_Party_Id_ =0;
        }

               if(CurrencyDetails_Id_ == undefined || CurrencyDetails_Id_ == null){
            CurrencyDetails_Id_ =0;
        }

               if(AccountType_Id_ == undefined || AccountType_Id_ == null){
            AccountType_Id_ =0;
        }

       // console.log('ItemName2_: ', Part_No_);
        const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
            if (specialCharacters.test(Part_No_)) {
                console.log("String contains special characters.");
                Part_No_ = Part_No_.replace(/\\/g, '\\\\');
            } else {
                console.log("String does not contain special characters.");
            }
        
           // console.log('Escaped part no:', Part_No_);

    return db.query("CALL Search_creditnote_master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Quot_No_ :=?,@Part_No_ :=?,@Search_Item_Group_Id_ :=?,@CurrencyDetails_Id_ :=?,@AccountType_Id_ :=?,@User_Details_Id_ :=?, "+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Invoice_No_,Part_No_,Search_Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,User_Details_Id_,
        User_Type, Login_User_Id
    ],callback);
    },
    
//  Search_creditnote_master:function(creditnote_master_Name_,callback)
//  { 
//  if (creditnote_master_Name_===undefined || creditnote_master_Name_==="undefined" )
// creditnote_master_Name_='';
// return db.query("CALL Search_creditnote_master(@creditnote_master_Name_ :=?)",[creditnote_master_Name_],callback);
//  }
  };
  module.exports=creditnote_master;

