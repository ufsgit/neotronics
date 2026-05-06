var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure = require('../helpers/stored-procedure');
var Receipt_Voucher=
{ 


    Save_Receipt_Voucher: async function (Receipt_Voucher_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();

			var Purchasepayment_value = 0;

			let Receipt_Reference_Data = Receipt_Voucher_.Receipt_Reference;
			if (Receipt_Reference_Data != undefined && Receipt_Reference_Data != "" && Receipt_Reference_Data != null)
                Purchasepayment_value = 1;


			try {
				console.log(Receipt_Voucher_);
				const result1 = await new storedProcedure(
					"Save_Receipt_Voucher",
					[
						Receipt_Voucher_.Receipt_Voucher_Id,
						Receipt_Voucher_.Date,
						Receipt_Voucher_.CurrencyId,
						Receipt_Voucher_.From_Account_Id,
						Receipt_Voucher_.Amount,
						Receipt_Voucher_.To_Account_Id,
						Receipt_Voucher_.Payment_Mode_Name,
						Receipt_Voucher_.User_Id,
                        Receipt_Voucher_.User_Name,						
						Receipt_Voucher_.Description,
                        Receipt_Voucher_.Print_Caption_Id,
						JSON.stringify(Receipt_Voucher_.Receipt_Reference),
						Purchasepayment_value,
					],
					connection
				).result();
				console.log(result1);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				console.log(err);
				await connection.rollback();
				rej(err);
				var result2 = [{ Receipt_Voucher_Id_: 0 }];
				rs(result2);
			} finally {
				connection.release();
			}
		});
	},

Save_Receipt_Voucher_old: async function (Receipt_Voucher_) {
    return new Promise(async (rs, rej) => {
        const pool = db.promise();
        let result1;
        var connection = await pool.getConnection();
        var Salesrecipt_value = 0;

			let Receipt_Reference_Data = Receipt_Voucher_.Receipt_Reference;
			if (Receipt_Reference_Data != undefined && Receipt_Reference_Data != "" && Receipt_Reference_Data != null)
			Salesrecipt_value = 1;
        try {
            console.log(Receipt_Voucher_)
            const result1 = await (new storedProcedure('Save_Receipt_Voucher', [Receipt_Voucher_.Receipt_Voucher_Id, 
                Receipt_Voucher_.Date, Receipt_Voucher_.CurrencyId,Receipt_Voucher_.From_Account_Id,
                Receipt_Voucher_.Amount, Receipt_Voucher_.To_Account_Id,  Receipt_Voucher_.Payment_Mode,
                Receipt_Voucher_.User_Id,Receipt_Voucher_.User_Name, Receipt_Voucher_.Description, 
                Receipt_Voucher_.Print_Caption_Id,JSON.stringify(Receipt_Voucher_.Receipt_Reference),Salesrecipt_value,], connection)).result();
            console.log(result1)
            await connection.commit();
            connection.release();
            rs(result1);
        }
        catch (err) {
            console.log(err)
            await connection.rollback();
            rej(err);
            var result2 = [{ Receipt_Voucher_Id_: 0 }]
            rs(result2);
        }
        finally {
            connection.release();
        }
    })
},
Save_Receipt_Voucher_Mobile:function(Receipt_Voucher_,callback)
    { 
            console.log(Receipt_Voucher_)
    return db.query("CALL Save_Receipt_Voucher_Mobile("+"@Receipt_Voucher_Id_ :=?,"+
    "@From_Account_Id_ :=?,"+"@Amount_ :=?,"+"@To_Account_Id_ :=?,"+"@Payment_Mode_ :=?,"+
    "@User_Id_ :=?,"+"@Description_ :=?,"+"@Sales_Master_Id_ :=?"+")"
    ,[Receipt_Voucher_.Receipt_Voucher_Id,Receipt_Voucher_.From_Account_Id,
    Receipt_Voucher_.Amount,Receipt_Voucher_.To_Account_Id,Receipt_Voucher_.Payment_Mode,
    Receipt_Voucher_.User_Id,Receipt_Voucher_.Description,Receipt_Voucher_.Sales_Master_Id],callback);
    },
