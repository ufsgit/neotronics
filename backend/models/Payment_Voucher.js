var db = require("../dbconnection");
var fs = require("fs");
const storedProcedure = require("../helpers/stored-procedure");
const { json } = require("body-parser");
var Payment_Voucher = {	
	Save_Payment_Voucher: async function (Payment_Voucher_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();

			var Purchasepayment_value = 0;

			let Payment_Reference_Data = Payment_Voucher_.Payment_Reference;
			if (Payment_Reference_Data != undefined && Payment_Reference_Data != "" && Payment_Reference_Data != null)
			Purchasepayment_value = 1;


			try {
				console.log(Payment_Voucher_);
				const result1 = await new storedProcedure(
					"Save_Payment_Voucher",
					[
						Payment_Voucher_.Payment_Voucher_Id,
						Payment_Voucher_.Date,
						Payment_Voucher_.CurrencyId,
						Payment_Voucher_.From_Account_Id,
						Payment_Voucher_.Amount,
						Payment_Voucher_.To_Account_Id,
						Payment_Voucher_.Payment_Mode_Name,
						Payment_Voucher_.User_Id,
						Payment_Voucher_.Payment_Status,
						Payment_Voucher_.Description,
						JSON.stringify(Payment_Voucher_.Payment_Reference),
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
				var result2 = [{ Payment_Voucher_Id_: 0 }];
				rs(result2);
			} finally {
				connection.release();
			}
		});
	},
	Delete_Payment_Voucher: function (Payment_Voucher_Id_, callback) {
		return db.query(
			"CALL Delete_Payment_Voucher(@Payment_Voucher_Id_ :=?)",
			[Payment_Voucher_Id_],
			callback
		);
	},
	Get_Purchase_Payment: function (Payment_Voucher_Id_, callback) {
		return db.query(
			"CALL Get_Purchase_Payment(@Payment_Voucher_Id_ :=?)",
			[Payment_Voucher_Id_],
			callback
		);
	},
	SelectSettledBills: function (Account_Party_Id_, callback) {
		return db.query(
			"CALL SelectSettledBills(@Account_Party_Id_ :=?)",
			[Account_Party_Id_],
			callback
		);
	},
	Search_Payment_Voucher: function (
		From_Date_,
		To_Date_,
		To_Account_Id_,
		Voucher_No_,
		Is_Date_Check_,CurrencyId_,
		Login_User, User_Type,
		callback
	) {
		if(Voucher_No_==undefined || Voucher_No_==null)
			Voucher_No_=0;
		if(CurrencyId_==undefined || CurrencyId_==null)
			CurrencyId_=0;
		
		return db.query(
			"CALL Search_Payment_Voucher(@From_Date_ :=?,@To_Date_ :=?,@To_Account_Id_ :=?,@Voucher_No_  :=?,@Is_Date_Check_ :=?,@CurrencyId_ :=?,"+
			"@Login_User :=?, @User_Type :=?)",
			[
				From_Date_,
				To_Date_,
				To_Account_Id_,
				Voucher_No_,
				Is_Date_Check_,CurrencyId_,
				Login_User, 
				User_Type
			],
			callback
		);
	},
	Get_Payment_Mode: function (callback) {
		return db.query("CALL Get_Payment_Mode()", [], callback);
	},
	Save_Petty_Cash: function (PettyCash_Data, callback) {
		console.log('PettyCash_Data: ', PettyCash_Data);
		let Value_ = 0;

		var payment_value_=0;
		var receipt_value_=0;

		let Petty_Cash_ = PettyCash_Data.Data_Petty_Cash; 
		
		if (Petty_Cash_ != undefined && Petty_Cash_ != "" && Petty_Cash_ != null  )
			Value_ = 1;

			let Payment_=PettyCash_Data.Data_payment;
			if(Payment_.Payment!==undefined && Payment_.Payment !=="" && Payment_.Payment !== null && Payment_.Payment  !== 'null' )

				payment_value_=1
				// console.log('Payment_: ', Payment_);

			let Receipt_=PettyCash_Data.Receipt_Data;
			if(Receipt_.Receipt !==undefined && Receipt_.Receipt  !=="" && Receipt_.Receipt  !== null   && Receipt_.Receipt  !== 'null' )
  
				receipt_value_=1

				// console.log('Receipt_: ', Receipt_);


		return db.query(
			"CALL Save_Petty_Cash(@Petty_Cash_ :=?," + "@Value_ :=?, " + "@payment_value_ :=?,"+"@receipt_value_ :=?,"+"@Payment_ :=?,"+"@Receipt_ :=?)",
			[Petty_Cash_, Value_,payment_value_,receipt_value_,Payment_.Payment,Receipt_.Receipt],
			callback
		);
		
	 
 
 
	},
	Search_Petty_Cash: function (
		From_Date_,
		To_Date_,
		Branch_,
		Type_,
		Is_Date_Check_,Login_User_,
		callback
	) {
		return db.query(
			"CALL Search_Petty_Cash(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Type_ :=?,@Is_Date_Check_ :=?,@Login_User_ :=?)",
			[From_Date_, To_Date_, Branch_, Type_, Is_Date_Check_,Login_User_],
			callback
		);
	},
	Delete_Petty_Cash: function (Petty_Cash_Id_, callback) {
		return db.query(
			"CALL Delete_Petty_Cash(@Petty_Cash_Id_ :=?)",
			[Petty_Cash_Id_],
			callback
		);
	},
	Search_Petty_Cash_Report: function (
		From_Date_,
		To_Date_,
		Branch_,
		Type_,
		Is_Date_Check_,
		callback
	) {
		return db.query(
			"CALL Search_Petty_Cash_Report(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Type_ :=?,@Is_Date_Check_ :=?)",
			[From_Date_, To_Date_, Branch_, Type_, Is_Date_Check_],
			callback
		);
	},
	Search_Waste_Management: function (
		From_Date_,
		To_Date_,
		Branch_,
		Type_,
		Is_Date_Check_,Login_User_,
		callback
	) {
		return db.query(
			"CALL Search_Waste_Management(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Type_ :=?,@Is_Date_Check_ :=?,@Login_User_ :=?)",
			[From_Date_, To_Date_, Branch_, Type_, Is_Date_Check_,Login_User_],
			callback
		);
	},
	Delete_Waste_Management: function (Waste_Management_Id_, callback) {
		return db.query(
			"CALL Delete_Waste_Management(@Waste_Management_Id_ :=?)",
			[Waste_Management_Id_],
			callback
		);
	},
	Search_Waste_Management_Report: function (
		From_Date_,
		To_Date_,
		Branch_,
		Item_,
		Is_Date_Check_,
		callback
	) {
		return db.query(
			"CALL Search_Waste_Management_Report(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Item_ :=?,@Is_Date_Check_ :=?)",
			[From_Date_, To_Date_, Branch_, Item_, Is_Date_Check_],
			callback
		);
	},
	Save_Waste_Management: function (Document_Data, callback) {
			let Value_ = 0;
			let waste_management_ = Document_Data.Data_Document;
			if (waste_management_ != undefined && waste_management_ != "" && waste_management_ != null)
				Value_ = 1;
					console.log(Document_Data);

			return db.query(
				"CALL Save_Waste_Management(@waste_management_ :=?," + "@Value_ :=?)",
				[waste_management_, Value_],
				callback
			);
		
		},
	// Save_Waste_Management: function (Waste_Management_, callback) {
	// 	console.log('Waste_Management_.Waste_Management_Id,: ', Waste_Management_.Waste_Management_Id,);
	// 	console.log('	Waste_Management_.Branch_Id: ', 	Waste_Management_.Branch_Id);
	// 	console.log('Waste_Management_.Branch_Name: ', Waste_Management_.Branch_Name);
	// 	console.log('Waste_Management_.Date: ', Waste_Management_.Date);
	// 	console.log('Waste_Management_.Item_Id: ', Waste_Management_.Item_Id);
	// 	console.log('	Waste_Management_.Item_Name: ', 	Waste_Management_.Item_Name);
	// 	console.log('Waste_Management_.Item_Quantity: ', Waste_Management_.Item_Quantity);
	// 	console.log('	Waste_Management_.Particular: ', 	Waste_Management_.Particular);
	// 	console.log('Waste_Management_.User_Id: ', Waste_Management_.User_Id);
	// 	console.log('Waste_Management_.Description: ', Waste_Management_.Description);
	// 	console.log('Item_Code',Waste_Management_.Item_Code);
	// 	return db.query(                                                                                     
	// 		"CALL Save_Waste_Management(" +
	// 			"@Waste_Management_Id_ :=?," +
	// 			"@Branch_Id_ :=?," +
	// 			"@Branch_Name_ :=?," +
	// 			"@Date_ :=?," +
	// 			"@Item_Id_ :=?," +
	// 			"@Item_Name_ :=?," +
	// 			"@Item_Quantity_ :=?," +
	// 			"@Particular_ :=?," +
	// 			"@User_Id_ :=?," +
	// 			"@Description_ :=?,"+
	// 			"@Item_Code_ :=?,"+
	// 			"@File_Name_ :=?,"+
	// 			"@File_Path_ :=?"+ 
	// 			")",
		
		
		
	// 			[
	// 			Waste_Management_.Waste_Management_Id,
	// 			Waste_Management_.Branch_Id,
	// 			Waste_Management_.Branch_Name,
	// 			Waste_Management_.Date,
	// 			Waste_Management_.Item_Id,
	// 			Waste_Management_.Item_Name, 
	// 			Waste_Management_.Item_Quantity,
	// 			Waste_Management_.Particular,
	// 			Waste_Management_.User_Id,
	// 			Waste_Management_.Description,
	// 			Waste_Management_.Item_Code,

	// 			Waste_Management_.File_Name,
	// 			Waste_Management_.File_Path

	// 		],
	// 		callback
	// 	);
	// },
	Get_Petty_Cash_details:function(Petty_Cash_Id_,callback)
    { 
    return db.query("CALL Get_Petty_Cash_details(@Petty_Cash_Id_ :=?)",[Petty_Cash_Id_],callback);
    } ,

	Get_Petty_Cash_details_App:function(Petty_Cash_Id_,callback)
    { 
    return db.query("CALL Get_Petty_Cash_details_App(@Petty_Cash_Id_ :=?)",[Petty_Cash_Id_],callback);
    } ,


	/***Added on 23-02-2024 */
Get_Item_Name_Get_With_Code_Waste_Management:function(Item_Code_,callback)
{ 
	if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
	Item_Code_='';
console.log(Item_Code_);
	return db.query("CALL Get_Item_Name_Get_With_Code_Waste_Management(@Item_Code_ :=?)",[Item_Code_],callback);
},
Get_Item_Name_Get_With_Code_Waste_Management_App:function(Item_Code_,callback)
{ 
	if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined ||Item_Code_==='0' ||Item_Code_==="0")
	Item_Code_='';
console.log(Item_Code_);
	return db.query("CALL Get_Item_Name_Get_With_Code_Waste_Management_App(@Item_Code_ :=?)",[Item_Code_],callback);
},
	/***Added on 24-02-2024 */
