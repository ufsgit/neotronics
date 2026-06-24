var express = require('express');
var router = express.Router();
var Price_Response = require('../models/Price_Response');

router.post('/Save_Price_Response/', function (req, res, next) {
    try {
        Price_Response.Save_Price_Response(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Search_Price_Response', function (req, res, next) {
    try {
        console.log("Search_Price_Response called with params:", req.query);
        Price_Response.Search_Price_Response(req.query.Look_In_Date, req.query.From_Date, req.query.To_Date, req.query.Supplier_Id, req.query.Price_RequestNo, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Get_Price_Response/:Price_Response_Master_Id_?', function (req, res, next) {
    try {
        Price_Response.Get_Price_Response(req.params.Price_Response_Master_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Delete_Price_Response/:Price_Response_Master_Id_?', function (req, res, next) {
    try {
        Price_Response.Delete_Price_Response(req.params.Price_Response_Master_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Get_Next_Price_Response_No', function (req, res, next) {
    try {
        Price_Response.Get_Next_Price_Response_No(req.query.EntryDate_, function (err, rows) {
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
