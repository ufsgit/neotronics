var express = require('express');
var router = express.Router();
var Vertical = require('../models/Vertical');

router.post('/Save_Vertical/', function (req, res, next) {
    try {
        Vertical.Save_Vertical(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Search_Vertical', function (req, res, next) {
    try {
        Vertical.Search_Vertical(req.query.Vertical_Name_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Get_All_Industries', function (req, res, next) {
    try {
        Vertical.Get_All_Industries(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Delete_Vertical/:Vertical_Id_?', function (req, res, next) {
    try {
        Vertical.Delete_Vertical(req.params.Vertical_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

router.get('/Get_Vertical/:Vertical_Id_?', function (req, res, next) {
    try {
        Vertical.Get_Vertical(req.params.Vertical_Id_, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;