// Save_Petty_Cash_App: async function (PettyCash_Data) {
// 	console.log(PettyCash_Data)
// 	  return new Promise(async (rs,rej)=>{
// 		const pool = db.promise();
// 		let result1;
// 		var payment_value_=0;
// 	var receipt_value_=0;
// 	let Payment_=PettyCash_Data.Data_payment;
// 		if(Payment_.Payment!==undefined && Payment_.Payment !=="" && Payment_.Payment !== null && Payment_.Payment  !== 'null' )
// 			payment_value_=1
// 		let Receipt_=PettyCash_Data.Receipt_Data;
// 		if(Receipt_.Receipt !==undefined && Receipt_.Receipt  !=="" && Receipt_.Receipt  !== null   && Receipt_.Receipt  !== 'null' )

// 			receipt_value_=1
// 		var connection = await pool.getConnection();
// 	 try {
// 		 const result1 = await(new storedProcedure('Save_Petty_Cash_App',
// 		 [PettyCash_Data.Petty_Cash_Id,PettyCash_Data.Date,PettyCash_Data.Branch_Id,PettyCash_Data.Branch_Name,
// 			PettyCash_Data.Type_Id,PettyCash_Data.Type_Name,PettyCash_Data.Document_Name,PettyCash_Data.File_Name,
// 			PettyCash_Data.SumTotal,PettyCash_Data.RecpTotal,PettyCash_Data.User_Id,
// 			payment_value_,receipt_value_,PettyCash_Data.Payment,PettyCash_Data.Receipt
// 		 ], connection)).result();
// 		   console.log( result1)                       
// 			 await connection.commit();
// 			  connection.release();
// 			  rs( result1);
// 			}
// 		 catch (err) {
// 		 console.log(err);                
// 		 await connection.rollback();
// 		 rej(err);
// 		 var result2=[{'Petty_Cash_Id_':0}]      
// 		 rs(result2);
// 	   }
// 	   finally 
// 	   {
// 	   connection.release();
// 	}
//  })
// }
/*
Save_Petty_Cash_App: async function (PettyCash_Data) {
console.log(PettyCash_Data);

	return new Promise(async (rs,rej)=>{
	  const pool = db.promise();
	  let result1;
  // 	var payment_value_=0;
  // var receipt_value_=0;
  // let Payment_= PettyCash_Data.Payment_Data;
	   let Receipt_=PettyCash_Data.Receipt_Data;
  // console.log(Payment_);
   console.log(Receipt_);
	  // if(Payment_!=='' || Payment_!==undefined && Payment_ !=="" && Payment_ !== null && Payment_  !== 'null' )
	  // 	payment_value_=1

	  if(Receipt_ !=='' || Receipt_ !==undefined && Receipt_  !=="" && Receipt_  !== null   && Receipt_  !== 'null' )

		  receipt_value_=1
	
		console.log(receipt_value_);
	 
	  var connection = await pool.getConnection();
   try {
	   const result1 = await(new storedProcedure('Save_Petty_Cash_App',
	   [PettyCash_Data.Petty_Cash_Id,PettyCash_Data.Date,PettyCash_Data.Branch_Id,PettyCash_Data.Branch_Name,PettyCash_Data.Particular,PettyCash_Data.Opening_Balance,
		PettyCash_Data.Type_Id,PettyCash_Data.Type_Name,PettyCash_Data.Amount,PettyCash_Data.Document_Name,PettyCash_Data.File_Name,PettyCash_Data.SumTotal,PettyCash_Data.RecpTotal,
		PettyCash_Data.User_Id,receipt_value_,PettyCash_Data.Receipt_Data,PettyCash_Data.Close_Stock,PettyCash_Data.Profit_Loss,PettyCash_Data.Coin,PettyCash_Data.Cash,
	   ], connection)).result();
		 console.log( result1)                       
		   await connection.commit();
			connection.release();
			rs( result1);
		  }
	   catch (err) {
	   console.log(err);                
	   await connection.rollback();
	   rej(err);
	   var result2=[{'Petty_Cash_Id_':0}]      
	   rs(result2);
	 }
	 finally 
	 {
	 connection.release();
  }
})
},*/

