var express = require('express');
var router = express.Router();
var New_FollowUp = require('../models/New_FollowUp');

router.post('/Save_FollowUp/', function (req, res, next) {
    New_FollowUp.Save_New_FollowUp(req.body, function (err, result) {
        if (err) return res.json(err);
        res.json(result);
    });
});

router.get('/Get_FollowUps/:Lead_Id', function (req, res, next) {
    New_FollowUp.Get_FollowUps_By_Lead(req.params.Lead_Id, function (err, rows) {
        if (err) return res.json(err);
        res.json(rows);
    });
});

module.exports = router;
