var express = require('express');
var router = express.Router();
var requirementworkflow = require('../models/requirementworkflow');

router.get('/List/', function (req, res, next) {
  requirementworkflow.List(req.query.status, function (err, rows) {
    if (err) return res.json(err);
    res.json(rows);
  });
});

router.get('/InitiatePriceRequest/:RequirementMaster_Id', function (req, res, next) {
  requirementworkflow.InitiatePriceRequest(req.params.RequirementMaster_Id, function (err, rows) {
    if (err) return res.json(err);
    res.json(rows);
  });
});

router.get('/LinkQuotation/:RequirementMaster_Id/:SalesQuotationMaster_Id', function (req, res, next) {
  requirementworkflow.LinkQuotation(req.params.RequirementMaster_Id, req.params.SalesQuotationMaster_Id, function (err, rows) {
    if (err) return res.json(err);
    res.json(rows);
  });
});

router.get('/LinkPriceRequest/:RequirementMaster_Id/:PriceRequestMaster_Id', function (req, res, next) {
  requirementworkflow.LinkPriceRequest(req.params.RequirementMaster_Id, req.params.PriceRequestMaster_Id, function (err, rows) {
    if (err) return res.json(err);
    res.json(rows);
  });
});

module.exports = router;