Save_Petty_Cash_App: async function (PettyCash_Data) {

	return new Promise(async (rs,rej)=>{
	 const pool = db.promise();
	 let result1;
	  // var payment_value_=0;
	  // var receipt_value_=0;
	  // let Payment_= PettyCash_Data.Payment_Data;
	  let Receipt_=PettyCash_Data.Receipt_Data;
	  // console.log(Payment_);
	   console.log(Receipt_);
	 // if(Payment_!=='' || Payment_!==undefined && Payment_ !=="" && Payment_ !== null && Payment_  !== 'null' )
	 // payment_value_=1
	
	 if(Receipt_ !=='' || Receipt_ !==undefined && Receipt_  !=="" && Receipt_  !== null   && Receipt_  !== 'null' )
	
	 receipt_value_=1
	
	console.log(receipt_value_);
	
	 var connection = await pool.getConnection();
	   try {
	  const result1 = await(new storedProcedure('Save_Petty_Cash_App',
	  [PettyCash_Data.Petty_Cash_Id,PettyCash_Data.Date,PettyCash_Data.Branch_Id,PettyCash_Data.Branch_Name,PettyCash_Data.Particular,
	 PettyCash_Data.Type_Id,PettyCash_Data.Type_Name,PettyCash_Data.Amount,PettyCash_Data.Document_Name,PettyCash_Data.File_Name,
	 PettyCash_Data.SumTotal,PettyCash_Data.RecpTotal,PettyCash_Data.User_Id,receipt_value_,PettyCash_Data.Receipt_Data,PettyCash_Data.Close_Stock,
	 PettyCash_Data.Cash,PettyCash_Data.Coin,PettyCash_Data.Opening_Balance,PettyCash_Data.Profit_Loss,
	  ], connection)).result();
	console.log( result1)                      
	  await connection.commit();
	connection.release();
	rs( result1);
	 }
	  catch (err) {
	  console.log(err);                
	  await connection.rollback();
	  rej(err);
	  var result2=[{'Petty_Cash_Id_':0}]      
	  rs(result2);
	}
	finally
	{
	connection.release();
	  }
	})
	},
	

