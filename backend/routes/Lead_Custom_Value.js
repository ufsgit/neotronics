var express = require('express');
var router = express.Router();
var Lead_Custom_Value = require('../models/Lead_Custom_Value');

router.post('/Save_Lead_Custom_Value/', function(req, res, next) {
    try {
        Lead_Custom_Value.Save_Lead_Custom_Value(req.body, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

router.get('/Get_Lead_Custom_Values/:Lead_Id_?', function(req, res, next) {
    try {
        Lead_Custom_Value.Get_Lead_Custom_Values(req.params.Lead_Id_, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

module.exports = router;
