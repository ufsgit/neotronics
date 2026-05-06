var express = require("express");
var router = express.Router();
var Payment_Voucher = require("../models/Payment_Voucher");
const upload = require("../helpers/multer-helper");
// router.post('/Save_Payment_Voucher/',function(req,res,next)
//   {
//   try
//   {
//   Payment_Voucher.Save_Payment_Voucher(req.body, function (err, rows)
//   {
//   if (err)
//   {
//   res.json(err);
//   }
//   else
//   {
//   res.json(rows);
//   }
//   });
//   }
//   catch (e)
//   {
//   }
//   finally
//   {
//   }
//   });

router.post("/Save_Payment_Voucher/", async function (req, res, next) {
	try {
		const resp = await Payment_Voucher.Save_Payment_Voucher(req.body);
		return res.send(resp);
	} catch (e) {
		return res.send(e);
	}
});
router.get(
	"/Search_Payment_Voucher/:From_Date_?/:To_Date_?/:To_Account_Id_?/:Voucher_No_?/:Is_Date_Check_?/:CurrencyId?/:Login_User_?/:User_Type?",
	function (req, res, next) {
		try {
			console.log(req.params);
			Payment_Voucher.Search_Payment_Voucher(
				req.params.From_Date_,
				req.params.To_Date_,
				req.params.To_Account_Id_,
				req.params.Voucher_No_,
				req.params.Is_Date_Check_,
				req.params.CurrencyId_,
				req.params.Login_User_,
				req.params.User_Type,
				function (err, rows) {
					if (err) {
						console.log(err);
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
			console.log(e);
		} finally {
		}
	}
);
router.get(
	"/SelectSettledBills/:Account_Party_Id_?",
	function (req, res, next) {
		try {
			Payment_Voucher.SelectSettledBills(
				req.params.Account_Party_Id_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get(
	"/Get_Purchase_Payment/:Payment_Voucher_Id_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Get_Purchase_Payment(
				req.params.Payment_Voucher_Id_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get(
	"/Delete_Payment_Voucher/:Payment_Voucher_Id_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Delete_Payment_Voucher(
				req.params.Payment_Voucher_Id_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get("/Get_Payment_Mode/", function (req, res, next) {
	try {
		Payment_Voucher.Get_Payment_Mode(function (err, rows) {
			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} catch (e) {
	} finally {
	}
});

router.get(
	"/Search_Petty_Cash/:From_Date_?/:To_Date_?/:Branch_?/:Type_?/:Is_Date_Check_?/:Login_User_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Search_Petty_Cash(
				req.params.From_Date_,
				req.params.To_Date_,
				req.params.Branch_,
				req.params.Type_,
				req.params.Is_Date_Check_,
				req.params.Login_User_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get("/Delete_Petty_Cash/:Petty_Cash_Id_?", function (req, res, next) {
	try {
		Payment_Voucher.Delete_Petty_Cash(
			req.params.Petty_Cash_Id_,
			function (err, rows) {
				if (err) {
					res.json(err);
				} else {
					res.json(rows);
				}
			}
		);
	} catch (e) {
	} finally {
	}
});
router.get(
	"/Search_Petty_Cash_Report/:From_Date_?/:To_Date_?/:Branch_?/:Type_?/:Is_Date_Check_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Search_Petty_Cash_Report(
				req.params.From_Date_,
				req.params.To_Date_,
				req.params.Branch_,
				req.params.Type_,
				req.params.Is_Date_Check_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get(
	"/Search_Waste_Management/:From_Date_?/:To_Date_?/:Branch_?/:Item_?/:Is_Date_Check_?/:Login_User_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Search_Waste_Management(
				req.params.From_Date_,
				req.params.To_Date_,
				req.params.Branch_,
				req.params.Item_,
				req.params.Is_Date_Check_,req.params.Login_User_,
				function (err, rows) {
					if (err) {
						console.log(err);
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
			console.log(e);
		} finally {
		}
	}
);
router.get(
	"/Delete_Waste_Management/:Petty_Cash_Id_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Delete_Waste_Management(
				req.params.Petty_Cash_Id_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
router.get(
	"/Search_Waste_Management_Report/:From_Date_?/:To_Date_?/:Branch_?/:Item_?/:Is_Date_Check_?",
	function (req, res, next) {
		try {
			Payment_Voucher.Search_Waste_Management_Report(
				req.params.From_Date_,
				req.params.To_Date_,
				req.params.Branch_,
				req.params.Item_,
				req.params.Is_Date_Check_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);

// router.post("/Save_Waste_Management/", function (req, res, next) {
// 	try {
// 		Payment_Voucher.Save_Waste_Management(req.body, function (err, rows) {
// 			if (err) {
// 				res.json(err);
// 			} else {
// 				res.json(rows);
// 			}
// 		});
// 	} catch (e) {
// 	} finally {
// 	}
// });
 

router.post("/Save_Waste_Management", upload.array("myFile"), (req, res, next) => {
    try {

        const file = req.files;
		// console.log('file',req.files);
    
        var Doc_Image;
        var Photo_ = [];

        if (!file) {
        } else {
            for (var i = 0; i < req.body.Document_File_Array; i++) {
                if (i == req.body.ImageFile_Doc) Doc_Image = file[i].filename;
            }
        }

        // var Photo_json = JSON.stringify(Photo_);

        var Waste_Management1;
        
        console.log('req.body:', req.body);

        Waste_Management1 = {
            "Waste_Management_Id": req.body.Waste_Management_Id,
            "User_Id": req.body.User_Id,
            "Date": req.body.Date,
            "Description": req.body.Description,
            "Item_Quantity": req.body.Item_Quantity,
            "Item_Id": req.body.Item_Id,
			"Item_Name": req.body.Item_Name,
            "Branch_Id": req.body.Branch_Id,
            "Branch_Name": req.body.Branch_Name,
            "Particular": req.body.Particular,
            "Doc_Photo": req.body.Doc_Photo,
            "File_Name_1": req.body.Doc_Photo,
			"File_Name": req.body.File_Name,
			"Item_Code":req.body.Item_Code,
			"File_Path":req.body.File_Path

			 
        };
 
       
        var jsondata1 = JSON.stringify(Waste_Management1);
        var Document_Data = {
            Data_Document: jsondata1,
        };
		Payment_Voucher.Save_Waste_Management(Document_Data, function (err, rows) {
            if (err) {
                console.log(err);
       console.log(e);
                return 1;
            } else {
                console.log(rows);
                return res.json(rows);
            }
        });
    } catch (err) {
        console.log(err);
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    } finally {
    }
});



router.get('/Get_Petty_Cash_details_App/:Petty_Cash_Id_?',function(req,res,next)
    { 
    try 
    {
		Payment_Voucher.Get_Petty_Cash_details_App(req.params.Petty_Cash_Id_, function (err, rows) 
    {
    if (err) 
    {
    res.json(err);
    }
    else 
    {
    res.json(rows);
    }
    });
    }
    catch (e) 
    {
    }
    finally 
    {
    }
    });


router.get('/Get_Petty_Cash_details/:Petty_Cash_Id_?',function(req,res,next)
    { 
    try 
    {
		Payment_Voucher.Get_Petty_Cash_details(req.params.Petty_Cash_Id_, function (err, rows) 
    {
    if (err) 
    {
    res.json(err);
    }
    else 
    {
    res.json(rows);
    }
    });
    }
    catch (e) 
    {
    }
    finally 
    {
    }
    });


	/****Added on 23-02-2024 */

    router.get('/Get_Item_Name_Get_With_Code_Waste_Management/:Item_Code_?',function(req,res,next)
  { 
    try 
    {
      Payment_Voucher.Get_Item_Name_Get_With_Code_Waste_Management(req.params.Item_Code_, function (err, rows) 
      {
        if (err) 
        {
          res.json(err);
		  console.log(err);
        }
        else 
        {
          res.json(rows);
		  console.log(rows);
        }
      });
    }
    catch (e) {
		console.log(e);
	}
    finally {}
  });

 router.get('/Get_Item_Name_Get_With_Code_Waste_Management_App/:Item_Code_?',function(req,res,next)
{ 
  try 
  {
	Payment_Voucher.Get_Item_Name_Get_With_Code_Waste_Management_App(req.params.Item_Code_,function (err, rows) 
	{
	  if (err) 
	  {
		res.json(err);
		console.log(err);
	  }
	  else 
	  {
		res.json(rows);
		console.log(rows);
	  }
	});
  }
  catch (e) {
	  console.log(e);
  }
  finally {}
});

  	/****Added on 24-02-2024 */

	//   router.post('/Save_Petty_Cash_App/',async function(req,res,next)
	//   { 
	//   try 
	//   {
	// 	console.log(req.query)
	//   const resp=await Payment_Voucher.Save_Petty_Cash_App(req.query);
	//   console.log(resp)
	//   return res.send(resp);
	//   }
	//   catch(e){
	// 	console.log(e)
	//   return res.send(e);
	//   }
	// });

	router.post('/Save_Petty_Cash_App/',async function(req,res,next)
        { 
        try 
        {
			console.log('req.query: ', req.query);
        const resp=await Payment_Voucher.Save_Petty_Cash_App(req.query);
        console.log(resp)
        return res.send(resp);
        }
        catch(e){
          console.log(e)
        return res.send(e);
        }
      });


	  router.post("/Save_Petty_Cash", upload.array("myFile"), (req, res, next) => {
        try {
            const file = req.files;
    
            var Doc_Image;
            var Photo_ = [];
    
            if (!file) {
            } else {
                for (var i = 0; i < req.body.Document_File_Array; i++) {
                    if (i == req.body.ImageFile_Doc) Doc_Image = file[i].filename;
                }
            }
    
            // var Photo_json = JSON.stringify(Photo_);
    
            var Petty;
    
			console.log('req.body:', req.body);

			// Waste_Management1 = {
			// 	"Waste_Management_Id": req.body.Waste_Management_Id,
			// 	"User_Id": req.body.User_Id,
			// 	"Date": req.body.Date,
			// 	"Description": req.body.Description,
			// 	"Item_Quantity": req.body.Item_Quantity,
			// 	"Item_Id": req.body.Item_Id,
			// 	"Item_Name": req.body.Item_Name,
			// 	"Branch_Id": req.body.Branch_Id,
			// 	"Branch_Name": req.body.Branch_Name,
			// 	"Particular": req.body.Particular,
			// 	"Doc_Photo": req.body.Doc_Photo,
			// 	"File_Name_1": req.body.Doc_Photo,
			// 	"File_Name": req.body.File_Name,
			// 	"Item_Code":req.body.Item_Code,
			// 	"File_Path":req.body.File_Path
	
				 
			// };
            Petty = {
                "Petty_Cash_Id": req.body.Petty_Cash_Id,
                "Date": req.body.Date,
                "Branch_Id": req.body.Branch_Id,
                "Branch_Name": req.body.Branch_Name,
                "Type_Id": req.body.Type_Id,
                "Type_Name": req.body.Type_Name,
                "Particular": req.body.Particular,
                "Document_Name": req.body.Document_Name,
                "SumTotal":req.body.SumTotal,
                "User_Id":req.body.User_Id,
				"Pos_Amount":req.body.Pos_Amount,
				"Closing_Balnce":req.body.Closing_Balnce,
				"Closing_Cash":req.body.Closing_Cash,
				"Closing_coin":req.body.Closing_coin,
                "RecpTotal":req.body.RecpTotal,
				"File_Path":req.body.File_Path,
				"Opening_Balance":req.body.Opening_Balance,
				"Profit_Loss":req.body.Profit_Loss
				// "File_Name": Doc_Image,
                // ExpenseRemark:req.body.ExpenseRemark,
                // HoRemark:req.body.HoRemark,
                // SalaryRemark:req.body.SalaryRemark,
                // ManagementRemark:req.body.ManagementRemark,
    			// Account_Id: req.body.Account_Id,
                // Account_Name: req.body.Account_Name,
				// Cash:req.body.Cash,
                // Upi:req.body.Upi,
                // Card:req.body.Card,
                // Coin:req.body.Coin,
				// Expense:req.body.Expense,
                // Ho:req.body.Ho,
                // Salary:req.body.Salary,
                // Management:req.body.Management,
                // Amount: req.body.Amount,

            };
            var Payment;
    
            Payment = {
            Payment:req.body.Payment_Data,
            // Receipt:req.body.Receipt_Data
        }
        var Receipt;
    
        Receipt = {
         
          Receipt:req.body.Receipt_Data
    }
         
    
    
     
            var jsondata1 = JSON.stringify(Petty);
            var PettyCash_Data = {
                Data_Petty_Cash: jsondata1,
                Data_payment:Payment,
                Receipt_Data:Receipt,
     
            };
     
     
            Payment_Voucher.Save_Petty_Cash(PettyCash_Data, function (err, rows) {
                if (err) {
                    console.log(err);
                    // console.log(sslc_year)
                    return 1;
                } else {
                    console.log(rows);
                    return res.json(rows);
                }
            });
        } catch (err) {
            console.log(err);
            const error = new Error("Please upload a file");
            error.httpStatusCode = 400;
            return next(error);
        } finally {
        }
    });

	router.get(
		"/Search_Daily_Report/:From_Date_?/:To_Date_?/:Branch_?/:Item_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Search_Daily_Report(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Item_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
			} finally {
			}
		}
	);

	/*** 10-05-2024 ***/
	router.get('/Get_Opening_Balance/:Branch_Id_?/:Date_?',function(req,res,next)
	{ 
	  try 
	  {
		Payment_Voucher.Get_Opening_Balance(req.params.Branch_Id_,req.params.Date_,function (err, rows) 
		{
		  if (err) 
		  {
			res.json(err);
			console.log(err);
		  }
		  else 
		  {
			res.json(rows);
			console.log(rows);
		  }
		});
	  }
	  catch (e) {
		  console.log(e);
	  }
	  finally {}
	});

	/** Added on 17-7-24 */

	router.post("/Save_Daybook_App", upload.array("myFile"), (req, res, next) => {
		try {
	
			const file = req.files;
			// console.log('file',req.files);
		
			var Doc_Image;
			var Photo_ = [];
	
			if (!file) {
			} else {
				for (var i = 0; i < req.body.Document_File_Array; i++) {
					if (i == req.body.ImageFile_Doc) Doc_Image = file[i].filename;
				}
			}
	
			// var Photo_json = JSON.stringify(Photo_);
	
			var Daybook;
			
			console.log('req.body:', req.body);
			console.log('req.query:', req.query);

			Daybook = {
				"Daybook_Id": req.body.Daybook_Id,
				"Entry_Date": req.body.Entry_Date,
				"Item_Id": req.body.Item_Id,
				"Item_Name": req.body.Item_Name,
				"Item_Code": req.body.Item_Code,
				"Item_Group_Id": req.body.Item_Group_Id,
				"Item_Group_Name": req.body.Item_Group_Name,
				"Master_Category_Id": req.body.Master_Category_Id,
				"Master_Category_Name": req.body.Master_Category_Name,
				"Client_Accounts_Id": req.body.Client_Accounts_Id,
				"Client_Accounts_Name": req.body.Client_Accounts_Name,
				"File_Name": req.body.File_Name,
				"File_Path": req.body.File_Path,
				"Quantity":req.body.Quantity,
				"Remarks":req.body.Remarks,
				"Amount":req.body.Amount
			};
	 
		   
			var jsondata1 = JSON.stringify(Daybook);
			var Document_Data = {
				Data_Document: jsondata1,
			};
			Payment_Voucher.Save_Daybook_App(Document_Data, function (err, rows) {
				if (err) {
					console.log(err);
		//    console.log(e);
					return 1;
				} else {
					console.log(rows);
					return res.json(rows);
				}
			});
		} catch (err) {
			console.log(err);
			const error = new Error("Please upload a file");
			error.httpStatusCode = 400;
			return next(error);
		} finally {
		}
	});

	router.get(
		"/Search_Daybook_App/:From_Date_?/:To_Date_?/:Branch_?/:Item_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				console.log(req.query);


				Payment_Voucher.Search_Daybook_App(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Item_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							res.json(err);
							console.log(err);
						} else {
							res.json(rows);
							console.log(rows);
						}
					}
				);
			} catch (e) {
			} finally {
			}
		}
	);


	/*** Added on 18-07-2024 */

	router.get(
		"/Delete_Daybook_App/:Daybook_Id_?",
		function (req, res, next) {
			try {
				console.log(req.query);
				console.log(req.params);
				Payment_Voucher.Delete_Daybook_App(
					req.params.Daybook_Id_,
					function (err, rows) {
						if (err) {
							res.json(err);
							console.log(err)
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
			} finally {
			}
		}
	);

	router.get(
		"/Search_Daybook/:From_Date_?/:To_Date_?/:Branch_?/:Item_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Search_Daybook(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Item_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							console.log(err);
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
				console.log(e);
			} finally {
			}
		}
	);

	router.get(
		"/Delete_Daybook/:Waste_Management_Id_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Delete_Daybook(
					req.params.Waste_Management_Id_,
					function (err, rows) {
						if (err) {
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
			} finally {
			}
		}
	);

	router.post("/Save_Daybook", upload.array("myFile"), (req, res, next) => {
		try {
	
			const file = req.files;
			console.log('file',req.files);
		
			var Doc_Image;
			var Photo_ = [];
	
			if (!file) {
			} else {
				for (var i = 0; i < req.body.Document_File_Array; i++) {
					if (i == req.body.ImageFile_Doc) Doc_Image = file[i].filename;
				}
			}
	
			// var Photo_json = JSON.stringify(Photo_);
	
			var Daybook;
			
			console.log('req.body:', req.body);

			Daybook = {
				"Daybook_Id": req.body.Daybook_Id,
				"Entry_Date": req.body.Entry_Date,
				"Item_Id": req.body.Item_Id,
				"Item_Name": req.body.Item_Name,
				"Item_Code": req.body.Item_Code,
				"Item_Group_Id": req.body.Item_Group_Id,
				"Item_Group_Name": req.body.Item_Group_Name,
				"Master_Category_Id": req.body.Master_Category_Id,
				"Master_Category_Name": req.body.Master_Category_Name,
				"Client_Accounts_Id": req.body.Client_Accounts_Id,
				"Client_Accounts_Name": req.body.Client_Accounts_Name,
				"File_Name": req.body.Doc_Photo,
				"File_Path": req.body.File_Path,
				"Quantity":req.body.Quantity,
				"Remarks":req.body.Remarks,
				"Amount":req.body.Amount
 
			};
	 
		   
			var jsondata1 = JSON.stringify(Daybook);
			var Document_Data = {
				Data_Document: jsondata1,
			};
			Payment_Voucher.Save_Daybook(Document_Data, function (err, rows) {
				if (err) {
					console.log(err);
		//    console.log(e);
					return 1;
				} else {
					console.log(rows);
					return res.json(rows);
				}
			});
		} catch (err) {
			console.log(err);
			const error = new Error("Please upload a file");
			error.httpStatusCode = 400;
			return next(error);
		} finally {
		}
	});


	/*** Added on 22-08-2024 */

	router.get(
		"/Search_Petty_Cash_Report_1/:From_Date_?/:To_Date_?/:Branch_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Search_Petty_Cash_Report_1(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
			} finally {
			}
		}
	);

	router.get('/Get_Petty_Cash_Details_Report/:Petty_Cash_Id_?',function(req,res,next)
    { 
		try 
		{
				Payment_Voucher.Get_Petty_Cash_Details_Report(req.params.Petty_Cash_Id_, function (err, rows) 
			{
				if (err) 
					{
						res.json(err);
					}
				else 
					{
						res.json(rows);
					}
			});
		}
		catch (e) {}
		finally {}
    });


	router.get(
		"/Search_Daybook_Report/:From_Date_?/:To_Date_?/:Branch_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Search_Daybook_Report(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							console.log(err);
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
				console.log(e);
			} finally {
			}
		}
	);

	router.get(
		"/Search_Waste_Management_Report_1/:From_Date_?/:To_Date_?/:Branch_?/:Is_Date_Check_?",
		function (req, res, next) {
			try {
				Payment_Voucher.Search_Waste_Management_Report_1(
					req.params.From_Date_,
					req.params.To_Date_,
					req.params.Branch_,
					req.params.Is_Date_Check_,
					function (err, rows) {
						if (err) {
							console.log(err);
							res.json(err);
						} else {
							res.json(rows);
						}
					}
				);
			} catch (e) {
				console.log(e);
			} finally {
			}
		}
	);

	router.get(
		"/Search_Invoice_By_VoucherType_Typeahead/:Client_Accounts_Id_?/:InvoiceNo_?/:Voucher_Type_Id_?",
		function (req, res, next) {
		  try {
			Payment_Voucher.Search_Invoice_By_VoucherType_Typeahead(
			  req.params.Client_Accounts_Id_,
			  req.params.InvoiceNo_,req.params.Voucher_Type_Id_,
			  function (err, rows) {
				if (err) {
				  res.json(err);
				} else {
				  res.json(rows);
				}
			  }
			);
		  } catch (e) {
		  } finally {
		  }
		}
	  );


	/**** */

module.exports = router;
