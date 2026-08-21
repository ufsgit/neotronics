var express = require('express');
var router  = express.Router();
var FollowupAutomation = require('../../../models/Lead_Config/followup_automation/followup_automation');

router.post('/Save', function (req, res) {
    try {
        FollowupAutomation.Save_Followup_Automation(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Search', function (req, res) {
    try {
        FollowupAutomation.Search_Followup_Automation(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Get/:id', function (req, res) {
    try {
        FollowupAutomation.Get_Followup_Automation(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        FollowupAutomation.Delete_Followup_Automation(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
