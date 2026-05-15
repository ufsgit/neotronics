var express = require('express');
var router = express.Router();
var Department = require('../models/Department');

router.post('/Save_Department/', function (req, res, next) {
    try {
        Department.Save_Department(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Search_Department', function (req, res, next) {
    try {
        Department.Search_Department(req.query.Department_Name_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Delete_Department/:Department_Id_?', function (req, res, next) {
    try {
        Department.Delete_Department(req.params.Department_Id_, function (err, rows) {
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
