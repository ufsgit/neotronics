var express = require('express');
var router = express.Router();
var DashboardV2 = require('../models/DashboardV2');

router.get('/DashboardV2_PipelineTop3/', function(req, res, next) { 
    try {
        DashboardV2.DashboardV2_PipelineTop3(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/DashboardV2_PipelineAll/', function(req, res, next) { 
    try {
        DashboardV2.DashboardV2_PipelineAll(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/DashboardV2_PipelineMetrics/', function(req, res, next) { 
    try {
        DashboardV2.DashboardV2_PipelineMetrics(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/DashboardV2_PulseMetrics/', function(req, res, next) { 
    try {
        DashboardV2.DashboardV2_PulseMetrics(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/DashboardV2_SourceMetrics/', function(req, res, next) { 
    try {
        DashboardV2.DashboardV2_SourceMetrics(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
