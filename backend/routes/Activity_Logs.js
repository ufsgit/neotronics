var express = require('express');
var router = express.Router();
var ActivityLogs = require('../models/Activity_Logs');

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


// SP: Activity_Logs_KPIs()
router.get('/Activity_Logs_KPIs/', function (req, res, next) {
    try {
        const { userId, userTypeId } = getUserInfo(req);
        ActivityLogs.Activity_Logs_KPIs(userId, userTypeId, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// SP: Activity_Logs_Type_Chart(startDate, endDate)
router.get('/Activity_Logs_Type_Chart/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        ActivityLogs.Activity_Logs_Type_Chart(startDate, endDate, userId, userTypeId, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// SP: Activity_Logs_Dept_Chart(startDate, endDate)
router.get('/Activity_Logs_Dept_Chart/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        ActivityLogs.Activity_Logs_Dept_Chart(startDate, endDate, userId, userTypeId, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// SP: Activity_Logs_Staff_Chart(startDate, endDate)
router.get('/Activity_Logs_Staff_Chart/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const { userId, userTypeId } = getUserInfo(req);
        ActivityLogs.Activity_Logs_Staff_Chart(startDate, endDate, userId, userTypeId, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// SP: Activity_Logs_List_Paginated(startDate, endDate, page, limit)
router.get('/Activity_Logs_List_Paginated/', function (req, res, next) {
    try {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { userId, userTypeId } = getUserInfo(req);
        ActivityLogs.Activity_Logs_List_Paginated(startDate, endDate, page, limit, userId, userTypeId, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

module.exports = router;
