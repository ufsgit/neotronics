var db = require("../dbconnection");
var fs = require("fs");
const storedProcedure = require("../helpers/stored-procedure");
const { Console } = require("console");
var Purchase_Order_Master = {
	Save_Purchase_Order_Master: async function (Purchase_Order_Master_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			try {
				const result1 = await new storedProcedure(
					"Save_Purchase_Order_Master",
					[
						Purchase_Order_Master_.Purchase_Order_Master_Id,
						Purchase_Order_Master_.Client_Accounts_Id,
						Purchase_Order_Master_.Purchase_Order_Customer_Id,
						Purchase_Order_Master_.Company_Id,
						Purchase_Order_Master_.User_Id,
						Purchase_Order_Master_.Entry_Date,
						Purchase_Order_Master_.PONo,
						Purchase_Order_Master_.Delivery_Date,
						Purchase_Order_Master_.Currency,
						Purchase_Order_Master_.Shipment_Method_Id,
						Purchase_Order_Master_.Price_Method,
						Purchase_Order_Master_.Payment_Term,
						Purchase_Order_Master_.Shipping_Port,
						Purchase_Order_Master_.Delivery_Port,
						Purchase_Order_Master_.Shipmet_Plan_Id,
						Purchase_Order_Master_.No_of_Shipment,
						Purchase_Order_Master_.Description,
						Purchase_Order_Master_.Order_Status,
						Purchase_Order_Master_.TotalAmount,
						Purchase_Order_Master_.Purchase_Details,
						Purchase_Order_Master_.Shipment_Save,
					],
					connection
				).result();
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
				var result2 = [{ Purchase_Order_Master_Id_: 0 }];
				rs(result2);
			} finally {
				connection.release();
			}
		});
	},
	Save_Purchase_Order_Customer: async function (Purchase_Order_Master_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			try {
				const result1 = await new storedProcedure(
					"Save_Purchase_Order_Customer",
					[
						Purchase_Order_Master_.Purchase_Order_Customer_Id,
						Purchase_Order_Master_.Company_Id,
						Purchase_Order_Master_.User_Id,
						Purchase_Order_Master_.Entry_Date,
						Purchase_Order_Master_.Delivery_Date,
						Purchase_Order_Master_.PONo,
						Purchase_Order_Master_.Currency,
						Purchase_Order_Master_.Shipment_Method_Id,
						Purchase_Order_Master_.Payment_Term,
						Purchase_Order_Master_.Delivery_Port,
						Purchase_Order_Master_.Shipmet_Plan_Id,
						Purchase_Order_Master_.No_of_Shipment,
						Purchase_Order_Master_.Description,
						Purchase_Order_Master_.Order_Status,
						Purchase_Order_Master_.TotalAmount,
						Purchase_Order_Master_.Reference_Field,
						Purchase_Order_Master_.Purchase_Details,
					],
					connection
				).result();
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
				var result2 = [{ Purchase_Order_Customer_Id_: 0 }];
				rs(result2);
			} finally {
				connection.release();
			}
		});
	},
	Save_Suggestion_Master: async function (Suggestion_Master_) {
		console.log(Suggestion_Master_)
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			try {
				const result1 = await new storedProcedure(
					"Save_Suggestion_Master",
					[
						Suggestion_Master_.Purchase_Order_Master_Id,
						Suggestion_Master_.Comment_Status_Id,
						Suggestion_Master_.Comment_Status_Name,
						Suggestion_Master_.Comments,
						Suggestion_Master_.Mention_Staff,
						Suggestion_Master_.Suggestion_Details_,
					],
					connection
				).result();
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
				var result2 = [{ Purchase_Order_Master_Id_: 0 }];
				rs(result2);
			} finally {
				connection.release();
			}
		});
	},
	Get_Purchase_Order_Master: function (
		Purchase_Order_Master_Id_,
		Order_Company_Id_,
		Order_Warehouse_Id_,
		callback
	) {
		console.log(Purchase_Order_Master_Id_, 1);
		return db.query(
			"CALL Get_Purchase_Order_Master(@Purchase_Order_Master_Id_ :=?,@Order_Company_Id_:=?,@Order_Warehouse_Id_:=?)",
			[Purchase_Order_Master_Id_, Order_Company_Id_, Order_Warehouse_Id_],
			callback
		);
	},
	Get_Purchase_Order_Customer: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Get_Purchase_Order_Customer(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Get_Sales_Tracking: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Get_Sales_Tracking(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	// Search_Purchase_Order_Master: function (Is_Date_Check_, FromDate_, ToDate_, Client_Accounts_Id_, PONo_, Purchase_Order_Status_Id,callback)
	//   {
	//     if (PONo_===undefined || PONo_==='undefined' )
	//     PONo_=0;
	// return db.query("CALL Search_Purchase_Order_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Client_Accounts_Id_ :=?,@PONo_ :=?,@Purchase_Order_Status_Id :=?)",
	//   [Is_Date_Check_, FromDate_, ToDate_, Client_Accounts_Id_, PONo_, Purchase_Order_Status_Id],callback);
	//   },

	Search_Purchase_Order_Master: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Search_By_,
		SearchbyName_,
		Order_Platform_,
		Order_Source_,
		By_User_,
		Payment_Mode_,
		Order_Type_Id_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Search_By_,
			SearchbyName_,
			Order_Platform_,
			Order_Source_,
			By_User_,
			Payment_Mode_,
			Order_Type_Id_
		);
		return db.query(
			"CALL Search_Purchase_Order_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Search_By_ :=?,@SearchbyName_ :=?,@Order_Platform_ :=?,@Order_Source_ :=?,@By_User_ :=?,@Payment_Mode_ :=?,@Order_Type_Id_:=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Search_By_,
				SearchbyName_,
				Order_Platform_,
				Order_Source_,
				By_User_,
				Payment_Mode_,
				Order_Type_Id_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Purchase_Order_Master_For_Invoice: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Id_,
		Region_,
		Order_Platform_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Order_Id_,
			Region_,
			Order_Platform_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Purchase_Order_Master_For_Invoice(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Id_:=?,@Region_ :=?,@Order_Platform_ :=?,@Status_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Id_,
				Region_,
				Order_Platform_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Purchase_Order_Master_For_InvoiceCancel: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Id_,
		Region_,
		Order_Platform_,
		Status_Id_,
		By_User_,
		
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Order_Id_,
			Region_,
			Order_Platform_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Purchase_Order_Master_For_InvoiceCancel(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Id_:=?,@Region_ :=?,@Order_Platform_ :=?,@Status_Id_:=?,@By_User_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Id_,
				Region_,
				Order_Platform_,
				Status_Id_,
				By_User_
			],
			callback
		);
	},

	Search_Purchase_Order_Master_For_InvoiceCancel_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Id_,
		Region_,
		Order_Platform_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Order_Id_,
			Region_,
			Order_Platform_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Purchase_Order_Master_For_InvoiceCancel_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Id_:=?,@Region_ :=?,@Order_Platform_ :=?,@Status_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Id_,
				Region_,
				Order_Platform_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	// Search_Purchase_Order_Master_For_Picklist: function (
	// 	Is_Date_Check_,
	// 	FromDate_,
	// 	ToDate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Order_Platform_,
	// 	Order_Source_,
	// 	By_User_,
	// 	Region_,
	// 	Payment_Mode_,
	// 	Picking_list_master_Id_,
	// 	callback
	// ) {
	// 	console.log(
	// 		Is_Date_Check_,
	// 		FromDate_,
	// 		ToDate_,
	// 		Search_By_,
	// 		SearchbyName_,
	// 		Order_Platform_,
	// 		Order_Source_,
	// 		By_User_,
	// 		Region_,
	// 		Payment_Mode_,
	// 		Picking_list_master_Id_
	// 	);
	// 	return db.query(
	// 		"CALL Search_Purchase_Order_Master_For_Picklist(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Search_By_ :=?,@SearchbyName_ :=?,@Order_Platform_ :=?,@Order_Source_ :=?,@By_User_ :=?,@Region_ :=?,@Payment_Mode_ :=?,@Picking_list_master_Id_ :=?)",
	// 		[
	// 			Is_Date_Check_,
	// 			FromDate_,
	// 			ToDate_,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Order_Platform_,
	// 			Order_Source_,
	// 			By_User_,
	// 			Region_,
	// 			Payment_Mode_,
	// 			Picking_list_master_Id_,
	// 		],
	// 		callback
	// 	);
	// },

	// Search_Purchase_Order_Customer: function (Is_Date_Check_, FromDate_, ToDate_, PONo_, Client_Id_, Order_Status_,Reference_Field_,callback) {
	//   if (PONo_ === undefined || PONo_ === 'undefined')
	//     PONo_ = 0;
	//     if (Reference_Field_ === undefined || Reference_Field_ === 'undefined')
	//     Reference_Field_ = 0;
	//   return db.query("CALL Search_Purchase_Order_Customer(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@PONo_ :=?,@Client_Id_ :=?,@Order_Status_ :=?,@Reference_Field_ :=?)",
	//     [Is_Date_Check_, FromDate_, ToDate_, PONo_, Client_Id_, Order_Status_,Reference_Field_], callback);
	// },

	Load_Order_Status: function (Order_Status_Name_, Group_Id_, callback) {
		if (Order_Status_Name_ === undefined || Order_Status_Name_ === "undefined")
			Order_Status_Name_ = 0;
		return db.query(
			"CALL Load_Order_Status(@Order_Status_Name_ :=?,@Group_Id_ :=?)",
			[Order_Status_Name_, Group_Id_],
			callback
		);
	},
	Search_Pono_Typeahead: function (PONo_, callback) {
		if (PONo_ === undefined || PONo_ === "undefined") PONo_ = "";
		return db.query(
			"CALL Search_Pono_Typeahead(@PONo_ :=?)",
			[PONo_],
			callback
		);
	},
	Search_Pono_Client_Typeahead: function (PONo_, Client_Id_, callback) {
		if (PONo_ === undefined || PONo_ === "undefined") PONo_ = "";
		return db.query(
			"CALL Search_Pono_Client_Typeahead(@PONo_ :=?,@Client_Id_ :=?)",
			[PONo_, Client_Id_],
			callback
		);
	},
	Delete_Purchase_Order_Master: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Delete_Purchase_Order_Master(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Delete_Purchase_Order_Customer: function (
		Purchase_Order_Master_Id_,
		callback
	) {
		return db.query(
			"CALL Delete_Purchase_Order_Customer(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Create_Production_Customer: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Create_Production_Customer(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Get_Production_From_Purchase_Customer: function (
		Purchase_Order_Master_Id_,
		callback
	) {
		return db.query(
			"CALL Get_Production_From_Purchase_Customer(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Search_Order_Tracking: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Search_Order_Tracking(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Search_Order_Tracking_User: function (
		FromDate_,
		ToDate_,
		Is_Date_Check_,
		Po_No_,
		callback
	) {
		return db.query(
			"CALL Search_Order_Tracking_User(@FromDate_ :=?,@ToDate_ :=?,@Is_Date_Check_ :=?,@Po_No_ :=?)",
			[FromDate_, ToDate_, Is_Date_Check_, Po_No_],
			callback
		);
	},
	Load_Purchase_Order_Status: function (callback) {
		return db.query("CALL Load_Purchase_Order_Status()", [], callback);
	},

	Get_Purchase_Order_From_Proforma: function (Shipment_Master_Id_, callback) {
		return db.query(
			"CALL Get_Purchase_Order_From_Proforma(@Shipment_Master_Id_ :=?)",
			[Shipment_Master_Id_],
			callback
		);
	},

	Get_Purchase_Order_From_Proforma_Invoice: function (
		Purchase_Order_Master_Id_,
		callback
	) {
		return db.query(
			"CALL Get_Purchase_Order_From_Proforma_Invoice(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},

	Get_Purchase_Order_Previouslist: function (
		Purchase_Order_Master_Id_,
		Client_Accounts_Id_,
		callback
	) {
		return db.query(
			"CALL Get_Purchase_Order_Previouslist(@Purchase_Order_Master_Id_ :=?,@Client_Accounts_Id_:=?)",
			[Purchase_Order_Master_Id_, Client_Accounts_Id_],
			callback
		);
	},
	Search_Dashboard_Customer: function (Login_User_Id_, callback) {
		return db.query(
			"CALL Search_Dashboard_Customer(@Login_User_Id_ :=?)",
			[Login_User_Id_],
			callback
		);
	},
	Search_Dashboard: function (callback) {
		return db.query("CALL Search_Dashboard()", [], callback);
	},

	Load_Order_Platform: function (callback) {
		return db.query("CALL Load_Order_Platform()", [], callback);
	},

	Load_StatusOrder: function (Group_Id_, callback) {
		return db.query(
			"CALL Load_StatusOrder(@Group_Id_ :=?)",
			[Group_Id_],
			callback
		);
	},

	Load_StatusOrderfor_Fullorder_Report: function (callback) {
		return db.query(
			"CALL Load_StatusOrderfor_Fullorder_Report()",
			[],
			callback
		);
	},

	Load_UserDetails_Forfullorderreport: function (callback) {
		return db.query("CALL Load_UserDetails_Forfullorderreport()", [], callback);
	},

	Load_StatusOrder_Inventory: function (Group_Id_, callback) {
		return db.query(
			"CALL Load_StatusOrder_Inventory(@Group_Id_ :=?)",
			[Group_Id_],
			callback
		);
	},

	Load_Order_Source: function (callback) {
		return db.query("CALL Load_Order_Source()", [], callback);
	},

	Load_StatusOrder_Sender_Pending: function (callback) {
		return db.query("CALL Load_StatusOrder_Sender_Pending()", [], callback);
	},

	Load_StatusOrder_LastFive: function (callback) {
		return db.query("CALL Load_StatusOrder_LastFive()", [], callback);
	},

	Save_Neworders: function (Purchase_Order_Master_, callback) {
		console.log(Purchase_Order_Master_);
		return db.query(
			"CALL Save_Neworders(" +
				"@Purchase_Order_Master_Id_ :=?," +
				//  "@Client_Accounts_Id_ :=?,"+
				//  "@Client_Accounts_Name_ :=?,"+
				//  "@Order_No_ :=?,"+
				//  "@Order_Slno_ :=?,"+
				"@Order_Platform_Id_ :=?," +
				"@Order_Platform_Name_ :=?," +
				"@Order_Date_ :=?," +
				"@Order_Time_ :=?," +
				"@Section_Id_ :=?," +
				"@Section_Name_ :=?," +
				"@Customer_Name_ :=?," +
				"@Mobile_Number_ :=?," +
				"@AlternativeMobile_Number_ :=?," +
				"@Region_Id_ :=?," +
				"@Region_Name_ :=?," +
				"@SubArea_Id_ :=?," +
				"@SubArea_Name_ :=?," +
				"@Building_No_ :=?," +
				"@Avaliable_Time_ :=?," +
				"@Order_Source_Id_ :=?," +
				"@Order_Source_Name_ :=?," +
				"@Description_ :=?," +
				"@TotalAmount_ :=?," +
				"@Total_Discount_ :=?," +
				"@SubTotal_ :=?," +
				"@VAT_ :=?," +
				"@Total_Amount_ :=?," +
				"@Discount_ :=?," +
				"@Shipping_Charge_ :=?," +
				"@Processing_Fee_ :=?," +
				"@Grand_Total_ :=?," +
				"@Total_Paid_ :=?," +
				"@CreditPoint_Used_ :=?," +
				"@Tobe_Collected_ :=?," +
				"@Return_Balance_ :=?," +
				"@Order_Status_ :=?," +
				"@Order_Status_name_ :=?," +
				"@User_Id_ :=?," +
				"@User_Name_ :=?," +
				"@Payment_Mode_Id_ :=?," +
				"@Payment_Mode_Name_ :=?," +
				"@Email_ :=?," +
				"@Order_Company_Id_:=?," +
				"@Order_Company_Name_ :=?," +
				"@Order_Warehouse_Id_:=?," +
				"@Order_Warehouse_Name_ :=?," +
				"@Product_details_ :=?" +
				")",
			[
				Purchase_Order_Master_.Purchase_Order_Master_Id,
				// Purchase_Order_Master_.Client_Accounts_Id,
				// Purchase_Order_Master_.Client_Accounts_Name,
				// Purchase_Order_Master_.Order_Slno,
				// Purchase_Order_Master_.Order_No,
				Purchase_Order_Master_.Order_Platform_Id,
				Purchase_Order_Master_.Order_Platform_Name,
				Purchase_Order_Master_.Order_Date,
				Purchase_Order_Master_.Order_Time,
				Purchase_Order_Master_.Section_Id,
				Purchase_Order_Master_.Section_Name,
				Purchase_Order_Master_.Customer_Name,
				Purchase_Order_Master_.Mobile_Number,
				Purchase_Order_Master_.AlternativeMobile_Number,
				Purchase_Order_Master_.Region_Id,
				Purchase_Order_Master_.Region_Name,
				Purchase_Order_Master_.SubArea_Id,
				Purchase_Order_Master_.SubArea_Name,
				Purchase_Order_Master_.Building_No,
				Purchase_Order_Master_.Avaliable_Time,
				Purchase_Order_Master_.Order_Source_Id,
				Purchase_Order_Master_.Order_Source_Name,
				Purchase_Order_Master_.Description,
				Purchase_Order_Master_.TotalAmount,
				Purchase_Order_Master_.Total_Discount,
				Purchase_Order_Master_.SubTotal,
				Purchase_Order_Master_.VAT,
				Purchase_Order_Master_.Total_Amount,
				Purchase_Order_Master_.Discount,
				Purchase_Order_Master_.Shipping_Charge,
				Purchase_Order_Master_.Processing_Fee,
				Purchase_Order_Master_.Grand_Total,
				Purchase_Order_Master_.Total_Paid,
				Purchase_Order_Master_.CreditPoint_Used,
				Purchase_Order_Master_.Tobe_Collected,
				Purchase_Order_Master_.Return_Balance,
				Purchase_Order_Master_.Order_Status,
				Purchase_Order_Master_.Order_Status_name,
				Purchase_Order_Master_.User_Id,
				Purchase_Order_Master_.User_Name,
				Purchase_Order_Master_.Payment_Mode_Id,
				Purchase_Order_Master_.Payment_Mode_Name,
				Purchase_Order_Master_.Email,
				Purchase_Order_Master_.Order_Company_Id,
				Purchase_Order_Master_.Order_Company_Name,
				Purchase_Order_Master_.Order_Warehouse_Id,
				Purchase_Order_Master_.Order_Warehouse_Name,

				JSON.stringify(Purchase_Order_Master_.Purchase_Details),
			],
			callback
		);
	},
	Load_Payment_Mode: function (callback) {
		return db.query("CALL Load_Payment_Mode()", [], callback);
	},

	// Get_Purchase_Order_Previouslist:function(Purchase_Order_Master_Id_,Client_Accounts_Id_,callback)
	// {
	// return db.query("CALL Get_Purchase_Order_Previouslist(@Purchase_Order_Master_Id_ :=?,@Client_Accounts_Id_ :=?)",
	// [Purchase_Order_Master_Id_,Client_Accounts_Id_],callback);
	// } ,
	Search_Logistics_Send_Receive: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Warehouse_Id_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Warehouse_Id_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Logistics_Send_Receive(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Warehouse_Id_:=?,@Status_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Warehouse_Id_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	Send_Logistics: function (Send_Log_Details_, callback) {
		console.log(Send_Log_Details_.Warehouse_Name);
		return db.query(
			"CALL Send_Logistics(" +
				"@Log_Details_ :=?," +
				"@By_User_Id_ :=?," +
				"@Warehouse_Id_ :=?," +
				"@Warehouse_Name_ :=?)",
			[
				JSON.stringify(Send_Log_Details_.Log_Details),
				Send_Log_Details_.By_User,
				Send_Log_Details_.Warehouse_Id,
				Send_Log_Details_.Warehouse_Name,
			],
			callback
		);
	},

	Invoice_Received: function (Invoice_Collection_, callback) {
		return db.query(
			"CALL Invoice_Received(" +
				"@Collected_Details_ :=?," +
				"@By_User_Id_ :=?)",
			[
				JSON.stringify(Invoice_Collection_.Collected_Details),
				Invoice_Collection_.By_User,
			],
			callback
		);
	},

	Search_Inventory_Send_Receive: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Warehouse_Id_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Warehouse_Id_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Inventory_Send_Receive(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Warehouse_Id_ :=?,@Status_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Warehouse_Id_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Invoice_Packed: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		By_User_,
		Region_,Black_Start_,
		Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			By_User_,
			Region_
		);
		return db.query(
			"CALL Search_Invoice_Packed(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@By_User_ :=?,@Region_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[Is_Date_Check_, FromDate_, ToDate_, SearchbyName_, By_User_, Region_,Black_Start_,Black_Stop_,Page_Length_],
			callback
		);
	},
	Search_Picklist_Master: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Search_By_,
		SearchbyName_,
		Order_Platform_,
		Order_Source_,
		By_User_,
		Region_,
		Payment_Mode_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Picklist_Master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Search_By_ :=?,@SearchbyName_ :=?,@Order_Platform_ :=?,@Order_Source_ :=?,@By_User_ :=?,@Region_ :=?,@Payment_Mode_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Search_By_,
				SearchbyName_,
				Order_Platform_,
				Order_Source_,
				By_User_,
				Region_,
				Payment_Mode_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	Send_Inventory: function (Inentories_, callback) {
		console.log(Inentories_);
		return db.query(
			"CALL Send_Inventory(" + "@Log_Details_ :=?," + "@By_User_Id_ :=?)",
			[JSON.stringify(Inentories_.Inventory_Details), Inentories_.By_User],
			callback
		);
	},

	Search_sender_pending_master: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Region_,
		Section_Id_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Region_,
			Section_Id_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_sender_pending_master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Region_ :=?,@Section_Id_ :=?,@Status_Id_ :=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Region_,
				Section_Id_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Senders_Dispatch: function (Sender_Dispatch_, callback) {
		console.log(Sender_Dispatch_);
		return db.query(
			"CALL Senders_Dispatch(" +
				"@Dispatch_Details_ :=?," +
				"@By_User_Id_ :=?," +
				"@Driver_Id_ :=?," +
				"@Driver_Name_ :=?)",
			[
				JSON.stringify(Sender_Dispatch_.Dispatch_Details),
				Sender_Dispatch_.By_User,
				Sender_Dispatch_.Driver_Id,
				Sender_Dispatch_.Driver_Name,
			],
			callback
		);
	},
	Search_sender_Dispatch_master: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Region_,
		Section_Id_,
		Driver_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Region_,
			Section_Id_,
			Driver_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_sender_Dispatch_master(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Region_ :=?,@Section_Id_:=?,@Driver_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Region_,
				Section_Id_,
				Driver_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	Get_Picking_List_Print_Details: function (Picking_list_master_Id_, callback) {
		console.log(Picking_list_master_Id_);
		return db.query(
			"CALL Get_Picking_List_Print_Details(@Picking_list_master_Id_ :=?)",
			[Picking_list_master_Id_],
			callback
		);
	},

	Get_Packing_List_Print_Details: function (Packing_list_master_Id_, callback) {
		console.log(Packing_list_master_Id_);
		return db.query(
			"CALL Get_Packing_List_Print_Details(@Packing_list_master_Id_ :=?)",
			[Packing_list_master_Id_],
			callback
		);
	},
	Send_to_Driver: function (Sender_Dispatch_, callback) {
		console.log(Sender_Dispatch_);
		return db.query(
			"CALL Send_To_Driver(" + "@Dispatch_Details_ :=?," + "@By_User_Id_ :=?)",
			[
				JSON.stringify(Sender_Dispatch_.Dispatch_Details),
				Sender_Dispatch_.By_User,
			],
			callback
		);
	},

	Search_App_Pending_Order: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.By_User_)
		return db.query(
			"CALL Search_App_Pending_Order(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},

	Search_App_Delivered: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.User_Id)
		return db.query(
			"CALL Search_App_Delivered(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},
	Search_App_Done: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.User_Id)
		return db.query(
			"CALL Search_App_Done(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},
	Search_App_Holded: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.By_User_)
		return db.query(
			"CALL Search_App_Holded(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},
	Search_App_Returned: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.By_User_)
		return db.query(
			"CALL Search_App_Returns(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},
	Save_App_Scaned_Items: function (Data_, callback) {
		console.log(Data_.FromDate_, Data_.ToDate_, Data_.By_User_);
		return db.query(
			"CALL Save_App_Scaned_Items(@From_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.By_User_],
			callback
		);
	},
	Search_App_Month_Total: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.By_User_)
		return db.query(
			"CALL Search_App_Month_Total(@From_Date_ :=?,@To_Date_ :=?,@By_User_ :=?)",
			[Data_.FromDate_, Data_.ToDate_, Data_.User_Id],
			callback
		);
	},
	Get_App_Order_Id: function (Data_, callback) {
		//console.log(Data_.FromDate_, Data_.ToDate_,Data_.By_User_)
		return db.query(
			"CALL Get_App_Order_Id(@Invoice_No_ :=?)",
			[Data_.Invoice_No_],
			callback
		);
	},
	Search_to_Driver: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Region_,
		Section_Id_,
		Driver_Id_,
		By_User_,
		Black_Start_,
		Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Region_,
			Section_Id_,
			Driver_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_to_Driver(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Region_ :=?,@Section_Id_ :=?,@Driver_Id_ :=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Region_,
				Section_Id_,
				Driver_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Sender_Hold: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Region_,
		Section_Id_,
		Driver_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,
			Region_,
			Section_Id_,
			Driver_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Sender_Hold(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Region_ :=?,@Section_Id_:=?,@Driver_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Region_,
				Section_Id_,
				Driver_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Sender_Change: function (Sender_Details_, callback) {
		console.log(Sender_Details_);
		return db.query(
			"CALL Sender_Change(" +
				"@Sender_Details_ :=?," +
				"@By_User_Id_ :=?," +
				"@Driver_Id_ :=?," +
				"@Driver_Name_ :=?)",
			[
				JSON.stringify(Sender_Details_.Sender_Details),
				Sender_Details_.By_User,
				Sender_Details_.Driver_Id,
				Sender_Details_.Driver_Name,
			],
			callback
		);
	},

	Status_Change: function (Status_Id_, Order_Master_Id_, User_Id_, callback) {
		return db.query(
			"CALL Status_Change(@Status_Id_ :=?,@Order_Master_Id_ :=?,@User_Id_ :=?)",
			[Status_Id_, Order_Master_Id_, User_Id_],
			callback
		);
	},
	Search_Shipment_Status: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,
		Region_,
		Section_Id_,
		Driver_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Shipment_Status(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Region_ :=?,@Section_Id_ :=?,@Driver_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				Region_,
				Section_Id_,
				Driver_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Despatch_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Driver_Id_,
		Status_Id_,
		By_User_,
		Region_Id_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		if (
			Is_Date_Check_ === "undefined" ||
			Is_Date_Check_ === "" ||
			Is_Date_Check_ === undefined
		)
			Is_Date_Check_ = 0;

		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Despatch_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Driver_Id_:=?,@Status_Id_:=?,@By_User_ :=?,@Region_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Driver_Id_,
				Status_Id_,
				By_User_,
				Region_Id_,
				Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Fullorder_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		By_User_,
		Platform_,
		Source_,
		Status_,
		Region_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Fullorder_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@By_User_ :=?,@Platform_ :=?,@Source_ :=?,@Status_ :=?,@Region_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				By_User_,
				Platform_,
				Source_,
				Status_,
				Region_,
			],
			callback
		);
	},

	Search_Profitproductorder_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Platform_id_,
		Department_Id_,
		item_Id_,
		supplier_Id_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Profitproductorder_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Platform_id_ :=?,@Department_Id_ :=?,@item_Id_ :=?,@supplier_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Platform_id_,
				Department_Id_,
				item_Id_,
				supplier_Id_,
			],
			callback
		);
	},

	Search_Profitproductorder_Done_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Platform_id_,
		Department_Id_,
		item_Id_,
		supplier_Id_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Profitproductorder_Done_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Platform_id_ :=?,@Department_Id_ :=?,@item_Id_ :=?,@supplier_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Platform_id_,
				Department_Id_,
				item_Id_,
				supplier_Id_,
			],
			callback
		);
	},

	Search_Stockdetail_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Platform_id_,
		Department_Id_,
		item_Id_,
		supplier_Id_,
		Black_Start_,
		Black_Stop_,Page_Length_, 
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_Stockdetail_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Platform_id_ :=?,@Department_Id_ :=?,@item_Id_ :=?,@supplier_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Platform_id_,
				Department_Id_,
				item_Id_,
				supplier_Id_,
				Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_BuyerStock_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Platform_id_,
		Department_Id_,
		item_Id_,
		supplier_Id_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_BuyerStock_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Platform_id_ :=?,@Department_Id_ :=?,@item_Id_ :=?,@supplier_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Platform_id_,
				Department_Id_,
				item_Id_,
				supplier_Id_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Search_Pendingorder_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Order_Platform_id_,
		Department_Id_,
		item_Id_,
		supplier_Id_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Order_Platform_id_,
			Department_Id_,
			item_Id_,
			supplier_Id_
		);
		return db.query(
			"CALL Search_Pendingorder_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Order_Platform_id_ :=?,@Department_Id_ :=?,@item_Id_ :=?,@supplier_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Order_Platform_id_,
				Department_Id_,
				item_Id_,
				supplier_Id_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},

	Get_Eway_Bill_Print_Details: function (Picking_list_master_Id_, callback) {
		console.log(Picking_list_master_Id_);
		return db.query(
			"CALL Get_Eway_Bill_Print_Details(@Picking_list_master_Id_ :=?)",
			[Picking_list_master_Id_],
			callback
		);
	},

	Get_Driver_Orders: function (Driver_Id_, callback) {
		console.log(Driver_Id_);
		return db.query(
			"CALL Get_Driver_Orders(@Driver_Id_ :=?)",
			[Driver_Id_],
			callback
		);
	},
	// Get_Driver_Orders:function(Driver_Id_,callback)
	// {

	// return db.query("CALL Get_Driver_Orders(@Driver_Id_ :=?)",[Driver_Id_],callback);
	// } ,
	Save_Scaned_Itmes: function (Dispatch_Data, callback) {
		console.log(
			Dispatch_Data.Dispatch_Details,
			Dispatch_Data.User_Id,
			Dispatch_Data.Data_Length
		);
		return db.query(
			"CALL Save_Scaned_Itmes(" +
				"@Dispatch_Details_ :=?," +
				"@User_Id_ :=?," +
				"@Data_Length_ :=?)",
			[
				Dispatch_Data.Dispatch_Details,
				Dispatch_Data.User_Id,
				Dispatch_Data.Data_Length,
			],
			callback
		);
	},
	View_Purchase_Order: function (Purchase_Master_Id_, callback) {
		return db.query(
			"CALL View_Purchase_Order(@Purchase_Master_Id_ :=?)",
			[Purchase_Master_Id_],
			callback
		);
	},
	Get_App_Dashboard: function (Driver_Id_, callback) {
		console.log(Driver_Id_);
		return db.query(
			"CALL Get_App_Dashboard(@Driver_Id_ :=?)",
			[Driver_Id_],
			callback
		);
	},
	Get_Purchase_Order_Previouslist_wrt_Mobile: function (
		Purchase_Order_Master_Id_,
		Mobile_Number_,
		callback
	) {
		return db.query(
			"CALL Get_Purchase_Order_Previouslist_wrt_Mobile(@Purchase_Order_Master_Id_ :=?,@Mobile_Number_:=?)",
			[Purchase_Order_Master_Id_, Mobile_Number_],
			callback
		);
	},
	Search_RejectedOrder_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Platform_Id_,
		Department_Id_,
		Item_Id_,
		Supplier_Id_,
		callback
	) {
		// console.log(Is_Date_Check_, FromDate_, ToDate_,Search_By_, SearchbyName_,Order_Platform_,Order_Source_,By_User_,Region_,Payment_Mode_)
		return db.query(
			"CALL Search_RejectedOrder_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Platform_Id_ :=?,@Department_Id_ :=?,@Item_Id_ :=?,@Supplier_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Platform_Id_,
				Department_Id_,
				Item_Id_,
				Supplier_Id_,
			],
			callback
		);
	},
	Search_Detailed_Invoice_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Invoice_No_,
		Customer_Name_,
		Region_,
		Order_Platform_,
		Status_Id_,
		By_User_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Invoice_No_,
			Customer_Name_,
			Region_,
			Order_Platform_,
			Status_Id_,
			By_User_
		);
		return db.query(
			"CALL Search_Detailed_Invoice_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Invoice_No_:=?,@Customer_Name_:=?,@Region_ :=?,@Order_Platform_ :=?,@Status_Id_:=?,@By_User_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Invoice_No_,
				Customer_Name_,
				Region_,
				Order_Platform_,
				Status_Id_,
				By_User_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	View_Movement_Report: function (Purchase_Order_Master_Id, callback) {
		return db.query(
			"CALL View_Movement_Report(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id],
			callback
		);
	},
	Search_Graphical_Report: async function (Fromdate_, Todate_) {
		var Purchase_Order_Master_Data = [];
		try {
			Purchase_Order_Master_Data = await new storedProcedure(
				"Search_Graphical_Report",
				[Fromdate_, Todate_]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Purchase_Order_Master_Data,
			},
		};
	},
	Load_InvoiceStatus: function (callback) {
		return db.query("CALL Load_InvoiceStatus()", [], callback);
	},
	Search_InvoiceReport: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Batch_Id_,
		Status_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		return db.query(
			"CALL Search_InvoiceReport(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Batch_Id_ :=?,@Status_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[Is_Date_Check_, FromDate_, ToDate_, Batch_Id_, Status_,Black_Start_,Black_Stop_,Page_Length_],
			callback
		);
	},
	Search_Graphical_Report_Logistics: async function (Fromdate_, Todate_) {
		var Purchase_Order_Master_Data = [];
		try {
			Purchase_Order_Master_Data = await new storedProcedure(
				"Search_Graphical_Report_Logistics",
				[Fromdate_, Todate_]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Purchase_Order_Master_Data,
			},
		};
	},

	// Search_InvoiceReport: function (
	//     Is_Date_Check_,
	//     FromDate_,
	//     ToDate_,
	//     Batch_Id_,
	//     Status_,
	//     callback
	// ) {
	//     return db.query(
	//         "CALL Search_InvoiceReport(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Batch_Id_ :=?,@Status_ :=?)",
	//         [Is_Date_Check_, FromDate_, ToDate_, Batch_Id_, Status_],
	//         callback
	//     );
	// },

	Get_OrderdeatilsBy_Invoicebtnclick: function (
		Purchase_Order_Master_Id_,
		callback
	) {
		console.log(Purchase_Order_Master_Id_);
		return db.query(
			"CALL Get_OrderdeatilsBy_Invoicebtnclick(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},

	// Get_Invoice_Print_Details: function (Picking_list_master_Id_, callback) {
	//     console.log(Picking_list_master_Id_);
	//     return db.query(
	//         "CALL Get_Invoice_Print_Details(@Picking_list_master_Id_ :=?)",
	//         [Picking_list_master_Id_],
	//         callback
	//     );
	// },

	Search_Purchase_Order_Master_For_Picklist: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Search_By_,
		SearchbyName_,
		Order_Platform_,
		Order_Source_,
		By_User_,
		Region_,
		Payment_Mode_,
		Picking_list_master_Id_,
		callback
	) {
		console.log(
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			Search_By_,
			SearchbyName_,
			Order_Platform_,
			Order_Source_,
			By_User_,
			Region_,
			Payment_Mode_,
			Picking_list_master_Id_
		);
		return db.query(
			"CALL Search_Purchase_Order_Master_For_Picklist(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Search_By_ :=?,@SearchbyName_ :=?,@Order_Platform_ :=?,@Order_Source_ :=?,@By_User_ :=?,@Region_ :=?,@Payment_Mode_ :=?,@Picking_list_master_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Search_By_,
				SearchbyName_,
				Order_Platform_,
				Order_Source_,
				By_User_,
				Region_,
				Payment_Mode_,
				Picking_list_master_Id_,
			],
			callback
		);
	},
	Search_SalesandProfit_Report: async function (Fromyear_, Toyear_) {
		var Purchase_Order_Master_Data = [];
		try {
			Purchase_Order_Master_Data = await new storedProcedure(
				"Search_SalesandProfit_Report",
				[Fromyear_, Toyear_]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Purchase_Order_Master_Data,
			},
		};
	},
	Get_Invoice_Print_Details: function (Picking_list_master_Id_, callback) {
		console.log(Picking_list_master_Id_);
		return db.query(
			"CALL Get_Invoice_Print_Details(@Picking_list_master_Id_ :=?)",
			[Picking_list_master_Id_],
			callback
		);
	},
	Search_Graphical_Report_Deliverypercentage: async function (Fromdate_, Todate_) {
        var Purchase_Order_Master_Data = [];
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_Graphical_Report_Deliverypercentage",
                [Fromdate_, Todate_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_DailySales_And_SalesReturn_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Platform_,
		Status_,
		callback
	) {
		return db.query(
			"CALL Search_DailySales_And_SalesReturn_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Platform_ :=?,@Status_ :=?)",
			[Is_Date_Check_, FromDate_, ToDate_, Platform_, Status_],
			callback
		);
	},
	Search_Replacement_with_Invoice: async function (Invoice_Number_, callback) {
		return db.query(
			"CALL Search_Replacement_with_Invoice(@Invoice_Number_ :=?)",
			[Invoice_Number_],
			callback
		);
	},
	Save_Replacement_Master: function (Purchase_Order_Master_, callback) {
		console.log(Purchase_Order_Master_);
		return db.query(
			"CALL Save_Replacement_Master(" +
				"@Purchase_Order_Master_Id_ :=?," +
				//  "@Client_Accounts_Id_ :=?,"+
				//  "@Client_Accounts_Name_ :=?,"+
				//  "@Order_No_ :=?,"+
				//  "@Order_Slno_ :=?,"+
				"@Order_Platform_Id_ :=?," +
				"@Order_Platform_Name_ :=?," +
				"@Order_Date_ :=?," +
				"@Order_Time_ :=?," +
				"@Section_Id_ :=?," +
				"@Section_Name_ :=?," +
				"@Customer_Name_ :=?," +
				"@Mobile_Number_ :=?," +
				"@AlternativeMobile_Number_ :=?," +
				"@Region_Id_ :=?," +
				"@Region_Name_ :=?," +
				"@SubArea_Id_ :=?," +
				"@SubArea_Name_ :=?," +
				"@Building_No_ :=?," +
				"@Avaliable_Time_ :=?," +
				"@Order_Source_Id_ :=?," +
				"@Order_Source_Name_ :=?," +
				"@Description_ :=?," +
				"@TotalAmount_ :=?," +
				"@Total_Discount_ :=?," +
				"@SubTotal_ :=?," +
				"@VAT_ :=?," +
				"@Total_Amount_ :=?," +
				"@Discount_ :=?," +
				"@Shipping_Charge_ :=?," +
				"@Processing_Fee_ :=?," +
				"@Grand_Total_ :=?," +
				"@Total_Paid_ :=?," +
				"@CreditPoint_Used_ :=?," +
				"@Tobe_Collected_ :=?," +
				"@Return_Balance_ :=?," +
				"@Order_Status_ :=?," +
				"@Order_Status_name_ :=?," +
				"@User_Id_ :=?," +
				"@User_Name_ :=?," +
				"@Payment_Mode_Id_ :=?," +
				"@Payment_Mode_Name_ :=?," +
				"@Email_ :=?," +
				"@Order_Company_Id_:=?," +
				"@Order_Company_Name_ :=?," +
				"@Order_Warehouse_Id_:=?," +
				"@Order_Warehouse_Name_ :=?," +
				"@Old_Purchase_Order_Master_Id_ :=?," +
				"@Product_details_ :=?" +
				")",
			[
				Purchase_Order_Master_.Purchase_Order_Master_Id,
				// Purchase_Order_Master_.Client_Accounts_Id,
				// Purchase_Order_Master_.Client_Accounts_Name,
				// Purchase_Order_Master_.Order_Slno,
				// Purchase_Order_Master_.Order_No,
				Purchase_Order_Master_.Order_Platform_Id,
				Purchase_Order_Master_.Order_Platform_Name,
				Purchase_Order_Master_.Order_Date,
				Purchase_Order_Master_.Order_Time,
				Purchase_Order_Master_.Section_Id,
				Purchase_Order_Master_.Section_Name,
				Purchase_Order_Master_.Customer_Name,
				Purchase_Order_Master_.Mobile_Number,
				Purchase_Order_Master_.AlternativeMobile_Number,
				Purchase_Order_Master_.Region_Id,
				Purchase_Order_Master_.Region_Name,
				Purchase_Order_Master_.SubArea_Id,
				Purchase_Order_Master_.SubArea_Name,
				Purchase_Order_Master_.Building_No,
				Purchase_Order_Master_.Avaliable_Time,
				Purchase_Order_Master_.Order_Source_Id,
				Purchase_Order_Master_.Order_Source_Name,
				Purchase_Order_Master_.Description,
				Purchase_Order_Master_.TotalAmount,
				Purchase_Order_Master_.Total_Discount,
				Purchase_Order_Master_.SubTotal,
				Purchase_Order_Master_.VAT,
				Purchase_Order_Master_.Total_Amount,
				Purchase_Order_Master_.Discount,
				Purchase_Order_Master_.Shipping_Charge,
				Purchase_Order_Master_.Processing_Fee,
				Purchase_Order_Master_.Grand_Total,
				Purchase_Order_Master_.Total_Paid,
				Purchase_Order_Master_.CreditPoint_Used,
				Purchase_Order_Master_.Tobe_Collected,
				Purchase_Order_Master_.Return_Balance,
				Purchase_Order_Master_.Order_Status,
				Purchase_Order_Master_.Order_Status_name,
				Purchase_Order_Master_.User_Id,
				Purchase_Order_Master_.User_Name,
				Purchase_Order_Master_.Payment_Mode_Id,
				Purchase_Order_Master_.Payment_Mode_Name,
				Purchase_Order_Master_.Email,
				Purchase_Order_Master_.Order_Company_Id,
				Purchase_Order_Master_.Order_Company_Name,
				Purchase_Order_Master_.Order_Warehouse_Id,
				Purchase_Order_Master_.Order_Warehouse_Name,
				Purchase_Order_Master_.Old_Purchase_Order_Master_Id,
				JSON.stringify(Purchase_Order_Master_.Purchase_Details),
			],
			callback
		);
	},
	Save_Refund_Master: function (Purchase_Order_Master_, callback) {
		console.log(Purchase_Order_Master_);
		return db.query(
			"CALL Save_Refund_Master(" +
				"@Purchase_Order_Master_Id_ :=?," +
				"@Order_Platform_Id_ :=?," +
				"@Order_Platform_Name_ :=?," +
				"@Order_Date_ :=?," +
				"@Order_Time_ :=?," +
				"@Section_Id_ :=?," +
				"@Section_Name_ :=?," +
				"@Customer_Name_ :=?," +
				"@Mobile_Number_ :=?," +
				"@AlternativeMobile_Number_ :=?," +
				"@Region_Id_ :=?," +
				"@Region_Name_ :=?," +
				"@SubArea_Id_ :=?," +
				"@SubArea_Name_ :=?," +
				"@Building_No_ :=?," +
				"@Avaliable_Time_ :=?," +
				"@Order_Source_Id_ :=?," +
				"@Order_Source_Name_ :=?," +
				"@Description_ :=?," +
				"@TotalAmount_ :=?," +
				"@Total_Discount_ :=?," +
				"@SubTotal_ :=?," +
				"@VAT_ :=?," +
				"@Total_Amount_ :=?," +
				"@Discount_ :=?," +
				"@Shipping_Charge_ :=?," +
				"@Processing_Fee_ :=?," +
				"@Grand_Total_ :=?," +
				"@Total_Paid_ :=?," +
				"@CreditPoint_Used_ :=?," +
				"@Tobe_Collected_ :=?," +
				"@Return_Balance_ :=?," +
				"@Order_Status_ :=?," +
				"@Order_Status_name_ :=?," +
				"@User_Id_ :=?," +
				"@User_Name_ :=?," +
				"@Payment_Mode_Id_ :=?," +
				"@Payment_Mode_Name_ :=?," +
				"@Email_ :=?," +
				"@Order_Company_Id_:=?," +
				"@Order_Company_Name_ :=?," +
				"@Order_Warehouse_Id_:=?," +
				"@Order_Warehouse_Name_ :=?," +
				"@Product_details_ :=?" +
				")",
			[
				Purchase_Order_Master_.Purchase_Order_Master_Id,
				Purchase_Order_Master_.Order_Platform_Id,
				Purchase_Order_Master_.Order_Platform_Name,
				Purchase_Order_Master_.Order_Date,
				Purchase_Order_Master_.Order_Time,
				Purchase_Order_Master_.Section_Id,
				Purchase_Order_Master_.Section_Name,
				Purchase_Order_Master_.Customer_Name,
				Purchase_Order_Master_.Mobile_Number,
				Purchase_Order_Master_.AlternativeMobile_Number,
				Purchase_Order_Master_.Region_Id,
				Purchase_Order_Master_.Region_Name,
				Purchase_Order_Master_.SubArea_Id,
				Purchase_Order_Master_.SubArea_Name,
				Purchase_Order_Master_.Building_No,
				Purchase_Order_Master_.Avaliable_Time,
				Purchase_Order_Master_.Order_Source_Id,
				Purchase_Order_Master_.Order_Source_Name,
				Purchase_Order_Master_.Description,
				Purchase_Order_Master_.TotalAmount,
				Purchase_Order_Master_.Total_Discount,
				Purchase_Order_Master_.SubTotal,
				Purchase_Order_Master_.VAT,
				Purchase_Order_Master_.Total_Amount,
				Purchase_Order_Master_.Discount,
				Purchase_Order_Master_.Shipping_Charge,
				Purchase_Order_Master_.Processing_Fee,
				Purchase_Order_Master_.Grand_Total,
				Purchase_Order_Master_.Total_Paid,
				Purchase_Order_Master_.CreditPoint_Used,
				Purchase_Order_Master_.Tobe_Collected,
				Purchase_Order_Master_.Return_Balance,
				Purchase_Order_Master_.Order_Status,
				Purchase_Order_Master_.Order_Status_name,
				Purchase_Order_Master_.User_Id,
				Purchase_Order_Master_.User_Name,
				Purchase_Order_Master_.Payment_Mode_Id,
				Purchase_Order_Master_.Payment_Mode_Name,
				Purchase_Order_Master_.Email,
				Purchase_Order_Master_.Order_Company_Id,
				Purchase_Order_Master_.Order_Company_Name,
				Purchase_Order_Master_.Order_Warehouse_Id,
				Purchase_Order_Master_.Order_Warehouse_Name,
				JSON.stringify(Purchase_Order_Master_.Purchase_Details),
			],
			callback
		);
	},
	Save_Service_Master: function (Purchase_Service_, callback) {
		console.log(Purchase_Service_);
		return db.query(
			"CALL Save_Service_Master(" +
				"@Purchase_Order_Master_Id_ :=?," +
				"@Service_Date_ :=?," +
				"@Order_Date_ :=?," +
				"@Product_details_ :=?,"+
				"@User_Id_)",
			[
				Purchase_Service_.Purchase_Order_Master_Id,
				Purchase_Service_.Service_Date,
				Purchase_Service_.Order_Date,
				JSON.stringify(Purchase_Service_.Purchase_Details),
				Purchase_Service_.User_Id
			],
			callback
		);
	},
	Search_Replacement: function (
		Look_In_Date_,
		Search_FromDate_,
		Search_ToDate_,
		Search_By_,
		callback
	) {
		if (Search_By_ === undefined || Search_By_ === "undefined") Search_By_ = "";
		console.log(Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_);
		return db.query(
			"CALL Search_Replacement(@Look_In_Date_ :=?,@Search_FromDate_ :=?,@Search_ToDate_ :=?,@Search_By_:=?)",
			[Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_],
			callback
		);
	},
	Search_Refund: function (
		Look_In_Date_,
		Search_FromDate_,
		Search_ToDate_,
		Search_By_,
		callback
	) {
		if (Search_By_ === undefined || Search_By_ === "undefined") Search_By_ = "";
		console.log(Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_);
		return db.query(
			"CALL Search_Refund(@Look_In_Date_ :=?,@Search_FromDate_ :=?,@Search_ToDate_ :=?,@Search_By_:=?)",
			[Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_],
			callback
		);
	},
	Search_Service: function (
		Look_In_Date_,
		Search_FromDate_,
		Search_ToDate_,
		Search_By_,
		callback
	) {
		if (Search_By_ === undefined || Search_By_ === "undefined") Search_By_ = "";
		console.log(Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_);
		return db.query(
			"CALL Search_Service(@Look_In_Date_ :=?,@Search_FromDate_ :=?,@Search_ToDate_ :=?,@Search_By_:=?)",
			[Look_In_Date_, Search_FromDate_, Search_ToDate_, Search_By_],
			callback
		);
	},
	Get_Old_Order_Details: function (Old_Purchase_Details_Id_, callback) {
		console.log(Old_Purchase_Details_Id_, 1);
		return db.query(
			"CALL Get_Old_Order_Details(@Old_Purchase_Details_Id_ :=?)",
			[Old_Purchase_Details_Id_],
			callback
		);
	},
	// Reset_Replacement: function (
	// 	Purchase_Order_Master_Id_,
	// 	Replacement_Master_Id_,
	// 	Old_Purchase_Master_Id_,
	// 	callback
	// ) {
	// 	console.log(Purchase_Order_Master_Id_, Replacement_Master_Id_,Old_Purchase_Master_Id_);
	// 	return db.query(
	// 		"CALL Reset_Replacement(@Purchase_Order_Master_Id_ :=?,@Replacement_Master_Id_:=?,@Old_Purchase_Master_Id_ :=?)",
	// 		[Purchase_Order_Master_Id_,Replacement_Master_Id_,Old_Purchase_Master_Id_],
	// 		callback
	// 	);
	// },
	Delete_Replacement: function (Purchase_Order_Master_Id_, callback) {
		return db.query(
			"CALL Delete_Replacement(@Purchase_Order_Master_Id_ :=?)",
			[Purchase_Order_Master_Id_],
			callback
		);
	},
	Reset_Service: function (
		Purchase_Order_Master_Id_,
		Purchase_Details_Id_,
		callback
	) {
		console.log(Purchase_Order_Master_Id_);
		return db.query(
			"CALL Reset_Service(@Purchase_Order_Master_Id_ :=?,@Purchase_Details_Id_ :=?)",
			[Purchase_Order_Master_Id_, Purchase_Details_Id_],
			callback
		);
	},
	Get_Purchase_Order_Master_for_Service: function (
		Purchase_Order_Master_Id_,
		Order_Company_Id_,
		Order_Warehouse_Id_,
		callback
	) {
		console.log(Purchase_Order_Master_Id_, 1);
		return db.query(
			"CALL Get_Purchase_Order_Master_for_Service(@Purchase_Order_Master_Id_ :=?,@Order_Company_Id_:=?,@Order_Warehouse_Id_:=?)",
			[Purchase_Order_Master_Id_, Order_Company_Id_, Order_Warehouse_Id_],
			callback
		);
	},
	Get_Purchase_Order_Master_for_Refund: function (
		Purchase_Order_Master_Id_,
		Order_Company_Id_,
		Order_Warehouse_Id_,
		callback
	) {
		console.log(Purchase_Order_Master_Id_, 1);
		return db.query(
			"CALL Get_Purchase_Order_Master_for_Refund(@Purchase_Order_Master_Id_ :=?,@Order_Company_Id_:=?,@Order_Warehouse_Id_:=?)",
			[Purchase_Order_Master_Id_, Order_Company_Id_, Order_Warehouse_Id_],
			callback
		);
	},
	Reset_Refund: function (
		Purchase_Order_Master_Id_,
		Purchase_Details_Id_,
		callback
	) {
		console.log(2);
		return db.query(
			"CALL Reset_Refund(@Purchase_Order_Master_Id_ :=?,@Purchase_Details_Id_ :=?)",
			[Purchase_Order_Master_Id_, Purchase_Details_Id_],
			callback
		);
	},
	Search_Graphical_Report_Catgorywise: async function (Fromdate_, Todate_) {
        var Purchase_Order_Master_Data = [];
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_Graphical_Report_Catgorywise",
                [Fromdate_, Todate_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_Graphical_Report_Orderfrom: async function (Fromdate_, Todate_) {
        var Purchase_Order_Master_Data = [];
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_Graphical_Report_Orderfrom",
                [Fromdate_, Todate_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_GraphicalReport_Regionwise: async function (Fromdate_, Todate_,Status_,Region_) {
        var Purchase_Order_Master_Data = [];
        console.log(Fromdate_, Todate_,Status_,Region_)
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_GraphicalReport_Regionwise",
                [Fromdate_,Todate_,Status_,Region_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_Graphical_Report_Regionwisepiechart: async function (Fromdate_, Todate_,Status_,Region_) {
        var Purchase_Order_Master_Data = [];
        console.log(Fromdate_, Todate_,Status_,Region_)
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_Graphical_Report_Regionwisepiechart",
                [Fromdate_,Todate_,Status_,Region_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_Customer_Cancel_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Customer_Name_,
		Black_Start_,
		Black_Stop_,
		Page_Length_,
		callback
	) {
		return db.query(
			"CALL Search_Customer_Cancel_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Customer_Name_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Customer_Name_,
				Black_Start_,
				Black_Stop_,
				Page_Length_,
			],
			callback
		);
	},
	Search_Warrenty_Stock_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		item_Id_,
		Black_Start_,
		Black_Stop_,
		Page_Length_,
		callback
	) {
		return db.query(
			"CALL Search_Warrenty_Stock_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@item_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				item_Id_,
				Black_Start_,
				Black_Stop_,
				Page_Length_,
			],
			callback
		);
	},
	Search_Warrenty_Product_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		item_Id_,
		callback
	) {
		return db.query(
			"CALL Search_Warrenty_Product_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@item_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				item_Id_
			],
			callback
		);
	},
	Search_Driver_Analysis_Report: async function (Fromdate_, Todate_,Status_,Driver_) {
        var Purchase_Order_Master_Data = [];
        // console.log(Fromdate_, Todate_,Status_,Driver_)
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Search_Driver_Analysis_Report",
                [Fromdate_,Todate_,Status_,Driver_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	Search_Sales_and_Sales_Return_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Customer_Name_,
		Invoice_Number_
		,Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		if(Invoice_Number_ === undefined || Invoice_Number_ === "undefined")
			Invoice_Number_ = '';
		return db.query(
			"CALL Search_Sales_and_Sales_Return_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Customer_Name_ :=?,@Invoice_Number_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Customer_Name_,
				Invoice_Number_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	Search_Buyer_Inactive_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		Buyer_id_,
		item_Id_,
		callback
	) {
	
		return db.query(
			"CALL Search_Buyer_Inactive_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@Buyer_id_ :=?,@item_Id_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				Buyer_id_,
				item_Id_
			],
			callback
		);
	},
	Search_Complaint_Product_Report: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		item_Id_,
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(Is_Date_Check_,
			FromDate_,
			ToDate_,
			item_Id_,
			Black_Start_,Black_Stop_,Page_Length_)
		return db.query(
			"CALL Search_Complaint_Product_Report(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@item_Id_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				item_Id_
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
	Search_Dashboard_1: function (
		Search_By_,
		callback
	) {
		if (Search_By_ === undefined || Search_By_ === "undefined")
			Search_By_ =''
		return db.query(
			"CALL Search_Dashboard_1(@Search_By_ :=?)",
			[
				Search_By_,
			],
			callback
		);
	},
	Search_Dashboard_2: function (
		Search_By_,
		callback
	) {
		return db.query(
			"CALL Search_Dashboard_2(@Search_By_ :=?)",
			[
				Search_By_,
			],
			callback
		);
	},
	Search_Dashboard_3: function (
		Search_By_,
		callback
	) {
		return db.query(
			"CALL Search_Dashboard_3(@Search_By_ :=?)",
			[
				Search_By_,
			],
			callback
		);
	},
	Search_View_All_Product: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		supplier_id_,
		brand_id_,
		status_id_,
		dept_id_,
		Catalogue_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(Is_Date_Check_,
			FromDate_,
			ToDate_,
			supplier_id_,
			brand_id_,
			status_id_,
			dept_id_,
			Catalogue_,
			Black_Start_,Black_Stop_,Page_Length_)
		if (Catalogue_ === undefined || Catalogue_=== "undefined")
			Catalogue_ = ''
		return db.query(
			"CALL Search_View_All_Product(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@supplier_id_ :=?,@brand_id_ :=?,@status_id_ :=?,@dept_id_ :=?,@Catalogue_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				supplier_id_,
				brand_id_,
				status_id_,
				dept_id_,
				Catalogue_,
				Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},




	Search_View_All_Catalog: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		supplier_id_,
		brand_id_,
		status_id_,
		dept_id_,
		Catalogue_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(Is_Date_Check_,
			FromDate_,
			ToDate_,
			supplier_id_,
			brand_id_,
			status_id_,
			dept_id_,
			Catalogue_,
			Black_Start_,Black_Stop_,Page_Length_)
		if (Catalogue_ === undefined || Catalogue_=== "undefined")
			Catalogue_ = ''
		return db.query(
			"CALL Search_View_All_Catalog(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@supplier_id_ :=?,@brand_id_ :=?,@status_id_ :=?,@dept_id_ :=?,@Catalogue_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				supplier_id_,
				brand_id_,
				status_id_,
				dept_id_,
				Catalogue_,
				Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},




	// Search_Dashboard_4: function (
	// 	Search_By_,
	// 	callback
	// ) {
	// 	return db.query(
	// 		"CALL Search_Dashboard_4(@Search_By_ :=?)",
	// 		[
	// 			Search_By_,
	// 		],
	// 		callback
	// 	);
	// },
	// Search_Dashboard_4: async function (Fromdate_, Todate_,Status_,Region_) {
    //     var Purchase_Order_Master_Data = [];
    //     console.log(Fromdate_, Todate_,Status_,Region_)
    //     try {
    //         Purchase_Order_Master_Data = await new storedProcedure(
    //             "Search_Dashboard_4",
    //             [Fromdate_,Todate_,Status_,Region_]
    //         ).result();
    //     } catch (e) {}

    //     return {
    //         returnvalue: {
    //             Purchase_Order_Master_Data,
    //         },
    //     };
    // },
	Search_Dashboard_4: function (
		Fromdate_, Todate_,Region_,Team_Member_Selection_,
		callback
	) {
		
		return db.query(
			"CALL Search_Dashboard_4(@Fromdate_ :=?,@Todate_ :=?,@Region_ :=?,@Team_Member_Selection_ :=?)",
			[
				Fromdate_, Todate_,Region_,Team_Member_Selection_,
			],
			callback
		);
	},
	
	Dashboard_SalesandProfit_Report: async function (Fromdate_, Todate_,Region_,Team_Member_Selection_) {
        var Purchase_Order_Master_Data = [];
        console.log(Fromdate_, Todate_,Status_,Region_)
        try {
            Purchase_Order_Master_Data = await new storedProcedure(
                "Dashboard_SalesandProfit_Report",
                [Fromdate_,Todate_,Region_,Team_Member_Selection_]
            ).result();
        } catch (e) {}

        return {
            returnvalue: {
                Purchase_Order_Master_Data,
            },
        };
    },
	// Dashboard_Percentage: async function (Fromdate_, Todate_,Status_,Region_) {
    //     var Purchase_Order_Master_Data = [];
    //     console.log(Fromdate_, Todate_,Status_,Region_)
    //     try {
    //         Purchase_Order_Master_Data = await new storedProcedure(
    //             "Dashboard_Percentage",
    //             [Fromdate_,Todate_,Status_,Region_]
    //         ).result();
	// 		console.log(Purchase_Order_Master_Data)
    //     } catch (e) {}

    //     return {
    //         returnvalue: {
    //             Purchase_Order_Master_Data,
    //         },
    //     };
    // },
	Dashboard_Percentage: function (
		Fromdate_,
		ToDate_,
		Region_,
		Team_Member_Selection_,
		callback
	) {
		console.log(Fromdate_,
		ToDate_,
		Region_,
		Team_Member_Selection_
	)
		return db.query(
			"CALL Dashboard_Percentage(@Fromdate_ :=?,@ToDate_ :=?,@Region_ :=?,@Team_Member_Selection_ :=?)",
			[
				Fromdate_,
				ToDate_,
				Region_,
				Team_Member_Selection_,
			
			],
			callback
		);
	},
	Save_Materials: function (Purchase_Order_Master_, callback) {
        console.log(Purchase_Order_Master_);
        return db.query(
            "CALL Save_Materials(" +
                "@Bundle_Product_Master_Id_ :=?," +
                "@User_Id_ :=?," +
                "@Order_Company_Id_:=?," +
                "@Order_Warehouse_Id_:=?," +
                "@Client_Accounts_Id_ :=?," +
                "@Client_Accounts_Name_ :=?," +
                "@Bundle_Details_ :=?," +
                "@Product_Materials_ :=?" +
                ")",
            [
                Purchase_Order_Master_.Bundle_Product_Master_Id,
                Purchase_Order_Master_.User_Id,
                Purchase_Order_Master_.Order_Company_Id,
                Purchase_Order_Master_.Order_Warehouse_Id,
                Purchase_Order_Master_.Client_Accounts_Id,
                Purchase_Order_Master_.Client_Accounts_Name,
                JSON.stringify(Purchase_Order_Master_.Bundle_Details),
                JSON.stringify(Purchase_Order_Master_.Bundle_Details_new),
                // JSON.stringify(Purchase_Order_Master_.Bundle_Details_new),

            ],
            callback
        );
        
    },
	
	Search_Bundle_Product_Master: function (
		Department_Id_,
		Category_Id_,
		Product_Name_,
		Titile_,
		Black_Start_,Black_Stop_,Page_Length_,
		callback
	) {
		console.log(
			Department_Id_,
			Category_Id_,
			Product_Name_,
			Titile_,
			Black_Start_,
			Black_Stop_,
			Page_Length_
		);
		if(Product_Name_ === undefined || Product_Name_ === "undefined")
			Product_Name_ = ''
		if(Titile_ === undefined || Titile_ === "undefined")
			Titile_ = ''
		return db.query(
			"CALL Search_Bundle_Product_Master(@Department_Id_ :=?,@Category_Id_ :=?,@Product_Name_ :=?,@Titile_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
			Department_Id_,
			Category_Id_,
			Product_Name_,
			Titile_,
			Black_Start_,
			Black_Stop_,
			Page_Length_
			],
			callback
		);
	},
	Get_Bundle_Product_Master_Details: function (
		Bundle_Product_Master_Id_,
		Order_Company_Id_,
		Order_Warehouse_Id_,
		callback
	) {
		console.log(Bundle_Product_Master_Id_, 1);
		return db.query(
			"CALL Get_Bundle_Product_Master_Details(@Bundle_Product_Master_Id_ :=?,@Order_Company_Id_:=?,@Order_Warehouse_Id_:=?)",
			[Bundle_Product_Master_Id_, Order_Company_Id_, Order_Warehouse_Id_],
			callback
		);
	},
	Activity_Report: function (
		Look_In_Date_,
		Search_FromDate_,
		Search_ToDate_,
		User_Id_,
		callback
	) {
		console.log(Look_In_Date_, Search_FromDate_, Search_ToDate_, User_Id_);
		return db.query(
			"CALL Activity_Report(@Look_In_Date_ :=?,@Search_FromDate_ :=?,@Search_ToDate_ :=?,@User_Id_:=?)",
			[Look_In_Date_, Search_FromDate_, Search_ToDate_, User_Id_],
			callback
		);
	},
	View_All_Listed_Products: function (
		Titile_,
		Product_Name_,
		supplier_id_,
		Dept_id_,
		Cat_Id_,
		callback
	) {
		console.log(Titile_,
			Product_Name_,
			supplier_id_,
			Dept_id_,
			Cat_Id_)
		if(Titile_=== undefined || Titile_=== "undefined" )
			Titile_ =''
		if(Product_Name_=== undefined || Product_Name_=== "undefined" )
			Product_Name_ =''
		
		return db.query(
			"CALL View_All_Listed_Products(@Titile_ :=?,@Product_Name_ :=?,@supplier_id_ :=?,@Dept_id_ :=?,@Cat_Id_ :=?)",
			[
				Titile_,
				Product_Name_,
				supplier_id_,
				Dept_id_,
				Cat_Id_
			],
			callback
		);
	},
	Get_Customer_Details: function (Order_Id_, callback) {
		return db.query(
			"CALL Get_Customer_Details(@Order_Id_ :=?)",
			[Order_Id_],
			callback
		);
	},
	Search_Payment_Order: function (
		Is_Date_Check_,
		FromDate_,
		ToDate_,
		SearchbyName_,	
		Black_Start_,Black_Stop_,Page_Length_, 
		callback
	) {
		console.log(Is_Date_Check_,
			FromDate_,
			ToDate_,
			SearchbyName_,	
			Black_Start_,Black_Stop_,Page_Length_)
		if(SearchbyName_ === undefined || SearchbyName_ === "undefined")
			SearchbyName_ =''
		return db.query(
			"CALL Search_Payment_Order(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@SearchbyName_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
			[
				Is_Date_Check_,
				FromDate_,
				ToDate_,
				SearchbyName_,
				,Black_Start_,Black_Stop_,Page_Length_
			],
			callback
		);
	},
// 	Verify: function (Docs_Data, callback) {
// 		// console.log(Docs_Data);
// 		// var Document_value_ = 0;
// 		let Docs_ = Docs_Data.Docs_D;

// 		// if (Docs_ != undefined && Docs_ != "" && Docs_ != null) Document_value_ = 1;
// 		// console.log(Docs_);
// 		return db.query(
// 			"CALL Verify(@Docs_:=? )",
// 			[Docs_],
// 			callback
// 		);
// 	},
Verify: async function (Order_Payment_Verification_) {
	return new Promise(async (rs, rej) => {
		const pool = db.promise();
		let result1
		var connection = await pool.getConnection();
		await connection.beginTransaction();

		try {
			const result1 = await new storedProcedure(
				"Verify",
				[
					Order_Payment_Verification_.Purchase_Order_Master_Id,
					Order_Payment_Verification_.Verification_Status,
					Order_Payment_Verification_.Verification_Staus_Name,
					Order_Payment_Verification_.Reference_Number,
					Order_Payment_Verification_.Payment_Attachment,
					Order_Payment_Verification_.Verified_By,
					Order_Payment_Verification_.Verified_By_Name,
				],
				connection
			).result();
			await connection.commit();
			connection.release();
			rs(result1);
		} catch (err) {
			await connection.rollback();
			rej(err);
		}
	});
},


Search_View_All_Supplier_Product: function (
	Is_Date_Check_,
	FromDate_,
	ToDate_,
	supplier_id_,
	brand_id_,
	status_id_,
	dept_id_,
	Catalogue_,
	Black_Start_,Black_Stop_,Page_Length_,
	callback
) {
	console.log(Is_Date_Check_,
		FromDate_,
		ToDate_,
		supplier_id_,
		brand_id_,
		status_id_,
		dept_id_,
		Catalogue_,
		Black_Start_,Black_Stop_,Page_Length_)
	if (Catalogue_ === undefined || Catalogue_=== "undefined")
		Catalogue_ = ''
	return db.query(
		"CALL Search_View_All_Supplier_Product(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@supplier_id_ :=?,@brand_id_ :=?,@status_id_ :=?,@dept_id_ :=?,@Catalogue_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
		[
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			supplier_id_,
			brand_id_,
			status_id_,
			dept_id_,
			Catalogue_,
			Black_Start_,Black_Stop_,Page_Length_
		],
		callback
	);
},



Search_View_All_transfer_stock: function (
	Is_Date_Check_,
	FromDate_,
	ToDate_,
	supplier_id_,
	item_id_,
	brand_id_,
	status_id_,
	dept_id_,
	Catalogue_,
	Black_Start_,Black_Stop_,Page_Length_,
	callback
) {
	console.log(Is_Date_Check_,
		FromDate_,
		ToDate_,
		supplier_id_,
		item_id_,
		brand_id_,
		status_id_,
		dept_id_,
		Catalogue_,
		Black_Start_,Black_Stop_,Page_Length_)
	if (Catalogue_ === undefined || Catalogue_=== "undefined")
		Catalogue_ = ''
	return db.query(
		"CALL Search_View_All_transfer_stock(@Is_Date_Check_ :=?,@FromDate_ :=?,@ToDate_ :=?,@supplier_id_ :=?,@item_id_ :=?,@brand_id_ :=?,@status_id_ :=?,@dept_id_ :=?,@Catalogue_ :=?,@Black_Start_ :=?,@Black_Stop_ :=?,@Page_Length_ :=?)",
		[
			Is_Date_Check_,
			FromDate_,
			ToDate_,
			supplier_id_,
			item_id_,
			brand_id_,
			status_id_,
			dept_id_,
			Catalogue_,
			Black_Start_,Black_Stop_,Page_Length_
		],
		callback
	);
},



Search_View_All_Bundle_Details: function (
	
	supplier_id_,
	item_Id_,
	// Stock_Id_,
	
	callback
) {
	console.log(
		
		supplier_id_,
		item_Id_,
		// Stock_Id_,
		)
	if (supplier_id_ === undefined || supplier_id_=== "undefined")
	supplier_id_ = ''
	return db.query(
		"CALL Search_View_All_Bundle_Details(@supplier_id_ :=?,@item_Id_ :=?)",
		[
			
			supplier_id_,
			item_Id_,
			// Stock_Id_,
			
		],
		callback
	);
},

Get_Review_Details_Edit: function(callback) {
    console.log("Get_Review_Details_Edit"); // Output a message for debugging purposes
    return db.query("CALL Get_Review_Details_Edit()", [], callback);
}




};


module.exports = Purchase_Order_Master;
