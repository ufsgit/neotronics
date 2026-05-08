var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
const { withTransaction, normalizeParams } = require("../helpers/transaction");
var Purchase_Master=
{ 
// Save_Purchase_Master: async function (Purchase_Master_) {
//      //  console.log(Purchase_Master_)
//          return new Promise(async (rs,rej)=>{
//            const pool = db.promise();
//            let result1;
//            var connection = await pool.getConnection();
//         try {
//             const result1 = await(new storedProcedure('Save_Purchase_Master',
//             [Purchase_Master_.Purchase_Master_Id,
//             Purchase_Master_.Account_Party_Id,Purchase_Master_.Entry_Date,Purchase_Master_.PurchaseDate,
//             Purchase_Master_.InvoiceNo,
//             Purchase_Master_.Discount,Purchase_Master_.Roundoff,Purchase_Master_.TotalAmount,
//             Purchase_Master_.TotalDiscount,
//             Purchase_Master_.TaxableAmount, Purchase_Master_.TotalGST,Purchase_Master_.TotalCGST,
//             Purchase_Master_.TotalSGST,
//             Purchase_Master_.TotalIGST,Purchase_Master_.Other_Charges,Purchase_Master_.GrossTotal, 
//             Purchase_Master_.NetTotal,
//             Purchase_Master_.BillType, Purchase_Master_.User_Id, Purchase_Master_.Description,
//              Purchase_Master_.Transportation_Charge,
//             Purchase_Master_.Handling_Charge, Purchase_Master_.Isgst, Purchase_Master_.Transportation_Gst,
//              Purchase_Master_.Handling_Gst,
//             Purchase_Master_.Transportation_Total, Purchase_Master_.Handling_Total,
//              Purchase_Master_.Purchase_Details], connection)).result();
//               console.log( result1)
                       
//                 await connection.commit();
//                  connection.release();
//                  rs( result1);
//                }
//             catch (err) {
//                                     console.log(err);                
//             await connection.rollback();
//             rej(err);
//             var result2=[{'Purchase_Master_Id_':0}]      
//             rs(result2);
//           }
//           finally 
//           {
//           connection.release();
//        }
//     })
// },

Save_Purchase_Master: function (Purchase_Data, callback)
{
     var Purchase_Value_ = 0;
     var Purchase_Value_document_Value_=0
     let Purchase_ = Purchase_Data;
   
     if (Purchase_ != undefined && Purchase_ != '' && Purchase_ != null)
     Purchase_Value_ = 1
   
     
       Purchase_Value_document_Value_ = 1;
      console.log("Purchase_: ", Purchase_)
    
      return db.query("CALL Save_Purchase_Master(@Purchase_:=?," +       "@Purchase_Value_ :=?)"   , [    Purchase_,    Purchase_Value_],callback);
    
    
},


Delete_Purchase_Master:function(Purchase_Master_Id_,callback)
    { 
    return db.query("CALL Delete_Purchase_Master(@Purchase_Master_Id_ :=?)",[Purchase_Master_Id_],callback);
    } ,
Get_Purchase_Master:function(Purchase_Master_Id_,callback)
    { 
    return db.query("CALL Get_Purchase_Master(@Purchase_Master_Id_ :=?)",[Purchase_Master_Id_],callback);
    } ,


    Search_Purchase_Master:function(Is_Date_Check_,FromDate_,ToDate_,Customer_,InvoiceNo_,partNo_,User_Details_Id_,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
        User_Type,Login_User_Id,callback)
    { 

        if (InvoiceNo_.includes('\\') || InvoiceNo_.includes('%') || InvoiceNo_.includes("'")) {
            console.log("String contains special characters: \\, ', or %");
            InvoiceNo_ = InvoiceNo_.replace(/([\\%'])/g, '\\$1');

        } else {
            console.log("String does not contain special characters.");
        }

        if(InvoiceNo_ === 0 || InvoiceNo_ ==='undefined' || InvoiceNo_=== '' || InvoiceNo_ === undefined ||InvoiceNo_ === '0')
        {
            InvoiceNo_ = '';
        }
        else
        {
            InvoiceNo_ = InvoiceNo_.trim();

        }

        if(partNo_ === 0 || partNo_ ==='undefined' || partNo_=== '' || partNo_ === undefined ||partNo_ === '0')
            {
                partNo_ = '';
            }
        else
        {
            partNo_ = partNo_.trim();
        }

             
    console.log('ItemName2_: ', partNo_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(partNo_)) {
			console.log("String contains special characters.");
            partNo_ = partNo_.replace(/\\/g, '\\\\');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', partNo_);



    return db.query("CALL Search_Purchase_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@InvoiceNo_:=?,@Customer_ :=?,@AccountType_Id_ :=?,@CurrencyDetails_Id_ :=?,@User_Details_Id_:=?,@partNo_ :=?,@Item_Group_Id_:=?,"+
        "@User_Type :=?, @Login_User_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,InvoiceNo_,Customer_,AccountType_Id_,CurrencyDetails_Id_,User_Details_Id_,partNo_,Item_Group_Id_,
        User_Type, Login_User_Id],callback);
    },
Search_Item_Typeahead:function(Item_Name_,callback)
 { 
        if (Item_Name_==='undefined'||Item_Name_===''||Item_Name_===undefined )
        Item_Name_='';
    return db.query("CALL Search_Item(@Item_Name_ :=?)",[Item_Name_],callback);
 },
Get_Purchase_Item_Typeahead:function(ItemName_,callback)
{ 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
    return db.query("CALL Get_Purchase_Item_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
},
Get_Purchase_Typeahead:function(ItemName_,callback)
{ 
    if (ItemName_==='undefined'||ItemName_===''||ItemName_===undefined )
    ItemName_='';
    return db.query("CALL Get_Purchase_Typeahead(@ItemName_ :=?)",[ItemName_],callback);
},
Get_Barcode_Purchase:function(Barcode_,callback)
{ 
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Get_Barcode_Purchase(@Barcode_ :=?)",[Barcode_],callback);
 },
Get_Purchase_Details:function(Purchase_Master_Id_,callback)
{ 
    return db.query("CALL Get_Purchase_Details(@Purchase_Master_Id_ :=?)",[Purchase_Master_Id_],callback);
} ,
    Search_Purchase_Report: function (Is_Date_Check_, From_date_, To_date_, Account_Party_Id_,Branch_Id_, Voucher_No_,callback)
    {
    console.log('Is_Date_Check_: ', Is_Date_Check_);
        return db.query("call Search_Purchase_Report(@Is_Date_Check_ :=?,@From_date_ :=?,@To_date_ :=?,@Account_Party_Id_ :=?,@Branch_Id_:=?,@Voucher_No_ :=?)",
        [Is_Date_Check_, From_date_, To_date_, Account_Party_Id_,Branch_Id_, Voucher_No_],callback)
},
Search_Purchase_Return_Report: function (Is_Date_Check_, From_date_, To_date_, Account_Party_Id_, Voucher_No,callback)
{
        return db.query("call Search_Purchase_Report(@Is_Date_Check_ :=?,@From_date_ :=?,@To_date_ :=?,@Account_Party_Id_ :=?,@Voucher_No :=?)",
        [Is_Date_Check_, From_date_, To_date_, Account_Party_Id_, Voucher_No],callback)
},
Search_Purchase_Details_Report:function(Is_Date_Check_,From_date_,To_date_,Account_Party_Id_,Voucher_No,Item_Id_,callback)
{
    return db.query("call Search_Purchase_Details_Report(@Is_Date_Check_ :=?,@From_date_ :=?,@To_date_ :=?,@Account_Party_Id_ :=?,@Voucher_No :=?,@Item_Id_ :=?)",
        [Is_Date_Check_, From_date_, To_date_, Account_Party_Id_, Voucher_No, Item_Id_],callback)
},
Load_Hsn_Service_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Hsn_Service_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Load_Hsn_Purchase_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Hsn_Purchase_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Load_Hsn_Purchase_Return_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Hsn_Purchase_Return_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Load_Purchase_SaleTax_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Purchase_SaleTax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Load_Purchase_Return_Tax_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Purchase_Return_Tax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Load_Service_Tax_Report:function(From_date_,To_date_,callback)
{
    return db.query("call Load_Service_Tax_Report(@From_date_ :=?,@To_date_ :=?)",[ From_date_, To_date_],callback)
},
Search_Purchase_Return_Details_Report:function(Is_Date_Check_,From_date_,To_date_,Account_Party_Id_,Voucher_No,Item_Id_,callback)
{
    return db.query("call Search_Purchase_Return_Details_Report(@Is_Date_Check_ :=?,@From_date_ :=?,@To_date_ :=?,@Account_Party_Id_ :=?,@Voucher_No :=?,@Item_Id_ :=?)",
        [Is_Date_Check_, From_date_, To_date_, Account_Party_Id_, Voucher_No, Item_Id_],callback)
},
Search_Service_Type_Typeahead: function (Service_Type_Name_,callback)
{ 
        if (Service_Type_Name_ === 'undefined' || Service_Type_Name_ === '' || Service_Type_Name_===undefined )
            Service_Type_Name_='';
        return db.query("CALL Search_Service_Type_Typeahead(@Service_Type_Name_ :=?)", [Service_Type_Name_],callback);
 },
Save_Service: async function (Service_, { log } = {}) {
    if (!Service_) throw new Error("Payload missing");
    return withTransaction(async ({ connection }) => {
        const params = normalizeParams([
            Service_.Service_Id, Service_.Account_Party_Id, Service_.Entry_Date,
            Service_.InvoiceNo, Service_.GrossTotal, Service_.TaxableAmount, Service_.TotalDiscount, Service_.TotalGST, Service_.TotalCGST, Service_.TotalSGST, Service_.TotalIGST, Service_.NetTotal,
            Service_.Tot_Cess, Service_.Roundoff, Service_.TotalAmount, Service_.BillType, Service_.User_Id, Service_.Description, Service_.Service_Details,
        ]);
        if (log) log.info("sp.call", { name: "Save_Service" });
        return (new storedProcedure("Save_Service", params, connection)).result();
    }, { log });
},


Delete_Service:function(Service_Id_,callback)
    { 
    return db.query("CALL Delete_Service(@Service_Id_ :=?)",[Service_Id_],callback);
    } ,
Get_Service:function(Service_Id_,callback)
    { 
    return db.query("CALL Get_Service(@Service_Id_ :=?)",[Service_Id_],callback);
    } ,
Search_Service:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_,callback)
    { 
    return db.query("CALL Search_Service(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@InvoiceNo_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_],callback);
    },
Search_Service_Details_Report:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_,Service_Type_Id,callback)
    { 
    return db.query("CALL Search_Service_Details_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@InvoiceNo_ :=?,@Service_Type_Id :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,InvoiceNo_,Service_Type_Id],callback);
    },

/***Added on 23-02-2024 */
Get_Item_Name_Get_With_Code:function(Item_Code_,Item_Group_Id_,callback)
    { 
        console.log(Item_Code_,Item_Group_Id_)
        if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
        Item_Code_='';
        return db.query("CALL Get_Item_Name_Get_With_Code(@Item_Code_ :=?,@Item_Group_Id_:=?)",[Item_Code_,Item_Group_Id_],callback);
    },

    Get_Item_Name_Get_With_Code_App:function(Item_Code_,Item_Group_Id_,Item_Name_,callback)
    { 
        console.log(Item_Code_,Item_Group_Id_)
        if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined || Item_Code_==='0')
        Item_Code_='';
    if (Item_Name_==='undefined'||Item_Name_===''||Item_Name_===undefined || Item_Name_==='0')
    Item_Name_='';
    console.log('Item_Code_: ', Item_Code_);
    console.log('Item_Name_: ', Item_Name_);
        return db.query("CALL Get_Item_Name_Get_With_Code_App(@Item_Code_ :=?,@Item_Group_Id_:=?,@Item_Name_:=?)",[Item_Code_,Item_Group_Id_,Item_Name_],callback);
    },

   /***Added on 24-02-2024 */
// Save_Purchase_Master_App: async function (Purchase_Master_) {
// 	//  console.log(Purchase_Master_)
// 		return new Promise(async (rs,rej)=>{
// 		  const pool = db.promise();
// 		  let result1;
// 		  var connection = await pool.getConnection();
// 	   try {
// 		   const result1 = await(new storedProcedure('Save_Purchase_Master_App',
// 		   [Purchase_Master_.Purchase_Master_Id,
// 			   Purchase_Master_.Account_Party_Id,Purchase_Master_.PurchaseDate,
// 			   Purchase_Master_.InvoiceNo,
// 			   Purchase_Master_.Discount,Purchase_Master_.Roundoff,Purchase_Master_.TotalAmount,
// 			   Purchase_Master_.TotalDiscount,
// 			   Purchase_Master_.TaxableAmount, Purchase_Master_.TotalGST,Purchase_Master_.TotalCGST,
// 			   Purchase_Master_.TotalSGST,
// 			   Purchase_Master_.TotalIGST,Purchase_Master_.Other_Charges,Purchase_Master_.GrossTotal, 
// 			   Purchase_Master_.NetTotal,
// 			   Purchase_Master_.BillType, Purchase_Master_.User_Id, Purchase_Master_.Description,
// 				   Purchase_Master_.Document_Name,Purchase_Master_.File_Name,
// 			   Purchase_Master_.Item_Group_Id,Purchase_Master_.Item_Group_Name,
// 				Purchase_Master_.Purchase_Details               
	
// 		   ], connection)).result();
// 			 console.log( result1)                       
// 			   await connection.commit();
// 				connection.release();
// 				rs( result1);
// 			  }
// 		   catch (err) {
// 		   console.log(err);                
// 		   await connection.rollback();
// 		   rej(err);
// 		   var result2=[{'Purchase_Master_Id_':0}]      
// 		   rs(result2);
// 		 }
// 		 finally 
// 		 {
// 		 connection.release();
// 	  }
//    })
// }

Save_Purchase_Master_App: async function (Purchase_Master_, { log } = {}) {
    if (!Purchase_Master_) throw new Error("Payload missing");
    return withTransaction(async ({ connection }) => {
        const params = normalizeParams([
            Purchase_Master_.Purchase_Master_Id, Purchase_Master_.Account_Party_Id, Purchase_Master_.PurchaseDate,
            Purchase_Master_.InvoiceNo, Purchase_Master_.Discount, Purchase_Master_.Roundoff, Purchase_Master_.TotalAmount,
            Purchase_Master_.TotalDiscount, Purchase_Master_.TaxableAmount, Purchase_Master_.TotalGST, Purchase_Master_.TotalCGST,
            Purchase_Master_.TotalSGST, Purchase_Master_.TotalIGST, Purchase_Master_.Other_Charges, Purchase_Master_.GrossTotal,
            Purchase_Master_.NetTotal, Purchase_Master_.BillType, Purchase_Master_.User_Id, Purchase_Master_.Description,
            Purchase_Master_.Document_Name, Purchase_Master_.File_Name, Purchase_Master_.Item_Group_Id, Purchase_Master_.Item_Group_Name,
            Purchase_Master_.Branch_Id, Purchase_Master_.Branch_Name, Purchase_Master_.Purchase_Details, Purchase_Master_.Payment_mode,
        ]);
        if (log) log.info("sp.call", { name: "Save_Purchase_Master_App" });
        return (new storedProcedure("Save_Purchase_Master_App", params, connection)).result();
    }, { log });
},


/** Added on 22-08-2024 */

Search_Purchase_Master_Report:function(Is_Date_Check_,FromDate_,ToDate_,InvoiceNo_,Branch_Id_,callback)
    { 
        if(InvoiceNo_ === 0 || InvoiceNo_ ==='undefined' || InvoiceNo_=== '' || InvoiceNo_ === undefined ||InvoiceNo_ === '0' || InvoiceNo_ === null || InvoiceNo_ === "null")
        {
            InvoiceNo_ = '';
        }
    return db.query("CALL Search_Purchase_Master_Report(@FromDate_ :=?,@ToDate_ :=?,@Branch_Id_:=?,@InvoiceNo_ :=?,@Is_Date_Check_ :=?)",
    [FromDate_,ToDate_,Branch_Id_,InvoiceNo_,Is_Date_Check_],callback);
    },


Get_Purchase_Details_Report:function(Purchase_Master_Id_,callback)
    { 
        return db.query("CALL Get_Purchase_Details_Report(@Purchase_Master_Id_ :=?)",[Purchase_Master_Id_],callback);
    },


/*** Added on 24-09-2024 */

Save_CreditNote_Master_1: function (CreditNote_Master_Data, callback)
{        console.log(CreditNote_Master_Data);

     var CreditNote_Master_Value_ = 0;
     var CreditNote_Master_Value_document_Value_=0
     let CreditNote_Master_ = CreditNote_Master_Data;
   
     if (CreditNote_Master_ != undefined && CreditNote_Master_ != '' && CreditNote_Master_ != null)
        CreditNote_Master_Value_ = 1
   
     
     CreditNote_Master_Value_document_Value_ = 1;
         console.log(CreditNote_Master_Data.Credit_Note_Details);

        // console.log('CreditNote_Master_ :',CreditNote_Master_);
        
      return db.query("CALL Save_CreditNote_Master_1(@CreditNote_Master_:=?," + "@CreditNote_Master_Value_ :=?)",[CreditNote_Master_,CreditNote_Master_Value_],callback);
    
    
},


Search_CreditNote:function(Is_Date_Check_,FromDate_,ToDate_,InvoiceNo_,partNo_,Item_Group_Id_,CurrencyDetails_Id_,Customer_,AccountType_Id_,
    User_Type, Login_User_Id,callback)
{ 

    if (InvoiceNo_.includes('\\') || InvoiceNo_.includes('%') || InvoiceNo_.includes("'")) {
        console.log("String contains special characters: \\, ', or %");
        InvoiceNo_ = InvoiceNo_.replace(/([\\%'])/g, '\\$1');

    } else {
        console.log("String does not contain special characters.");
    }

    
    if(InvoiceNo_ === 0 || InvoiceNo_ ==='undefined' || InvoiceNo_=== '' || InvoiceNo_ === undefined ||InvoiceNo_ === '0')
    {
        InvoiceNo_ = '';
    }
    else{InvoiceNo_ = InvoiceNo_.trim()}
    if(partNo_ === 0 || partNo_ ==='undefined' || partNo_=== '' || partNo_ === undefined ||partNo_ === '0')
        {
            partNo_ = '';
        }
    else{partNo_ = partNo_.trim()}
    console.log('ItemName2_: ', partNo_);
    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(partNo_)) {
			console.log("String contains special characters.");
            partNo_ = partNo_.replace(/\\/g, '\\\\');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', partNo_);



return db.query("CALL Search_CreditNote(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@InvoiceNo_:=?,@partNo_ :=?,@Item_Group_Id_:=?,@CurrencyDetails_Id_ :=?,@Customer_ :=?,@AccountType_Id_ :=?,"+
    "@User_Type :=?, @Login_User_Id :=?)",
[Is_Date_Check_,FromDate_,ToDate_,InvoiceNo_,partNo_,Item_Group_Id_,CurrencyDetails_Id_,Customer_,AccountType_Id_,
    User_Type, Login_User_Id
],callback);
},

Delete_CreditNote:function(CreditNote_Master_Id_,callback)
    { 
    return db.query("CALL Delete_CreditNote(@CreditNote_Master_Id_ :=?)",[CreditNote_Master_Id_],callback);
    } ,

    Get_CreditNote_Details_1:function(CreditNote_Master_Id_,callback)
    { 
        return db.query("CALL Get_CreditNote_Details_1(@CreditNote_Master_Id_ :=?)",[CreditNote_Master_Id_],callback);
    } ,

/*** Added on 23-10-2024 */

loadGRN:function(GRNId1_,callback)
{ 
return db.query("CALL loadGRN(@GRNId1_ :=?)",[GRNId1_],callback);
},

};
module.exports=Purchase_Master;



















