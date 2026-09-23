var express = require('express');
var router = express.Router();
var CalendarFollowUp = require('../models/CalendarFollowUp');

router.get('/GetCalendarFollowUps', function (req, res, next) {
    var User_Id = req.query.User_Id ? parseInt(req.query.User_Id) : 0;
    var ViewType = req.query.ViewType || 'DAY';
    var CurrentDate = req.query.CurrentDate || new Date().toISOString().split('T')[0];

    CalendarFollowUp.GetCalendarFollowUps(User_Id, ViewType, CurrentDate, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
