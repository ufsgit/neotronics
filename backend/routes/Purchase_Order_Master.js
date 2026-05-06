var express = require("express");
var router = express.Router();
var Purchase_Order_Master = require("../models/Purchase_Order_Master");

const upload = require('../helpers/multer-helper');

router.post("/Save_Purchase_Order_Master/", async function (req, res, next) {
	try {
		const resp = await Purchase_Order_Master.Save_Purchase_Order_Master(
			req.body
		);
		return res.send(resp);
	} catch (e) {
		return res.send(e);
	}
});

router.post("/Save_Purchase_Order_Customer/", async function (req, res, next) {
	try {
		const resp = await Purchase_Order_Master.Save_Purchase_Order_Customer(
			req.body
		);
		return res.send(resp);
	} catch (e) {
		return res.send(e);
	}
});

router.post("/Save_Suggestion_Master/", async function (req, res, next) {
	try {
		const resp = await Purchase_Order_Master.Save_Suggestion_Master(
			req.body
		);
		return res.send(resp);
	} catch (e) {
		console.log(e)
		return res.send(e);
	}
});
router.get(
	"/Get_Purchase_Order_Master/:Purchase_Order_Master_Id_?/:Order_Company_Id_?/:Order_Warehouse_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_Master(
				req.params.Purchase_Order_Master_Id_,
				req.params.Order_Company_Id_,
				req.params.Order_Warehouse_Id_,
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
    "/Search_Graphical_Report_Deliverypercentage/:Fromdate_?/:Todate_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_Graphical_Report_Deliverypercentage(
                req.params.Fromdate_,
                req.params.Todate_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);

