var express = require('express');
var router = express.Router();
var DepartmentStatus = require('../models/DepartmentStatus');

router.post('/Save_DepartmentStatus/', function (req, res, next) {
    try {
        DepartmentStatus.Save_DepartmentStatus(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Search_DepartmentStatus', function (req, res, next) {
    try {
        DepartmentStatus.Search_DepartmentStatus(req.query.DepartmentStatus_Name_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
    }
});

router.get('/Delete_DepartmentStatus/:DepartmentStatus_Id_?', function (req, res, next) {
    try {
        DepartmentStatus.Delete_DepartmentStatus(req.params.DepartmentStatus_Id_, function (err, rows) {
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
