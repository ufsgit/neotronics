var express = require('express');
var router  = express.Router();
var Vertical = require('../../../models/Lead_Config/company_details/vertical');

router.post('/Save', function (req, res) {
    try {
        Vertical.Save_Vertical(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Search', function (req, res) {
    try {
        Vertical.Search_Vertical(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Get/:id', function (req, res) {
    try {
        Vertical.Get_Vertical(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        Vertical.Delete_Vertical(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
