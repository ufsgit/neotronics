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

module.exports = router;
