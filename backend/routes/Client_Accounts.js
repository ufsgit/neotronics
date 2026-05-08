var express = require("express");
var router = express.Router();
var Client_Accounts = require("../models/Client_Accounts");
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");
router.post("/Save_Client_Accounts/", asyncHandler(async function (req, res, next) {
	Client_Accounts.Save_Client_Accounts(req.body, function (err, rows) {
		if (err) {
			console.log(err);
			res.json(err);
		} else {
			return sendSuccess(res, { message: "Saved", data: rows });
		}
	});
}));
router.get(
	"/Search_Customer/:Client_Accounts_Name_?/:Employee_Id ?",
	function (req, res, next) {
		try {
			Client_Accounts.Search_Customer(
				req.params.Client_Accounts_Name_,
				req.params.Employee_Id,
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

router.get("/Search_Client_Accounts/", function (req, res, next) {
	try {
		Client_Accounts.Search_Client_Accounts(
			req.query.Client_Accounts_Name_,
			req.query.Account_Group_,
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
router.get("/Search_Bank/", function (req, res, next) {
	try {
		Client_Accounts.Search_Bank(
			req.query.Client_Accounts_Name_,
			req.query.Account_Group_,
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
	"/Accounts_Typeahead/:Account_Group_Id_?/:Client_Accounts_Name_?",
	function (req, res, next) {
		try {
			Client_Accounts.Accounts_Typeahead(
				req.params.Account_Group_Id_,
				req.params.Client_Accounts_Name_,
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


router.get('/Accounts_Typeahead_1',function(req,res,next)
{ 

try 
{
	Client_Accounts.Accounts_Typeahead_1( req.query.Client_Id,req.query.AccountName, function (err, rows)
{
	console.log(req.query);
if (err) 
{
	console.log(err);
res.json(err);
}
else 
{
	console.log(rows);
res.json(rows);
}
});
}
catch (e) 
{
	console.log(e);
}
finally 
{
}
});


router.get("/Account_Group_Typeahead/", function (req, res, next) {
	try {
		Client_Accounts.Account_Group_Typeahead(
			req.query.Account_Group_Id_,
			req.query.Accounts_Name_,
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
	"/Get_Client_Accounts/:Client_Accounts_Id_?",
	function (req, res, next) {
		try {
			Client_Accounts.Get_Client_Accounts(
				req.params.Client_Accounts_Id_,
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
	"/Delete_Client_Accounts/:Client_Accounts_Id_?",
	function (req, res, next) {
		try {
			Client_Accounts.Delete_Client_Accounts(
				req.params.Client_Accounts_Id_,
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
	"/From_Stock_Typeahead/:Client_Accounts_Name_?",
	function (req, res, next) {
		try {
			Client_Accounts.From_Stock_Typeahead(
				req.params.Client_Accounts_Name_,
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
	"/Client_Employee_Typeahead/:Client_Accounts_Id_?",
	function (req, res, next) {
		try {
			Client_Accounts.Client_Employee_Typeahead(
				req.params.Client_Accounts_Id_,
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

router.post("/Save_Company/", asyncHandler(async function (req, res, next) {
	Client_Accounts.Save_Company(req.body, function (err, rows) {
		if (err) {
			res.json(err);
		} else {
			return sendSuccess(res, { message: "Saved", data: rows });
		}
	});
}));

router.get("/Search_Company/", function (req, res, next) {
	try {
		Client_Accounts.Search_Company(
			req.query.Company_Name,
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
	} finally {
	}
});
router.get("/Get_Company/:Company_Id_?", function (req, res, next) {
	try {
		Client_Accounts.Get_Company(req.params.Company_Id_, function (err, rows) {
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
router.get("/Delete_Company/:Company_Id_?", function (req, res, next) {
	try {
		Client_Accounts.Delete_Company(
			req.params.Company_Id_,
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
router.post("/Save_Cheque_Book/", function (req, res, next) {
	try {
		Client_Accounts.Save_Cheque_Book(req.body, function (err, rows) {
			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} catch (e) {
		console.log(e);
	} finally {
	}
});

router.get("/Search_Cheque_Book/", function (req, res, next) {
	try {
		Client_Accounts.Search_Cheque_Book(
			req.query.Book_No_,
			req.query.Bank_Id_,
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

router.get("/Delete_Cheque_Book/:Cheque_Book_Id_?", function (req, res, next) {
	try {
		Client_Accounts.Delete_Cheque_Book(
			req.params.Cheque_Book_Id_,
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
router.get("/Load_Prodcut_Under_Category/", function (req, res, next) {
	try {
		Client_Accounts.Load_Prodcut_Under_Category(
			req.query.ids_,
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
	"/Get_Vendors_Other_Details/:Client_Accounts_Id_?",
	function (req, res, next) {
		try {
			Client_Accounts.Get_Vendors_Other_Details(
				req.params.Client_Accounts_Id_,
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

router.get('/Search_Branch_Typeahead/:Branch_Name_?',function(req,res,next)
{ 
try 
{
	Client_Accounts.Search_Branch_Typeahead(req.params.Branch_Name_, function (err, rows) 

{
 if (err) 
 {
  console.log(err);

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
  console.log(e);

}
finally 
{
}
 });



 router.get('/Search_ItemCode_Typeahead/:Item_Code_?',function(req,res,next)
{ 
try 
{
	Client_Accounts.Search_ItemCode_Typeahead(req.params.Item_Code_, function (err, rows) 

{
 if (err) 
 {
  console.log(err);

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
  console.log(e);

}
finally 
{
}
 });


 router.get('/Search_ItemName_Typeahead/:Item_Name_?',function(req,res,next)
{ 
try 
{
	Client_Accounts.Search_ItemName_Typeahead(req.params.Item_Name_, function (err, rows) 

{
 if (err) 
 {
  console.log(err);

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
  console.log(e);

}
finally 
{
}
 });

module.exports = router;
