var express = require('express');
var router = express.Router();
var ActivityLogs = require('../models/Activity_Logs');

// SP: Activity_Logs_KPIs()
router.get('/Activity_Logs_KPIs/', function (req, res, next) {
    try {
        ActivityLogs.Activity_Logs_KPIs(function (err, data) {
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
        ActivityLogs.Activity_Logs_Type_Chart(startDate, endDate, function (err, data) {
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
        ActivityLogs.Activity_Logs_Dept_Chart(startDate, endDate, function (err, data) {
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
        ActivityLogs.Activity_Logs_Staff_Chart(startDate, endDate, function (err, data) {
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
        ActivityLogs.Activity_Logs_List_Paginated(startDate, endDate, page, limit, function (err, data) {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.json(data);
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

module.exports = router;
