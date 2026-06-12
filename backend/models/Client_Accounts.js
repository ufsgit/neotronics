var db = require("../dbconnection");
var fs = require("fs");
const Company = require("./Company");
var Client_Accounts = {
	Save_Client_Accounts: function (Client_Accounts_, callback) {
		console.log(Client_Accounts_);
		let Categories_value = 0,
			Products_Value = 0;
		let Categories = Client_Accounts_.Category_Data;
		let Products = Client_Accounts_.Product_Data;
		if (Categories != undefined) Categories_value = 1;
		if (Products != undefined) Products_Value = 1;
		return db.query(
			"CALL Save_Client_Accounts(" +
				"@Client_Accounts_Id_ :=?," +
				"@Account_Group_Id_ :=?," +
				"@Client_Accounts_Name_ :=?," +
				"@Address1_ :=?," +
				"@Address2_ :=?," +
				"@Address3_ :=?," +
				"@Address4_ :=?," +
				"@PinCode_ :=?," +
				"@GSTNo_ :=?," +
				"@Country_ :=?," +
				"@Phone_ :=?," +
				"@Mobile_ :=?," +
				"@Email_ :=?," +
				"@Opening_Balance_ :=?," +
				"@Payment_Term_ :=?," +
				"@UserId_ :=?," +
				"@Employee_Id_ :=?)",
			[
				Client_Accounts_.Client_Accounts_Id,
				Client_Accounts_.Account_Group_Id,
				Client_Accounts_.Client_Accounts_Name,
				Client_Accounts_.Address1,
				Client_Accounts_.Address2,
				Client_Accounts_.Address3,
				Client_Accounts_.Address4,
				Client_Accounts_.PinCode,
				Client_Accounts_.GSTNo,
				Client_Accounts_.Country,
				Client_Accounts_.Phone,
				Client_Accounts_.Mobile,
				Client_Accounts_.Email,
				Client_Accounts_.Opening_Balance,
				Client_Accounts_.Payment_Term,
				Client_Accounts_.UserId,
				Client_Accounts_.Employee_Id
			],
			function (err, rows) {
				console.log('Backend Save_Client_Accounts Rows:', rows);
				if (err) {
					return callback(err, rows);
				}
				if (rows && rows[0] && rows[0][0] && rows[0][0].Client_Accounts_Id_ > 0) {
					var Client_Accounts_Id = rows[0][0].Client_Accounts_Id_;
					var Contact_Person_Data = Client_Accounts_.Contact_Person_Data;
					
					db.query("DELETE FROM contact_person WHERE Client_Accounts_Id = ?", [Client_Accounts_Id], function (err2, result2) {
						if (err2) {
							console.log(err2);
						}
						if (Contact_Person_Data && Contact_Person_Data.length > 0) {
							var values = [];
							for (var i = 0; i < Contact_Person_Data.length; i++) {
								if (Contact_Person_Data[i].contact_person != "" && Contact_Person_Data[i].contact_person != undefined) {
									values.push([
										Client_Accounts_Id,
										Contact_Person_Data[i].contact_person,
										Contact_Person_Data[i].contact_number,
										Contact_Person_Data[i].designation
									]);
								}
							}
							if (values.length > 0) {
								db.query("INSERT INTO contact_person (Client_Accounts_Id, contact_person, contact_number, designation) VALUES ?", [values], function (err3, result3) {
									if (err3) {
										console.log(err3);
									}
									callback(err, rows);
								});
							} else {
								callback(err, rows);
							}
						} else {
							callback(err, rows);
						}
					});
				} else {
					callback(err, rows);
				}
			}
		);
	},
	Delete_Client_Accounts: function (Client_Accounts_Id_, callback) {
		return db.query(
			"CALL Delete_Client_Accounts(@Client_Accounts_Id_ :=?)",
			[Client_Accounts_Id_],
			callback
		);
	},
	Get_Client_Accounts: function (Client_Accounts_Id_, callback) {
		return db.query(
			"CALL Get_Client_Accounts(@Client_Accounts_Id_ :=?)",
			[Client_Accounts_Id_],
			function (err, rows) {
				if (err) {
					return callback(err, rows);
				}
				db.query("SELECT * FROM contact_person WHERE Client_Accounts_Id = ?", [Client_Accounts_Id_], function (err2, rows2) {
					if (err2) {
						console.log(err2);
					}
					if (rows && rows[0] && rows[0][0]) {
						rows[0][0].Contact_Person_Data = rows2;
					}
					callback(err, rows);
				});
			}
		);
	},
	Search_Client_Accounts: function (
		Client_Accounts_Name_,
		Account_Group_,
		callback
	) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";


			console.log('ItemName2_: ', Client_Accounts_Name_);
			const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
				if (specialCharacters.test(Client_Accounts_Name_)) {
					console.log("String contains special characters.");
					Client_Accounts_Name_ = Client_Accounts_Name_.replace(/\\/g, '\\\\'); // Escape backslashes

					// Client_Accounts_Name_ = Client_Accounts_Name_.replace(specialCharacters, '\\$&');
				} else {
					console.log("String does not contain special characters.");
				}
			
				console.log('Escaped Client_Accounts_Name:', Client_Accounts_Name_);

		return db.query(
			"CALL Search_Client_Accounts(@Client_Accounts_Name_ :=?,@Account_Group_ :=?)",
			[Client_Accounts_Name_, Account_Group_],
			callback
		);
	},
	Search_Bank: function (Client_Accounts_Name_, Account_Group_, callback) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";
		return db.query(
			"CALL Search_Bank(@Client_Accounts_Name_ :=?,@Account_Group_ :=?)",
			[Client_Accounts_Name_, Account_Group_],
			callback
		);
	},

	Search_Customer: function (Client_Accounts_Name_, Employee_Id, callback) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";
		return db.query(
			"CALL Search_Customer(@Client_Accounts_Name_ :=?,@Employee_Id :=?)",
			[Client_Accounts_Name_, Employee_Id],
			callback
		);
	},
	Accounts_Typeahead: function (
		Account_Group_Id_,
		Client_Accounts_Name_,
		callback
	) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";

		if(
			Account_Group_Id_ === null ||
			Account_Group_Id_ === undefined ||
			Account_Group_Id_ === "undefined" ||
			Account_Group_Id_ === "0")
			Account_Group_Id_ = "";
			
		return db.query(
			"CALL Accounts_Typeahead(@Account_Group_Id_ :=?,@Client_Accounts_Name_ :=?)",
			[Account_Group_Id_, Client_Accounts_Name_],
			callback
		);
	},

	// Accounts_Typeahead_1: function (
	// 	Account_Group_Id_,
	// 	Client_Accounts_Name_,
	// 	callback
	// ) {

	// 	if (
	// 		Client_Accounts_Name_ === "undefined" ||
	// 		Client_Accounts_Name_ === "" ||
	// 		Client_Accounts_Name_ === undefined
	// 	)
	// 		Client_Accounts_Name_ = "";

	// 	if(
	// 		Account_Group_Id_ === null ||
	// 		Account_Group_Id_ === undefined ||
	// 		Account_Group_Id_ === "undefined" ||
	// 		Account_Group_Id_ === "0")
	// 		Account_Group_Id_ = "";


	// 		if (Client_Accounts_Name_.includes('\\') || Client_Accounts_Name_.includes('%') || Client_Accounts_Name_.includes("'")) {
	// 			console.log("String contains special characters: \\, ', or %");
	// 			Client_Accounts_Name_ = Client_Accounts_Name_.replace(/([\\%'])/g, '\\$1');

	// 		} else {
	// 			console.log("String does not contain special characters.");
	// 		}

	// 		console.log('Client_Accounts_Name :',Client_Accounts_Name_);
			
	// 	return db.query(
	// 		"CALL Accounts_Typeahead_1(@Account_Group_Id_ :=?,@Client_Accounts_Name_ :=?)",
	// 		[Account_Group_Id_, Client_Accounts_Name_],
	// 		callback
	// 	);
	// },




	// Accounts_Typeahead_1: function (Account_Group_Id_, Client_Accounts_Name_, callback) {
	// 	if (
	// 		Client_Accounts_Name_ === "undefined" ||
	// 		Client_Accounts_Name_ === "" ||
	// 		Client_Accounts_Name_ === undefined
	// 	)
	// 		Client_Accounts_Name_ = "";
	

	// 	if (
	// 		Account_Group_Id_ === null ||
	// 		Account_Group_Id_ === undefined ||
	// 		Account_Group_Id_ === "undefined" ||
	// 		Account_Group_Id_ === "0"
	// 	)
	// 		Account_Group_Id_ = "";
	
	// 	const specialCharacters = /([`~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
	// 	if (specialCharacters.test(Client_Accounts_Name_)) {
	// 		console.log("String contains special characters.");
	// 		Client_Accounts_Name_ = Client_Accounts_Name_.replace(specialCharacters, '\\$&');
	// 	} else {
	// 		console.log("String does not contain special characters.");
	// 	}
	
	// 	console.log('Escaped Client_Accounts_Name:', Client_Accounts_Name_);
	
	// 	return db.query(
	// 		"CALL Accounts_Typeahead_1(@Account_Group_Id_ :=?, @Client_Accounts_Name_ :=?)",
	// 		[Account_Group_Id_, Client_Accounts_Name_],
	// 		callback
	// 	);
	// },
	

	Accounts_Typeahead_1: function (Account_Group_Id_, Client_Accounts_Name_, callback) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";
	
		// if (
		// 	Account_Group_Id_ === null ||
		// 	Account_Group_Id_ === undefined ||
		// 	Account_Group_Id_ === "undefined" ||
		// 	Account_Group_Id_ === "0"
		// )
		// 	Account_Group_Id_ = "";
	
		// Check and escape all special characters, including '+'
		const specialCharacters = /([~@#$%^&*()_+\-=[\]\\{}|;:'",.<>?/])/g;
		if (specialCharacters.test(Client_Accounts_Name_)) {
			console.log("String contains special characters.");
			Client_Accounts_Name_ = Client_Accounts_Name_.replace(specialCharacters, '\\$&');
		} else {
			console.log("String does not contain special characters.");
		}
	
		console.log('Account group', Account_Group_Id_);
		console.log('Escaped Client_Accounts_Name:', Client_Accounts_Name_);
	
		return db.query(
			"CALL Accounts_Typeahead_1(@Account_Group_Id_ :=?, @Client_Accounts_Name_ :=?)",
			[Account_Group_Id_, Client_Accounts_Name_],
			callback
		);
	},
	
	Account_Group_Typeahead: function (
		Account_Group_Id_,
		Accounts_Name_,
		callback
	) {
		if (
			Accounts_Name_ === "undefined" ||
			Accounts_Name_ === "" ||
			Accounts_Name_ === undefined
		)
			Accounts_Name_ = "";
		return db.query(
			"CALL Account_Group_Typeahead(@Account_Group_Id_ :=?,@Accounts_Name_ :=?)",
			[Account_Group_Id_, Accounts_Name_],
			callback
		);
	},
	From_Stock_Typeahead: function (Client_Accounts_Name_, callback) {
		if (
			Client_Accounts_Name_ === "undefined" ||
			Client_Accounts_Name_ === "" ||
			Client_Accounts_Name_ === undefined
		)
			Client_Accounts_Name_ = "";
		return db.query(
			"CALL From_Stock_Typeahead(@Client_Accounts_Name_ :=?)",
			[Client_Accounts_Name_],
			callback
		);
	},
	Client_Employee_Typeahead: function (Client_Accounts_Id_, callback) {
		return db.query(
			"CALL Client_Employee_Typeahead(@Client_Accounts_Id_ :=?)",
			[Client_Accounts_Id_],
			callback
		);
	},
	Save_Company: function (Company_, callback) {
		console.log('Company_:',Company_);
		return db.query(
			"CALL Save_Company(" +
				"@Company_Id_ :=?," +
				"@Company_Name_ :=?," +
				"@Address1_ :=?," +
				"@Address2_ :=?," +
				"@Address3_ :=?," +
				"@Address4_ :=?," +
				"@Mobile_Number_ :=?," +
				"@Phone_Number_ :=?," +
				"@FAX_ :=?," +
				"@EMail_ :=?," +
				"@Website_ :=?," +
				"@Logo_ :=?," +
				"@Code_ :=?," +
				"@GSTNO_ :=?," +
				"@CINO_ :=?," +
				"@PANNO_ :=?," +
				"@Note_ :=?,"+
				"@Doc_Photo_ :=?,"+
				"@File_Path_ :=?,"+
				"@file_url_ :=?)",
			[
				Company_.Company_Id,
				Company_.Company_Name,
				Company_.Address1,
				Company_.Address2,
				Company_.Address3,
				Company_.Address4,
				Company_.Mobile_Number,
				Company_.Phone_Number,
				Company_.FAX,
				Company_.EMail,
				Company_.Website,
				Company_.Logo,
				Company_.Code,
				Company_.GSTNO,
				Company_.CINO,
				Company_.PANNO || '',
				Company_.Note || '',
				Company_.Doc_Photo || '',
				Company_.File_Path || '',
				Company_.file_url || ''
			],
			callback
		);
	},
	Delete_Company: function (Company_Id_, callback) {
		return db.query(
			"CALL Delete_Company(@Company_Id_ :=?)",
			[Company_Id_],
			callback
		);
	},
	Get_Company: function (Company_Id_, callback) {
		return db.query(
			"CALL Get_Company(@Company_Id_ :=?)",
			[Company_Id_],
			callback
		);
	},
	Search_Company: function (Company_Name_, callback) {
		if (
			Company_Name_ === "undefined" ||
			Company_Name_ === "" ||
			Company_Name_ === undefined
		)
			Company_Name_ = "";
		return db.query(
			"CALL Search_Company_Table(@Company_Name_ :=?)",
			[Company_Name_],
			callback
		);
	},

	Save_Cheque_Book: function (Cheque_Book_, callback) {
		console.log(Cheque_Book_);
		return db.query(
			"CALL Save_Cheque_Book(" +
				"@Cheque_Book_Id_ :=?," +
				"@Bank_Id_ :=?," +
				"@Book_No_ :=?," +
				"@From_No_ :=?," +
				"@Total_Leaves_ :=?," +
				"@To_No_ :=?," +
				"@User_Id_ :=?)",
			[
				Cheque_Book_.Cheque_Book_Id,
				Cheque_Book_.Bank_Id,
				Cheque_Book_.Book_No,
				Cheque_Book_.From_No,
				Cheque_Book_.Total_Leaves,
				Cheque_Book_.To_No,
				Cheque_Book_.User_Id,
			],
			callback
		);
	},
	Delete_Company: function (Company_Id_, callback) {
		return db.query(
			"CALL Delete_Company(@Company_Id_ :=?)",
			[Company_Id_],
			callback
		);
	},
	Search_Cheque_Book: function (Book_No_, Bank_Id_, callback) {
		if (Book_No_ === "undefined" || Book_No_ === "" || Book_No_ === undefined)
			Book_No_ = "";
		return db.query(
			"CALL Search_Cheque_Book(@Book_No_ :=?,@Account_Group_ :=?)",
			[Book_No_, Bank_Id_],
			callback
		);
	},
	Delete_Cheque_Book: function (Cheque_Book_Id_, callback) {
		return db.query(
			"CALL Delete_Cheque_Book(@Cheque_Book_Id_ :=?)",
			[Cheque_Book_Id_],
			callback
		);
	},
	Load_Prodcut_Under_Category: function (ids_, callback) {
		console.log(ids_);
		return db.query(
			"CALL Load_Prodcut_Under_Category(@ids_ :=?)",
			[ids_],
			callback
		);
	},
	Get_Vendors_Other_Details: function (Client_Accounts_Id_, callback) {
		return db.query(
			"CALL Get_Vendors_Other_Details(@Client_Accounts_Id_ :=?)",
			[Client_Accounts_Id_],
			callback
		);
	},


	Search_Branch_Typeahead:function(Branch_Name_,callback)
	{ 
	if(Branch_Name_==='undefined'||Branch_Name_===''||Branch_Name_===undefined )
	Branch_Name_='';
	return db.query("CALL Search_Branch_Typeahead(@Branch_Name_ :=?)",[Branch_Name_],callback);
	},



	Search_ItemCode_Typeahead:function(Item_Code_,callback)
	{ 
	if(Item_Code_==='undefined'||Item_Code_===''||Item_Code_===undefined )
	Item_Code_='';
	return db.query("CALL Search_ItemCode_Typeahead(@Item_Code_ :=?)",[Item_Code_],callback);
	},

	Search_ItemName_Typeahead:function(Item_Name_,callback)
	{ 
	if(Item_Name_==='undefined'||Item_Name_===''||Item_Name_===undefined )
	Item_Name_='';
	return db.query("CALL Search_ItemName_Typeahead(@Item_Name_ :=?)",[Item_Name_],callback);
	},
};
module.exports = Client_Accounts;