router.get(
	"/Get_Purchase_Order_Customer/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_Customer(
				req.params.Purchase_Order_Master_Id_,
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
	"/Get_Sales_Tracking/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Sales_Tracking(
				req.params.Purchase_Order_Master_Id_,
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
// router.get("/Search_Purchase_Order_Master/", function (req, res, next) {
//   try {
//     Purchase_Order_Master.Search_Purchase_Order_Master(
//       req.query.Is_Date_Check_,
//       req.query.FromDate_,
//       req.query.ToDate_,
//       req.query.Account_Party_Id_,
//       req.query.Invoice_No_,
//       req.query.Purchase_Order_Status_Id,
//       function (err, rows) {
//         if (err) {
//           res.json(err);
//         } else {
//           res.json(rows);
//         }
//       }
//     );
//   } catch (e) {
//   } finally {
//   }
// });
router.get("/Search_Purchase_Order_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Purchase_Order_Master(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Search_By_,
			req.query.SearchbyName_,
			req.query.Order_Platform_,
			req.query.Order_Source_,
			req.query.By_User_,
			// req.query.Region_,
			req.query.Payment_Mode_,
			req.query.Order_Type_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get(
	"/Search_Purchase_Order_Master_For_Invoice/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Purchase_Order_Master_For_Invoice(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Order_Id_,
				req.query.Region_,
				req.query.Order_Platform_,
				req.query.Status_Id_,
				req.query.By_User_,
				req.query.Black_Start_,
				req.query.Black_Stop_,
				req.query.Page_Length_,
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
	"/Search_Purchase_Order_Master_For_InvoiceCancel/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Purchase_Order_Master_For_InvoiceCancel(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Order_Id_,
				req.query.Region_,
				req.query.Order_Platform_,
				req.query.Status_Id_,
				req.query.By_User_,
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
	"/Search_Purchase_Order_Master_For_InvoiceCancel_Report/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Purchase_Order_Master_For_InvoiceCancel_Report(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Order_Id_,
				req.query.Region_,
				req.query.Order_Platform_,
				req.query.Status_Id_,
				req.query.By_User_,
				req.query.Black_Start_,
				req.query.Black_Stop_,
				req.query.Page_Length_,
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

// router.get(
// 	"/Search_Purchase_Order_Master_For_Picklist/",
// 	function (req, res, next) {
// 		try {
// 			Purchase_Order_Master.Search_Purchase_Order_Master_For_Picklist(
// 				req.query.Is_Date_Check_,
// 				req.query.FromDate_,
// 				req.query.ToDate_,
// 				req.query.Search_By_,
// 				req.query.SearchbyName_,
// 				req.query.Order_Platform_,
// 				req.query.Order_Source_,
// 				req.query.By_User_,
// 				req.query.Region_,
// 				req.query.Payment_Mode_,
// 				req.query.Picking_list_master_Id_,
// 				function (err, rows) {
// 					if (err) {
// 						console.log(err);
// 						res.json(err);
// 					} else {
// 						res.json(rows);
// 					}
// 				}
// 			);
// 		} catch (e) {
// 			console.log(e);
// 		} finally {
// 		}
// 	}
// );

router.get("/Search_Purchase_Order_Customer/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Purchase_Order_Customer(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Invoice_No_,
			req.query.Client_Id_,
			req.query.Order_Status_,
			req.query.Reference_Field_,
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

router.get("/Load_Order_Status/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_Order_Status(
			req.query.Order_Status_Name,
			req.query.Group_Id,
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

router.get("/Search_Pono_Typeahead/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Pono_Typeahead(
			req.query.PONo_,
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

router.get("/Search_Pono_Client_Typeahead/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Pono_Client_Typeahead(
			req.query.PONo_,
			req.query.Client_Id_,
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

// router.get('/Search_Purchase_Order_Master/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Client_Accounts_Id_?/:PONo_?/:Order_Status_?',function(req,res,next)
//     {
//     try
//     {
//       Purchase_Order_Master.Search_Purchase_Order_Master(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Client_Accounts_Id_,req.params.PONo_,req.params.Order_Status_, function (err, rows)
//     {
//     if (err)
//     {
//     res.json(err);
//     }
//     else
//     {
//     res.json(rows);
//     }
//     });
//     }
//     catch (e)
//     {
//     }
//     finally
//     {
//     }
//     });

// router.get('/Get_Purchase_Master/:Purchase_Master_Id_?',function(req,res,next)
//     {
//     try
//     {
//     Purchase_Master.Get_Purchase_Master(req.params.Purchase_Master_Id_, function (err, rows)
//     {
//     if (err)
//     {
//     res.json(err);
//     }
//     else
//     {
//     res.json(rows);
//     }
//     });
//     }
//     catch (e)
//     {
//     }
//     finally
//     {
//     }
//     });

router.get(
	"/Delete_Purchase_Order_Master/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Delete_Purchase_Order_Master(
				req.params.Purchase_Order_Master_Id_,
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
	"/Delete_Purchase_Order_Customer/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Delete_Purchase_Order_Customer(
				req.params.Purchase_Order_Master_Id_,
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
	"/Get_Production_From_Purchase_Customer/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Production_From_Purchase_Customer(
				req.params.Purchase_Order_Master_Id_,
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
	"/Search_Order_Tracking/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Order_Tracking(
				req.params.Purchase_Order_Master_Id_,
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

router.get("/Search_Order_Tracking_User", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Order_Tracking_User(
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Is_Date_Check_,
			req.query.Po_No_,
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
	"/Create_Production_Customer/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Create_Production_Customer(
				req.params.Purchase_Order_Master_Id_,
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

router.post("/Search_App_Pending_Order/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Pending_Order(
			req.body,
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
});

router.post("/Search_App_Delivered/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Delivered(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Search_App_Done/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Done(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Search_App_Holded/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Holded(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Search_App_Returned/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Returned(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/App_Save_Scaned_Items/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Returned(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Search_App_Month_Total/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_App_Month_Total(
			req.body,
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
});
router.post("/Get_App_Order_Id/", function (req, res, next) {
	try {
		Purchase_Order_Master.Get_App_Order_Id(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get("/Load_Purchase_Order_Status/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_Purchase_Order_Status(function (err, rows) {
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
	"/Get_Purchase_Order_From_Proforma/:Shipment_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_From_Proforma(
				req.params.Shipment_Master_Id_,
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
	"/Get_Purchase_Order_From_Proforma_Invoice/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_From_Proforma_Invoice(
				req.params.Purchase_Order_Master_Id_,
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

router.get("/Load_StatusOrder/:Group_Id_?", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_StatusOrder(
			req.params.Group_Id_,
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
});

router.get(
	"/Load_StatusOrder_Inventory/:Group_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Load_StatusOrder_Inventory(
				req.params.Group_Id_,
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
	"/Get_Purchase_Order_Previouslist/:Purchase_Order_Master_Id_?/:Client_Accounts_Id_?",
	function (req, res, next) {
		console.log(req.params);
		try {
			Purchase_Order_Master.Get_Purchase_Order_Previouslist(
				req.params.Purchase_Order_Master_Id_,
				req.params.Client_Accounts_Id_,
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
	"/Search_Dashboard_Customer/:Login_User_Id_ ?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Dashboard_Customer(
				req.params.Login_User_Id_,
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
router.get("/Search_Dashboard", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Dashboard(function (err, rows) {
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
router.get("/Load_Order_Platform/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_Order_Platform(function (err, rows) {
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
router.get("/Load_Order_Source/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_Order_Source(function (err, rows) {
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

router.get("/Load_StatusOrder_Sender_Pending/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_StatusOrder_Sender_Pending(function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Load_StatusOrder_LastFive/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_StatusOrder_LastFive(function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Load_StatusOrderfor_Fullorder_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_StatusOrderfor_Fullorder_Report(function (
			err,
			rows
		) {
			if (err) {
				console.log(err);
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

router.get("/Load_UserDetails_Forfullorderreport/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_UserDetails_Forfullorderreport(function (
			err,
			rows
		) {
			if (err) {
				console.log(err);
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

router.post("/Save_Neworders/", function (req, res, next) {
	try {
		Purchase_Order_Master.Save_Neworders(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Load_Payment_Mode/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_Payment_Mode(function (err, rows) {
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

// router.get("/Get_Purchase_Order_Previouslist/:Purchase_Order_Master_Id_?/:Client_Accounts_Id_?",
//   function (req, res, next) {
//     try {
//       Purchase_Order_Master.Get_Purchase_Order_Previouslist(
//         req.params.Purchase_Order_Master_Id_, req.params.Client_Accounts_Id_,function (err, rows) {
//           if (err) {
//             console.log(err)
//             res.json(err);
//           } else {
//             console.log(rows)
//             res.json(rows);
//           }
//         }
//       );
//     } catch (e) {
//       console.log(e)
//     } finally {
//     }
//   }
// );
router.post("/Send_Logistics/", function (req, res, next) {
	try {
		Purchase_Order_Master.Send_Logistics(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Search_Logistics_Send_Receive/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Logistics_Send_Receive(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.warehouse_Id_,
			req.query.Status_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.post("/Invoice_Received/", function (req, res, next) {
	try {
		Purchase_Order_Master.Invoice_Received(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Search_Inventory_Send_Receive/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Inventory_Send_Receive(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.warehouse_Id_,
			req.query.Status_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Invoice_Packed/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Invoice_Packed(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.By_User_,
			req.query.Region_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Picklist_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Picklist_Master(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Search_By_,
			req.query.SearchbyName_,
			req.query.Order_Platform_,
			req.query.Order_Source_,
			req.query.By_User_,
			req.query.Region_,
			req.query.Payment_Mode_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.post("/Send_Inventory/", function (req, res, next) {
	try {
		Purchase_Order_Master.Send_Inventory(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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

router.get("/Search_sender_pending_master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_sender_pending_master(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Region_,
			req.query.Section_Id_,
			req.query.Status_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.post("/Senders_Dispatch/", function (req, res, next) {
	try {
		Purchase_Order_Master.Senders_Dispatch(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get("/Search_sender_Dispatch_master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_sender_Dispatch_master(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Region_,
			req.query.Section_Id_,
			req.query.Driver_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get(
	"/Get_Picking_List_Print_Details/:Picking_list_master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Picking_List_Print_Details(
				req.params.Picking_list_master_Id_,
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
	"/Get_Packing_List_Print_Details/:Packing_list_master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Packing_List_Print_Details(
				req.params.Packing_list_master_Id_,
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
router.post("/Send_to_Driver/", function (req, res, next) {
	try {
		Purchase_Order_Master.Send_to_Driver(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Senders_Dispatch/", function (req, res, next) {
	try {
		Purchase_Order_Master.Senders_Dispatch(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get("/Search_to_Driver/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_to_Driver(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Region_,
			req.query.Section_Id_,
			req.query.Driver_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get("/Search_Sender_Hold/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Sender_Hold(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Region_,
			req.query.Section_Id_,
			req.query.Driver_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.post("/Sender_Change/", function (req, res, next) {
	try {
		Purchase_Order_Master.Sender_Change(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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

router.get(
	"/Status_Change/:Status_Id_?/:Order_Master_Id_ ?/:User_Id_ ?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Status_Change(
				req.params.Status_Id_,
				req.params.Order_Master_Id_,
				req.params.User_Id_,
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

router.get("/Search_Shipment_Status/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Shipment_Status(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Region_,
			req.query.Section_Id_,
			req.query.Driver_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get("/Search_Despatch_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Despatch_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Driver_Id_,
			req.query.Status_Id_,
			req.query.By_User_,
			req.query.Region_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
			function (err, rows) {
				if (err) {
					res.json(err);
				} else {
					console.log(rows);
					res.json(rows);
				}
			}
		);
	} catch (e) {
		//console.log(e);
	} finally {
	}
});

router.get("/Search_Fullorder_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Fullorder_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.By_User_,
			req.query.Platform_,
			req.query.Source_,
			req.query.Status_,
			req.query.Region_,
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
});

router.get("/Search_Profitproductorder_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Profitproductorder_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Order_Platform_id_,
			req.query.Department_Id_,
			req.query.item_Id_,
			req.query.supplier_Id_,
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
});

router.get(
	"/Search_Profitproductorder_Done_Report/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Profitproductorder_Done_Report(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Order_Platform_id_,
				req.query.Department_Id_,
				req.query.item_Id_,
				req.query.supplier_Id_,
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

router.get("/Search_Stockdetail_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Stockdetail_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Order_Platform_id_,
			req.query.Department_Id_,
			req.query.item_Id_,
			req.query.supplier_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get("/Search_BuyerStock_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_BuyerStock_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Order_Platform_id_,
			req.query.Department_Id_,
			req.query.item_Id_,
			req.query.supplier_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get("/Search_Pendingorder_Report/", function (req, res, next) {
	try {
		console.log(req.query);
		Purchase_Order_Master.Search_Pendingorder_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Order_Platform_id_,
			req.query.Department_Id_,
			req.query.item_Id_,
			req.query.supplier_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

// router.get("/Search_Pendingorder_Report/", function (req, res, next) {
// 	try {
// 		Purchase_Order_Master.Search_Pendingorder_Report(
// 			req.query.Is_Date_Check_,
// 			req.query.FromDate_,
// 			req.query.ToDate_,

// 			function (err, rows) {
// 				if (err) {
// 					console.log(err);
// 					res.json(err);
// 				} else {
// 					res.json(rows);
// 				}
// 			}
// 		);
// 	} catch (e) {
// 		console.log(e);
// 	} finally {
// 	}
// });

router.get(
	"/Get_Eway_Bill_Print_Details/:Picking_list_master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Eway_Bill_Print_Details(
				req.params.Picking_list_master_Id_,
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
router.get("/Get_Driver_Orders/:Driver_Id_?", function (req, res, next) {
	try {
		console.log(req);
		Purchase_Order_Master.Get_Driver_Orders(
			req.params.Driver_Id_,
			function (err, rows) {
				if (err) {
					console.log(err);
					res.json(err);
				} else {
					console.log(rows);
					res.json(rows);
				}
			}
		);
	} catch (e) {
		console.log(e);
	} finally {
	}
});
router.get(
	"/View_Purchase_Order/:Purchase_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.View_Purchase_Order(
				req.params.Purchase_Master_Id_,
				function (err, rows) {
					if (err) {
						res.json(err);
					} else {
						console.log(rows);
						res.json(rows);
					}
				}
			);
		} catch (e) {
		} finally {
		}
	}
);
// router.get(
// 	"/Get_Driver_Orders/:Driver_Id_?",
// 	function (req, res, next) {
// 	  try {
// 		Purchase_Order_Master.Get_Driver_Orders(
// 		  req.params.Driver_Id_,
// 		  function (err, rows) {
// 			if (err) {
// 				console.log(err)
// 			  res.json(err);
// 			} else {
// 			  res.json(rows);
// 			}
// 		  }
// 		);
// 	  } catch (e) {
// 		console.log(e)
// 	  } finally {
// 	  }
// 	}
//   );
router.get("/Get_App_Dashboard/:Driver_Id_?", function (req, res, next) {
	try {
		Purchase_Order_Master.Get_App_Dashboard(
			req.params.Driver_Id_,
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
router.post("/Save_Scaned_Itmes/", function (req, res, next) {
	console.log(req);
	try {
		Purchase_Order_Master.Save_Scaned_Itmes(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get(
	"/Get_Purchase_Order_Previouslist_wrt_Mobile/:Purchase_Order_Master_Id_?/:Mobile_Number_?",
	function (req, res, next) {
		console.log(req.params);
		try {
			Purchase_Order_Master.Get_Purchase_Order_Previouslist_wrt_Mobile(
				req.params.Purchase_Order_Master_Id_,
				req.params.Mobile_Number_,
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

router.get("/Search_RejectedOrder_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_RejectedOrder_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Platform_Id_,
			req.query.Department_Id_,
			req.query.Item_Id_,
			req.query.Supplier_Id_,

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
});
router.get("/Search_Detailed_Invoice_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Detailed_Invoice_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Invoice_No_,
			req.query.Customer_Name_,
			req.query.Region_,
			req.query.Order_Platform_,
			req.query.Status_Id_,
			req.query.By_User_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get(
	"/View_Movement_Report/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			console.log(req);
			Purchase_Order_Master.View_Movement_Report(
				req.params.Purchase_Order_Master_Id_,
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
	}
);
router.get("/Load_InvoiceStatus/", function (req, res, next) {
	try {
		Purchase_Order_Master.Load_InvoiceStatus(function (err, rows) {
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
	"/Search_Graphical_Report/:Fromdate_?/:Todate_?",
	async function (req, res, next) {
		var result = "";
		try {
			result = await Purchase_Order_Master.Search_Graphical_Report(
				req.params.Fromdate_,
				req.params.Todate_
			);

			res.json(result);
		} catch (e) {
		} finally {
		}
	}
);

// router.get("/Search_InvoiceReport/", function (req, res, next) {
// 	try {
// 		Purchase_Order_Master.Search_InvoiceReport(
// 			req.query.Is_Date_Check_,
// 			req.query.FromDate_,
// 			req.query.ToDate_,
// 			req.query.Batch_Id_,
// 			req.query.Status_,
// 			function (err, rows) {
// 				if (err) {
// 					console.log(err);
// 					res.json(err);
// 				} else {
// 					res.json(rows);
// 				}
// 			}
// 		);
// 	} catch (e) {
// 		console.log(e);
// 	} finally {
// 	}
// });
router.get(
	"/Search_Graphical_Report_Logistics/:Fromdate_?/:Todate_?",
	async function (req, res, next) {
		var result = "";
		try {
			result = await Purchase_Order_Master.Search_Graphical_Report_Logistics(
				req.params.Fromdate_,
				req.params.Todate_
			);

			res.json(result);
		} catch (e) {
		} finally {
		}
	}
);

router.get("/Search_InvoiceReport/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_InvoiceReport(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Batch_Id_,
			req.query.Status_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get(
	"/Get_OrderdeatilsBy_Invoicebtnclick/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_OrderdeatilsBy_Invoicebtnclick(
				req.params.Purchase_Order_Master_Id_,
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

// router.get(
//     "/Get_Invoice_Print_Details/:Picking_list_master_Id_?",
//     function (req, res, next) {
//         try {
//             Purchase_Order_Master.Get_Invoice_Print_Details(
//                 req.params.Picking_list_master_Id_,
//                 function (err, rows) {
//                     if (err) {
//                         res.json(err);
//                     } else {
//                         res.json(rows);
//                     }
//                 }
//             );
//         } catch (e) {
//         } finally {
//         }
//     }
// );

router.get(
	"/Search_Purchase_Order_Master_For_Picklist/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Purchase_Order_Master_For_Picklist(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Search_By_,
				req.query.SearchbyName_,
				req.query.Order_Platform_,
				req.query.Order_Source_,
				req.query.By_User_,
				req.query.Region_,
				req.query.Payment_Mode_,
				req.query.Picking_list_master_Id_,
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
	"/Search_SalesandProfit_Report/:Fromyear_?/:Toyear_?",
	async function (req, res, next) {
		var result = "";
		try {
			result = await Purchase_Order_Master.Search_SalesandProfit_Report(
				req.params.Fromyear_,
				req.params.Toyear_
			);

			res.json(result);
		} catch (e) {
		} finally {
		}
	}
);
router.get(
	"/Get_Invoice_Print_Details/:Picking_list_master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Invoice_Print_Details(
				req.params.Picking_list_master_Id_,
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
	"/Search_DailySales_And_SalesReturn_Report/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_DailySales_And_SalesReturn_Report(
				req.query.Is_Date_Check_,
				req.query.FromDate_,
				req.query.ToDate_,
				req.query.Platform_,
				req.query.Status_,
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
	"/Search_Replacement_with_Invoice/:Invoice_Number_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Replacement_with_Invoice(
				req.params.Invoice_Number_,
				function (err, rows) {
					if (err) {
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
router.post("/Save_Replacement_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Save_Replacement_Master(
			req.body,
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
});
router.post("/Save_Refund_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Save_Refund_Master(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.post("/Save_Service_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Save_Service_Master(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get("/Search_Replacement/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Replacement(
			req.query.Look_In_Date_,
			req.query.Search_FromDate_,
			req.query.Search_ToDate_,
			req.query.Search_By_,
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
});
router.get("/Search_Refund/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Refund(
			req.query.Look_In_Date_,
			req.query.Search_FromDate_,
			req.query.Search_ToDate_,
			req.query.Search_By_,
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
});
router.get("/Search_Service/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Service(
			req.query.Look_In_Date_,
			req.query.Search_FromDate_,
			req.query.Search_ToDate_,
			req.query.Search_By_,
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
});
router.get(
	"/Get_Old_Order_Details/:Old_Purchase_Details_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Old_Order_Details(
				req.params.Old_Purchase_Details_Id_,
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
// router.get(
// 	"/Reset_Replacement/:Purchase_Order_Master_Id_?/:Replacement_Master_Id_?/:Old_Purchase_Master_Id_?",
// 	function (req, res, next) {
// 		try {
// 			Purchase_Order_Master.Reset_Replacement(
// 				req.params.Purchase_Order_Master_Id_,
// 				req.params.Replacement_Master_Id_,
// 				req.params.Old_Purchase_Master_Id_,
// 				function (err, rows) {
// 					if (err) {
// 						console.log(err);
// 						res.json(err);
// 					} else {
// 						res.json(rows);
// 					}
// 				}
// 			);
// 		} catch (e) {
// 			console.log(e);
// 		} finally {
// 		}
// 	}
// );
router.get(
	"/Delete_Replacement/:Purchase_Order_Master_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Delete_Replacement(
				req.params.Purchase_Order_Master_Id_,
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
	"/Reset_Service/:Purchase_Order_Master_Id_?/:Purchase_Details_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Reset_Service(
				req.params.Purchase_Order_Master_Id_,
				req.params.Purchase_Details_Id_,
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
	"/Get_Purchase_Order_Master_for_Service/:Purchase_Order_Master_Id_?/:Order_Company_Id_?/:Order_Warehouse_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_Master_for_Service(
				req.params.Purchase_Order_Master_Id_,
				req.params.Order_Company_Id_,
				req.params.Order_Warehouse_Id_,
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
	"/Get_Purchase_Order_Master_for_Refund/:Purchase_Order_Master_Id_?/:Order_Company_Id_?/:Order_Warehouse_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Purchase_Order_Master_for_Refund(
				req.params.Purchase_Order_Master_Id_,
				req.params.Order_Company_Id_,
				req.params.Order_Warehouse_Id_,
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
	"/Reset_Refund/:Purchase_Order_Master_Id_?/:Purchase_Details_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Reset_Refund(
				req.params.Purchase_Order_Master_Id_,
				req.params.Purchase_Details_Id_,
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
    "/Search_Graphical_Report_Catgorywise/:Fromdate_?/:Todate_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_Graphical_Report_Catgorywise(
                req.params.Fromdate_,
                req.params.Todate_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
router.get(
    "/Search_Graphical_Report_Orderfrom/:Fromdate_?/:Todate_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_Graphical_Report_Orderfrom(
                req.params.Fromdate_,
                req.params.Todate_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
router.get(
    "/Search_GraphicalReport_Regionwise/:Fromdate_?/:Todate_?/:Status_?/:Region_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_GraphicalReport_Regionwise(
                req.params.Fromdate_,
                req.params.Todate_,req.params.Status_,req.params.Region_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
router.get(
    "/Search_Graphical_Report_Regionwisepiechart/:Fromdate_?/:Todate_?/:Status_?/:Region_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_Graphical_Report_Regionwisepiechart(
                req.params.Fromdate_,
                req.params.Todate_,req.params.Status_,req.params.Region_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
router.get("/Search_Customer_Cancel_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Customer_Cancel_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Customer_Name_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Warrenty_Stock_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Warrenty_Stock_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.item_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Warrenty_Product_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Warrenty_Product_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.item_Id_,
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
});
router.get(
    "/Search_Driver_Analysis_Report/:Fromdate_?/:Todate_?/:Status_?/:Driver_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Search_Driver_Analysis_Report(
                req.params.Fromdate_,
                req.params.Todate_,req.params.Status_,req.params.Driver_
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
router.get("/Search_Sales_and_Sales_Return_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Sales_and_Sales_Return_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Customer_Name_,
			req.query.Invoice_Number_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Buyer_Inactive_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Buyer_Inactive_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.Buyer_id_,
			req.query.item_Id_,
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
});
router.get("/Search_Complaint_Product_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Complaint_Product_Report(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.item_Id_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get("/Search_Dashboard_1/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Dashboard_1(
			req.query.Search_By_,
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
});
router.get("/Search_Dashboard_2/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Dashboard_2(
			req.query.Search_By_,
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
});
router.get("/Search_Dashboard_3/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Dashboard_3(
			req.query.Search_By_,
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
});
router.get("/Search_View_All_Product/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_View_All_Product(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.supplier_id_,
			req.query.brand_id_,
			req.query.status_id_,
			req.query.dept_id_,
			req.query.Catalogue_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});





router.get("/Search_View_All_Catalog/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_View_All_Catalog(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.supplier_id_,
			req.query.brand_id_,
			req.query.status_id_,
			req.query.dept_id_,
			req.query.Catalogue_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});



// router.get("/Search_Dashboard_4/", function (req, res, next) {
// 	try {
// 		Purchase_Order_Master.Search_Dashboard_4(
// 			req.query.Search_By_,
// 			function (err, rows) {
// 				if (err) {
// 					console.log(err); 
// 					res.json(err);
// 				} else {
// 					res.json(rows);
// 				}
// 			}
// 		);
// 	} catch (e) {
// 		console.log(e);
// 	} finally {
// 	}
// });
// router.get(
//     "/Search_Dashboard_4/:Fromdate_?/:Todate_?/:Status_?/:Region_?",
//     async function (req, res, next) {
//         var result = "";
//         try {
//             result = await Purchase_Order_Master.Search_Dashboard_4(
//                 req.params.Fromdate_,
//                 req.params.Todate_,req.params.Status_,req.params.Region_
//             );

//             res.json(result);
//         } catch (e) {
//         } finally {
//         }
//     }
// );




//me

router.get(
	"/Search_Dashboard_4/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Search_Dashboard_4(
				req.query.Fromdate_,
				req.query.ToDate_,
				req.query.Region_,
				req.query.Team_Member_Selection_,
				function (err, rows) {
					if (err) {
						console.log(err);
						res.json(err);
					} else {
						console.log(rows)
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

//me
router.get(
    "/Dashboard_SalesandProfit_Report/:Fromdate_?/:Todate_?/:Region_?/:Team_Member_Selection_?",
    async function (req, res, next) {
        var result = "";
        try {
            result = await Purchase_Order_Master.Dashboard_SalesandProfit_Report(
                req.params.Fromdate_,
                req.params.Todate_,req.params.Region_,req.params.Team_Member_Selection_,
            );

            res.json(result);
        } catch (e) {
        } finally {
        }
    }
);
// router.get(
//     "/Dashboard_Percentage/:Fromdate_?/:Todate_?/:Status_?/:Region_?",
//     async function (req, res, next) {
//         var result = "";
//         try {
//             result = await Purchase_Order_Master.Dashboard_Percentage(
//                 req.params.Fromdate_,
//                 req.params.Todate_,req.params.Status_,req.params.Region_
//             );

//             res.json(result);
//         } catch (e) {
//         } finally {
//         }
//     }
// );
router.get(
	"/Dashboard_Percentage/",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Dashboard_Percentage(
				req.query.Fromdate_,
				req.query.ToDate_,
				req.query.Region_,
				req.query.Team_Member_Selection_,
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
router.post("/Save_Materials/", function (req, res, next) {
	try {
		Purchase_Order_Master.Save_Materials(req.body, function (err, rows) {
			if (err) {
				console.log(err);
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
router.get("/Search_Bundle_Product_Master/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Bundle_Product_Master(
			req.query.Department_Id_,
			req.query.Category_Id_,
			req.query.Product_Name_,
			req.query.Titile_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.get(
	"/Get_Bundle_Product_Master_Details/:Bundle_Product_Master_Id_?/:Order_Company_Id_?/:Order_Warehouse_Id_?",
	function (req, res, next) {
		try {
			Purchase_Order_Master.Get_Bundle_Product_Master_Details(
				req.params.Bundle_Product_Master_Id_,
				req.params.Order_Company_Id_,
				req.params.Order_Warehouse_Id_,
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
router.get("/Activity_Report/", function (req, res, next) {
	try {
		Purchase_Order_Master.Activity_Report(
			req.query.Look_In_Date_,
			req.query.Search_FromDate_,
			req.query.Search_ToDate_,
			req.query.User_Id_,
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
});
router.get("/View_All_Listed_Products/", function (req, res, next) {
	try {
		Purchase_Order_Master.View_All_Listed_Products(
			req.query.Titile_,
			req.query.Product_Name_,
			req.query.supplier_id_,
			req.query.Dept_id_,
			req.query.Cat_Id_,
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
});
router.get('/Get_Customer_Details/:Order_Id_?',function(req,res,next)
{ 
try 
{
	Purchase_Order_Master.Get_Customer_Details(req.params.Order_Id_, function (err, rows) 
{
if (err) 
{
res.json(err);
console.log(err)
}
else 
{
res.json(rows);
console.log(rows)
}
});
}
catch (e) 
{
  console.log(e)
}
finally 
{
}
});
router.get("/Search_Payment_Order/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_Payment_Order(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.SearchbyName_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});
router.post("/Verify/", async function (req, res, next) {
	try {
	  
	  const resp = await Purchase_Order_Master.Verify(req.body);
	  return res.send(resp);
	} catch (e) {
	  console.log(e)
	  return res.send(e);
	}
  });




  router.get("/Search_View_All_Supplier_Product/", function (req, res, next) {
    try {
        Purchase_Order_Master.Search_View_All_Supplier_Product(
            req.query.Is_Date_Check_,
            req.query.FromDate_,
            req.query.ToDate_,
            req.query.supplier_id_,
            req.query.brand_id_,
            req.query.status_id_,
            req.query.dept_id_,
            req.query.Catalogue_,
            req.query.Black_Start_,
            req.query.Black_Stop_,
            req.query.Page_Length_,
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
});


router.get("/Search_View_All_transfer_stock/", function (req, res, next) {
	try {
		Purchase_Order_Master.Search_View_All_transfer_stock(
			req.query.Is_Date_Check_,
			req.query.FromDate_,
			req.query.ToDate_,
			req.query.supplier_id_,
			req.query.item_id_,
			req.query.brand_id_,
			req.query.status_id_,
			req.query.dept_id_,
			req.query.Catalogue_,
			req.query.Black_Start_,
			req.query.Black_Stop_,
			req.query.Page_Length_,
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
});

router.get('/Get_Review_Details_Edit/',function(req,res,next)
{ 
try 
{
    Purchase_Order_Master.Get_Review_Details_Edit( function (err, rows) 
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
    console.log(e);
}
finally 
{
}
 });

 router.get("/Search_View_All_Bundle_Details/", function (req, res, next) {
    try {
        Purchase_Order_Master.Search_View_All_Bundle_Details(
           
            req.query.supplier_id_,
            req.query.item_Id_,
			// req.query.Stock_Id_,
           
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
});

module.exports = router;
