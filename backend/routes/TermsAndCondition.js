var express = require('express');
var router = express.Router();
var TermsAndCondition = require('../models/TermsAndCondition');

router.post('/Save_TermsAndCondition/', function (req, res, next) {
    try {
        TermsAndCondition.Save_TermsAndCondition(req.body, function (err, rows) {
            if (err) {
                console.error('Save_TermsAndCondition error:', err);
                res.status(500).json({ error: 'Save failed', details: err });
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error('Save_TermsAndCondition exception:', e);
        res.status(500).json({ error: 'Save exception', details: e });
    }
});

router.get('/Search_TermsAndCondition/', function (req, res, next) {
    try {
        TermsAndCondition.Search_TermsAndCondition(req.query.Caption, function (err, rows) {
            if (err) {
                console.error('Search_TermsAndCondition error:', err);
                res.status(500).json({ error: 'Search failed', details: err });
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error('Search_TermsAndCondition exception:', e);
        res.status(500).json({ error: 'Search exception', details: e });
    }
});

module.exports = router;
