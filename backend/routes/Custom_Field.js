var express = require('express');
var router = express.Router();
var Custom_Field = require('../models/Custom_Field');

router.post('/Save_Custom_Field/', function(req, res, next) {
    try {
        Custom_Field.Save_Custom_Field(req.body, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

router.get('/Search_Custom_Field/', function(req, res, next) {
    try {
        Custom_Field.Search_Custom_Field(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

router.get('/Delete_Custom_Field/:Custom_Field_Id_?', function(req, res, next) {
    try {
        Custom_Field.Delete_Custom_Field(req.params.Custom_Field_Id_, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

router.get('/Get_Field_Types/', function(req, res, next) {
    try {
        Custom_Field.Get_Field_Types(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {} finally {}
});

module.exports = router;