Delete_Receipt_Voucher:function(Receipt_Voucher_Id_,callback)
    { 
    return db.query("CALL Delete_Receipt_Voucher(@Receipt_Voucher_Id_ :=?)",[Receipt_Voucher_Id_],callback);
    },
 Get_Receipt_Voucher_Mobile:function(Receipt_Voucher_Id_,callback)
    { 
    return db.query("CALL Get_Receipt_Voucher(@Receipt_Voucher_Id_ :=?)",[Receipt_Voucher_Id_],callback);
    },
Get_Receipt_Voucher:function(Receipt_Voucher_Id_,callback)
    { 
    return db.query("CALL Get_Receipt_Voucher(@Receipt_Voucher_Id_ :=?)",[Receipt_Voucher_Id_],callback);
    },

    Search_Receipt_Voucher: function (
		From_Date_,
		To_Date_,
		To_Account_Id_,
		Is_Date_Check_,
        Voucher_No_,
        Login_User,
        User_Type,
        CurrencyId_,
		callback
	) {
        console.log(Login_User, User_Type);
        if (Voucher_No_==undefined || Voucher_No_==null || Voucher_No_==0)
            Voucher_No_=0;
        if(CurrencyId_==undefined || CurrencyId_==null || CurrencyId_==0)
            CurrencyId_=0;
		return db.query(
			"CALL Search_Receipt_Voucher(@From_Date_ :=?,@To_Date_ :=?,@To_Account_Id_ :=?,@Is_Date_Check_ :=?,@Voucher_No_:=?,@Login_User :=?,@User_Type :=?,@CurrencyId_ :=?)",
			[
				From_Date_,
				To_Date_,
				To_Account_Id_,
				Is_Date_Check_,
                Voucher_No_,
                Login_User,
                User_Type,
                CurrencyId_                
			],
			callback
		);
	},
Search_Voucher_Type:function(callback)
    { 
    return db.query("CALL Search_Voucher_Type()",[],callback);
    },
Search_Voucher_Type_By_Status:function(Status_,callback)
    { 
    return db.query("CALL Search_Voucher_Type_By_Status(@Status_ :=?)",[Status_],callback);
    },
Ledger_Report:function(FromDate_,ToDate_,Client_Id_,VoucherType_,callback)
    {   
    return db.query("CALL Ledger_Report(@FromDate_ :=?,@ToDate_ :=?,@Client_Id_ :=?,@VoucherType_ :=?)",[FromDate_,ToDate_,Client_Id_,VoucherType_],callback);
    },

DayBook_Report:function(FromDate_,ToDate_,callback)
    {    
    return db.query("CALL Load_Daybook_Report(@FromDate_ :=?,@ToDate_ :=?)",[FromDate_,ToDate_],callback);
    },
Get_Sales_summary:function(Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,Employee_Id,callback)
    {             
    return db.query("CALL Get_Sales_summary(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Client_Id_ :=?,@VoucherType_ :=?,@Employee_Id :=?)",[Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,Employee_Id],callback);
    },   
