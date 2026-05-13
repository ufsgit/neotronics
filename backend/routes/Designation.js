var express = require('express');
var router = express.Router();
var Designation = require('../models/Designation');

router.post('/Save_Designation/', function (req, res, next) {
    try {
        Designation.Save_Designation(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Search_Designation', function (req, res, next) {
    try {
        Designation.Search_Designation(req.query.Designation_Name_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Delete_Designation/:Designation_Id_?', function (req, res, next) {
    try {
        Designation.Delete_Designation(req.params.Designation_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Get_Designation/:Designation_Id_?', function (req, res, next) {
    try {
        Designation.Get_Designation(req.params.Designation_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;
