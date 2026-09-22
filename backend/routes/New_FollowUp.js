var express = require('express');
var router = express.Router();
var New_FollowUp = require('../models/New_FollowUp');

router.post('/Save_NewFollowUp/', function (req, res, next) {
    New_FollowUp.Save_NewFollowUp(req.body, function (err, result) {
        if (err) return res.json(err);
        res.json(result);
    });
});

router.get('/GetLeadInteractionHistory/:Lead_Id_?', function (req, res, next) {
    try {
        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 10;
        var offset = (page - 1) * limit;

        New_FollowUp.GetLeadInteractionHistory(req.params.Lead_Id_, offset, limit, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});

module.exports = router;