Search_Daily_Report: function (
	From_Date_,
	To_Date_,
	Branch_,
	Item_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Daily_Report(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Item_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_, Item_, Is_Date_Check_],
		callback
	);
},

/*** Added on 10-05-2024 ***/

Get_Opening_Balance:function(Branch_Id_,Date_,callback)
{ 
	// if (Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
	// Item_Code_='';
console.log(Branch_Id_,Date_);
	return db.query("CALL Get_Opening_Balance(@Branch_Id_ :=?,@Date_ :=?)",[Branch_Id_,Date_],callback);
},


/*** Added on 17-7-24 */

Save_Daybook_App: function (Document_Data, callback) {
	let Value_ = 0;
	let waste_management_ = Document_Data.Data_Document;
	if (waste_management_ != undefined && waste_management_ != "" && waste_management_ != null)
		Value_ = 1;
			console.log(Document_Data);

	return db.query(
		"CALL Save_Daybook_App(@Daybook_ :=?," + "@Value_ :=?)",
		[waste_management_, Value_],
		callback
	);

},

Search_Daybook_App: function (
	From_Date_,
	To_Date_,
	Branch_,
	Type_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Daybook_App(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Type_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_, Type_, Is_Date_Check_],
		callback
	);
},




/**** */


/**** Added on 18-07-2024 */

