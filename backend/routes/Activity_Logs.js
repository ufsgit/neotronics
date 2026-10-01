var express = require('express');
var router = express.Router();
var ActivityLogs = require('../models/Activity_Logs');

router.get('/Get_Activity_Logs_Summary/', function (req, res, next) {
    try {
        ActivityLogs.Get_Activity_Logs_Summary(function (err, rows) {
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
