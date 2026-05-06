const express = require('express');
const router = express.Router();
const LeadRequirement = require('../models/LeadRequirement');

router.get('/List/', function (req, res, next) {
  LeadRequirement.List(req.query.Lead_Id, function (err, rows) {
    if (err) return next(err);
    res.json(rows);
  });
});

router.get('/Get/:LeadRequirementMaster_Id', function (req, res, next) {
  LeadRequirement.Get(req.params.LeadRequirementMaster_Id, function (err, rows) {
    if (err) return next(err);
    res.json(rows);
  });
});

router.post('/Save/', function (req, res, next) {
  LeadRequirement.Save(req.body, function (err, rows) {
    if (err) return next(err);
    res.json(rows);
  });
});

module.exports = router;

