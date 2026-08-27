var express = require('express');
var router  = express.Router();
var Branch = require('../../../models/Lead_Config/assignment/branch');

router.post('/Save', function (req, res) {
    try {
        Branch.Save_Branch(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Search', function (req, res) {
    try {
        Branch.Search_Branch(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Get/:id', function (req, res) {
    try {
        Branch.Get_Branch(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        Branch.Delete_Branch(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