Search_Sales_Report_Details:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_,callback)
    {             
    return db.query("CALL Search_Sales_Report_Details(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Employee_Id_ :=?,@Item_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_],callback);
    }, 
Search_Sales_Report_Monthly_Items:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_,callback)
    {             
    return db.query("CALL Search_Sales_Report_Monthly_Items(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Employee_Id_ :=?,@Item_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_],callback);
    },
 Customer_Sales_Report:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Item_Id_,callback)
    {             
    return db.query("CALL Customer_Sales_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_  :=?,@Item_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Item_Id_],callback);
    },
Employee_Sales_Report:function(Is_Date_Check_,FromDate_,ToDate_,Employee_Id_,Item_Id_,callback)
    {             
    return db.query("CALL Employee_Sales_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Employee_Id_  :=?,@Item_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Employee_Id_,Item_Id_],callback);
    },
  Search_Sales_Report:function(Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_,callback)
    {             
    return db.query("CALL Search_Sales_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Account_Party_Id_ :=?,@Employee_Id_ :=?,@Item_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Account_Party_Id_,Employee_Id_,Item_Id_],callback);
    },
Get_Sales_Details_report:function(Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,ItemId_,callback)
    {    
    return db.query("CALL Get_Sales_Details_report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Client_Id_ :=?,@VoucherType_ :=?,@ItemId_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,ItemId_],callback);
    },
Search_Sales_Return_Details_Report:function(Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,ItemId_,callback)
    {    
    return db.query("CALL Search_Sales_Return_Details_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Client_Id_ :=?,@VoucherType_ :=?,@ItemId_ :=?)",
    [Is_Date_Check_,FromDate_,ToDate_,Client_Id_,VoucherType_,ItemId_],callback);
    },
 Get_Stock_Report:function(Barcode_,ItemId_,GroupId_,Employee_Id_,Is_Check_,callback)
    {    
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Get_Stock_Report(@Barcode_ :=?,@ItemId_ :=?,@GroupId_ :=?,@Employee_Id_ :=?,@Is_Check_ :=?)",[Barcode_,ItemId_,GroupId_,Employee_Id_,Is_Check_],callback);
    },  
Load_DayBook_Report:function(FromDate_,ToDate_,callback)
    {    
    return db.query("CALL Load_DayBook_Report(@FromDate_ :=?,@ToDate_ :=?)", [FromDate_,ToDate_],callback);
    },
Item_Expiry_Report:function(Is_Date_Check_,FromDate_,ToDate_,Barcode_,ItemId_,GroupId_,Employee_Id_,callback)
    {    
    if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    Barcode_='';
    return db.query("CALL Item_Expiry_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Barcode_ :=?,@ItemId_ :=?,@GroupId_ :=?,@Employee_Id_ :=?)",[Is_Date_Check_,FromDate_,ToDate_,Barcode_,ItemId_,GroupId_,Employee_Id_],callback);
    },    
    Client_Accounts_Typeahead:function(Client_Accounts_Name_,Group_Id_,callback)
    { 
        console.log(Client_Accounts_Name_,Group_Id_)
    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined  ||Client_Accounts_Name_==='0')
    Client_Accounts_Name_='';
    return db.query("CALL Client_Accounts_Typeahead(@Client_Accounts_Name_ :=?,@Group_Id_:=?)",[Client_Accounts_Name_,Group_Id_],callback);
    },
    Sales_receipt_Bill: function (Account_Party_Id_,callback)
    { 
        return db.query("CALL Sales_receipt_Bill(@Account_Party_Id_ :=?)", [Account_Party_Id_],callback);
    },
    Search_Print_Caption: function (Print_Caption_Name_,callback)
    { 
        if (Print_Caption_Name_==='undefined'||Print_Caption_Name_===''||Print_Caption_Name_===undefined  ||Print_Caption_Name_==='0')
            Print_Caption_Name_='';
        return db.query("CALL Search_Print_Caption(@Print_Caption_Name_ :=?)", [Print_Caption_Name_],callback);
    },
Search_Company:function(callback)
    {     
    return db.query("CALL Search_Company()",[],callback);
    },


    Client_Accounts_Branch_Typeahead:function(Client_Accounts_Name_,callback)
    { 
    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined  ||Client_Accounts_Name_==='0')
    Client_Accounts_Name_='';
    return db.query("CALL Client_Accounts_Branch_Typeahead_Admin(@Client_Accounts_Name_ :=?)",[Client_Accounts_Name_],callback);
    },


    Search_accountgroup:function(accountgroup_Name_,callback)
    { 
    if (accountgroup_Name_==='undefined'||accountgroup_Name_===''||accountgroup_Name_===undefined  ||accountgroup_Name_==='0')
        accountgroup_Name_='';
    return db.query("CALL Search_accountgroup(@accountgroup_Name_ :=?)",[accountgroup_Name_],callback);
    },

    /** Added on 18-7-24 */

    Master_Category_Typeahead:function(Client_Accounts_Name_,callback)
    { 
    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined  ||Client_Accounts_Name_==='0')
    Client_Accounts_Name_='';
    return db.query("CALL Master_Category_Typeahead(@Client_Accounts_Name_ :=?)",[Client_Accounts_Name_],callback);
    },

    Item_Group_Typeahead:function(Client_Accounts_Name_,callback)
    { 
    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined  ||Client_Accounts_Name_==='0')
    Client_Accounts_Name_='';
    return db.query("CALL Item_Group_Typeahead(@Client_Accounts_Name_ :=?)",[Client_Accounts_Name_],callback);
    },

    /** */


    Get_Client_Accounts_Typeahead_new:function(Client_Accounts_Name_,callback)
    { 
        console.log(Client_Accounts_Name_)

    if (Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined)
    Client_Accounts_Name_='';

    const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Client_Accounts_Name_)) {
			console.log("String contains special characters.");
			Client_Accounts_Name_ = Client_Accounts_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Escaped Client_Accounts_Name:', Client_Accounts_Name_);

    return db.query("CALL Get_Client_Accounts_Typeahead_new(@Client_Accounts_Name_ :=?)",[Client_Accounts_Name_],callback);
    },

    // Ledger_Report:function(FromDate_,ToDate_,Client_Id_,VoucherType_,callback)
    // {   
    // return db.query("CALL Ledger_Report(@FromDate_ :=?,@ToDate_ :=?,@Client_Id_ :=?,@VoucherType_ :=?)",[FromDate_,ToDate_,Client_Id_,VoucherType_],callback);
    
    // },

    // Search_StockReport:function(Item_Id_,partNo_,User_Type,Login_User,callback)
    // {   
    // return db.query("CALL Search_StockReport(@Item_Id_ :=?,@partNo_ :=?, @User_Type :=?, @Login_User :=?)",[Item_Id_,partNo_, User_Type, Login_User],callback);

    // },


    Search_ProfitAndLoss:function(FromDate_,ToDate_,User_Type,Login_User,callback)
    {   
    return db.query("CALL Load_ProfitAndLoss_Report(@FromDate_ :=?,@ToDate_ :=?,@User_Type :=?, @Login_User :=?)",[FromDate_,ToDate_,User_Type,Login_User],callback);
    },


    Search_VatReport:function(FromDate_,ToDate_, User_Type, Login_User,callback)
    {   
    return db.query("CALL Search_VatReport(@FromDate_ :=?,@ToDate_ :=?,@User_Type :=?, @Login_User :=?)",[FromDate_,ToDate_,User_Type,Login_User],callback);
    },


    Search_GRNVatReport:function(FromDate_,ToDate_, User_Type, Login_User,callback)
    {   
    return db.query("CALL Search_GRNVatReport(@FromDate_ :=?,@ToDate_ :=?,@User_Type :=?, @Login_User :=? )",[FromDate_,ToDate_,User_Type,Login_User],callback);
    },
    Search_OutstandingReport:function(FromDate_,ToDate_,GroupId_,callback)
    {    
    // if (Barcode_==='undefined'||Barcode_===''||Barcode_===undefined )
    // Barcode_='';
    return db.query("CALL Search_OutstandingReport(@FromDate_ :=?,@ToDate_ :=?,@GroupId_ :=?)",[FromDate_,ToDate_,GroupId_],callback);
    },  

    Search_StockReport:function(Item_Id_,partNo_,User_Type_,Login_User_,callback)
    {    
    return db.query("CALL Search_StockReport(@Item_Id_ :=?,@partNo_ :=?,@User_Type_ :=?,@Login_User_ :=?)",
    [Item_Id_,partNo_,User_Type_,Login_User_],callback);
    },
};
module.exports=Receipt_Voucher;

