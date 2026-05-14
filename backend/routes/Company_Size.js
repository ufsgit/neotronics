var express = require('express');
var router = express.Router();
var Company_Size = require('../models/Company_Size');

router.post('/Save_Company_Size/', function (req, res, next) {
    try {
        Company_Size.Save_Company_Size(req.body, function (err, rows) {
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

router.get('/Search_Company_Size', function (req, res, next) {
    try {
        Company_Size.Search_Company_Size(req.query.Company_Size_Name_, function (err, rows) {
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

router.get('/Get_All_Company_Sizes', function (req, res, next) {
    try {
        Company_Size.Get_All_Company_Sizes(function (err, rows) {
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

router.get('/Delete_Company_Size/:Company_Size_Id_?', function (req, res, next) {
    try {
        Company_Size.Delete_Company_Size(req.params.Company_Size_Id_, function (err, rows) {
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

router.get('/Get_Company_Size/:Company_Size_Id_?', function (req, res, next) {
    try {
        Company_Size.Get_Company_Size(req.params.Company_Size_Id_, function (err, rows) {
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
