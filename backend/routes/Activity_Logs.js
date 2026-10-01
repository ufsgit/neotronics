var express = require('express');
var router = express.Router();
var ActivityLogs = require('../models/Activity_Logs');

router.get('/Get_Activity_Logs_Summary/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;

        ActivityLogs.Get_Activity_Logs_Summary(startDate, endDate, function (err, rows) {
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

router.get('/Get_Activity_Logs_List/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        
        ActivityLogs.Get_Activity_Logs_List(startDate, endDate, function (err, rows) {
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
