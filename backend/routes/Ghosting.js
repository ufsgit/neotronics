var express = require('express');
var router = express.Router();
var Ghosting = require('../models/Ghosting');

router.get('/Get_Ghosting_KPI/', function (req, res, next) {
    try {
        Ghosting.Get_Ghosting_KPI(function (err, rows) {
            if (err) {
                res.status(500).json({ error: err.message || String(err) });
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error("Exception in Get_Ghosting_KPI:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

router.get('/Get_Ghosting_Stage_Summary/', function (req, res, next) {
    try {
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;
        
        Ghosting.Get_Ghosting_Stage_Summary(limit, offset, function (err, rows) {
            if (err) {
                res.status(500).json({ error: err.message || String(err) });
            } else {
                // Return just the first array (result set) like we usually do for SPs returning a single select
                res.json(rows && rows.length > 0 ? rows[0] : []);
            }
        });
    } catch (e) {
        console.error("Exception in Get_Ghosting_Stage_Summary:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

router.get('/Get_Ghosting_Charts_Data/', function (req, res, next) {
    try {
        const type = req.query.type;
        Ghosting.Get_Ghosting_Charts_Data(type, function (err, rows) {
            if (err) {
                res.status(500).json({ error: err.message || String(err) });
            } else {
                res.json(rows && rows.length > 0 ? rows[0] : []);
            }
        });
    } catch (e) {
        console.error("Exception in Get_Ghosting_Charts_Data:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

router.get('/Get_Ghosting_Register/', function (req, res, next) {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const search = req.query.search || null;
        const is_current = req.query.is_current !== undefined && req.query.is_current !== 'null' ? parseInt(req.query.is_current, 10) : null;

        Ghosting.Get_Ghosting_Register(limit, offset, search, is_current, function (err, rows) {
            if (err) {
                res.status(500).json({ error: err.message || String(err) });
            } else {
                // rows[0] contains the data, rows[1] contains the TotalCount
                const data = rows && rows.length > 0 ? rows[0] : [];
                const totalCount = rows && rows.length > 1 && rows[1].length > 0 ? rows[1][0].TotalCount : 0;
                res.json({ data: data, totalCount: totalCount });
            }
        });
    } catch (e) {
        console.error("Exception in Get_Ghosting_Register:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

module.exports = router;
