var express = require('express');
var router = express.Router();
var Sales_Order_Master = require('../models/sales_order_master');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");

router.post('/Save_Sales_Order/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Order_Master.Save_Sales_Order(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_Sales_Order', function (req, res, next) {
    try {
        Sales_Order_Master.Search_Sales_Order(
            req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
            req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
            req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.AccountType_Id_, req.query.User_Details_Id_,
            req.query.User_Type, req.query.Login_User_Id,
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
    }
});

router.get('/Get_Sales_Order_Master/:Sales_Order_Master_Id_?', function (req, res, next) {
    try {
        Sales_Order_Master.Get_Sales_Order_Master(req.params.Sales_Order_Master_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Get_Sales_Order_Details/:Sales_Order_Master_Id_?', function (req, res, next) {
    try {
        Sales_Order_Master.Get_Sales_Order_Details(req.params.Sales_Order_Master_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Delete_Sales_Order_Master/:Sales_Order_Master_Id_?', function (req, res, next) {
    try {
        Sales_Order_Master.Delete_Sales_Order_Master(req.params.Sales_Order_Master_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

module.exports = router;
