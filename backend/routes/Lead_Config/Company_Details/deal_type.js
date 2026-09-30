var express  = require('express');
var router   = express.Router();
var DealType = require('../../../models/Lead_Config/company_details/deal_type');

router.post('/Save', function (req, res) {
    try {
        DealType.Save_DealType(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Search', function (req, res) {
    try {
        var page     = parseInt(req.query.page)     || 1;
        var pageSize = parseInt(req.query.pageSize) || 20;
        DealType.Search_DealType(req.query.search || '', page, pageSize, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Get/:id', function (req, res) {
    try {
        DealType.Get_DealType(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        DealType.Delete_DealType(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