Delete_Daybook_App: function (Daybook_Id_, callback) {
	return db.query(
		"CALL Delete_Daybook_App(@Daybook_Id_ :=?)",
		[Daybook_Id_],
		callback
	);
},

Search_Daybook: function (
	From_Date_,
	To_Date_,
	Branch_,
	Type_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Daybook(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Type_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_, Type_, Is_Date_Check_],
		callback
	);
},

Delete_Daybook: function (Waste_Management_Id_, callback) {
	return db.query(
		"CALL Delete_Daybook(@Waste_Management_Id_ :=?)",
		[Waste_Management_Id_],
		callback
	);
},

Save_Daybook: function (Document_Data, callback) {
	let Value_ = 0;
	let waste_management_ = Document_Data.Data_Document;
	if (waste_management_ != undefined && waste_management_ != "" && waste_management_ != null)
		Value_ = 1;
			console.log(Document_Data);

	return db.query(
		"CALL Save_Daybook(@Daybook_ :=?," + "@Value_ :=?)",
		[waste_management_, Value_],
		callback
	);

},


/*** Added on 22-08-2024 */

Search_Petty_Cash_Report_1: function (
	From_Date_,
	To_Date_,
	Branch_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Petty_Cash_Report_1(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_,Is_Date_Check_],
		callback
	);
},

Get_Petty_Cash_Details_Report:function(Petty_Cash_Id_,callback)
{ 
return db.query("CALL Get_Petty_Cash_Details_Report(@Petty_Cash_Id_ :=?)",[Petty_Cash_Id_],callback);
} ,


Search_Daybook_Report: function (
	From_Date_,
	To_Date_,
	Branch_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Daybook_Report(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_, Is_Date_Check_],
		callback
	);
},

Search_Waste_Management_Report_1: function (
	From_Date_,
	To_Date_,
	Branch_,
	Is_Date_Check_,
	callback
) {
	return db.query(
		"CALL Search_Waste_Management_Report_1(@From_Date_ :=?,@To_Date_ :=?,@Branch_ :=?,@Is_Date_Check_ :=?)",
		[From_Date_, To_Date_, Branch_, Is_Date_Check_],
		callback
	);
},
Search_Invoice_By_VoucherType_Typeahead: function (
    Client_Accounts_Id_,
    InvoiceNo_,Voucher_Type_Id_,
    callback
) {
    if (
        InvoiceNo_ === "undefined" ||
        InvoiceNo_ === "" ||
        InvoiceNo_ === undefined
    )
    InvoiceNo_ = "";
    return db.query(
        "CALL Search_Invoice_By_VoucherType_Typeahead(@Client_Accounts_Id_ :=?,@InvoiceNo_ :=?,@Voucher_Type_Id_ :=?)",
        [Client_Accounts_Id_, InvoiceNo_,Voucher_Type_Id_],
        callback
    );
},

};
module.exports = Payment_Voucher;
