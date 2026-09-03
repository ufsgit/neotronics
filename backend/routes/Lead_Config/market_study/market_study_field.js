var express = require('express');
var router  = express.Router();
var MarketStudyField = require('../../../models/Lead_Config/market_study/market_study_field');

router.get('/GetByCategory/:id', function (req, res) {
    try {
        var search = req.query.search || '';
        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 10;
        MarketStudyField.Get_Fields_By_Category(req.params.id, search, page, limit, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows);
        });
    } catch (e) { res.json(e); }
});

router.post('/Save', function (req, res) {
    try {
        MarketStudyField.Save_Field(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        MarketStudyField.Delete_Field(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
