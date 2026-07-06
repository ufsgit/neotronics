var express = require('express');
var router = express.Router();
var OperationsDashboard = require('../models/OperationsDashboard');

router.post('/Get_Operations_Dashboard_Data/', function (req, res, next) {
    try {
        OperationsDashboard.Get_Operations_Dashboard_Data(req.body, function (err, rows) {
            if (err) {
                console.error("Error in Get_Operations_Dashboard_Data:", err);
                res.status(500).json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error("Exception in Get_Operations_Dashboard_Data:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

module.exports = router;
