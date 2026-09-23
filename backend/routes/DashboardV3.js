var express = require('express');
var router = express.Router();
var DashboardV3 = require('../models/DashboardV3');

router.get('/', function(req, res, next) { 
    try {
        DashboardV3.getDashboardV3Data(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
});

router.get('/KPI', function(req, res, next) { 
    try {
        DashboardV3.getKPIs(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/Pipeline', function(req, res, next) { 
    try {
        DashboardV3.getPipeline(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/FollowUpSummary', function(req, res, next) { 
    try {
        DashboardV3.getFollowUp(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityDay', function(req, res, next) { 
    try {
        DashboardV3.getActivityDay(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityWeek', function(req, res, next) { 
    try {
        DashboardV3.getActivityWeek(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityMonth', function(req, res, next) { 
    try {
        DashboardV3.getActivityMonth(function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
