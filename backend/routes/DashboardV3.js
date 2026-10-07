var express = require('express');
var router = express.Router();
var DashboardV3 = require('../models/DashboardV3');

function getUserInfo(req) {
    let userId = 0, userTypeId = 0;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const config = require('../config.json');
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(token, config.secret);
            if (decoded && decoded.sub) {
                userId = decoded.sub.User_Details_Id || 0;
                userTypeId = decoded.sub.User_Type_Id || 0;
            }
        } catch (err) { }
    }
    return { userId, userTypeId };
}


router.get('/', function(req, res, next) { 
    try {
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getDashboardV3Data(userId, userTypeId, function (err, rows) {
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
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getKPIs(userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/Pipeline', function(req, res, next) { 
    try {
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getPipeline(userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/FollowUpSummary', function(req, res, next) { 
    try {
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getFollowUp(userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityDay', function(req, res, next) { 
    try {
        const fromDate = req.query.fromDate || null;
        const toDate = req.query.toDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getActivityDay(fromDate, toDate, userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityWeek', function(req, res, next) { 
    try {
        const fromDate = req.query.fromDate || null;
        const toDate = req.query.toDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getActivityWeek(fromDate, toDate, userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/ActivityMonth', function(req, res, next) { 
    try {
        const fromDate = req.query.fromDate || null;
        const toDate = req.query.toDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        DashboardV3.getActivityMonth(fromDate, toDate, userId, userTypeId, function (err, rows) {
            if (err) res.json(err); else res.json(rows);
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
