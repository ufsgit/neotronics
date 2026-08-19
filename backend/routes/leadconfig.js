var express = require('express');
var router  = express.Router();

// ── Company Details Models ───────────────────────────────────────────────────
var Vertical    = require('../models/company_details/vertical/vertical');
var State       = require('../models/company_details/state/state');
var District    = require('../models/company_details/district/district');
var CompanySize = require('../models/company_details/company_size/company_size');
var Source      = require('../models/company_details/source/source');

// ============================================================
// COMPANY DETAILS — VERTICAL
// ============================================================

router.post('/company_details/vertical/Save', function (req, res) {
    try {
        Vertical.Save_Vertical(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/vertical/Search', function (req, res) {
    try {
        Vertical.Search_Vertical(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/vertical/Get/:id', function (req, res) {
    try {
        Vertical.Get_Vertical(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/vertical/Delete/:id', function (req, res) {
    try {
        Vertical.Delete_Vertical(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// ============================================================
// COMPANY DETAILS — STATE
// ============================================================

router.post('/company_details/state/Save', function (req, res) {
    try {
        State.Save_State(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/state/Search', function (req, res) {
    try {
        State.Search_State(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/state/Get/:id', function (req, res) {
    try {
        State.Get_State(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/state/Delete/:id', function (req, res) {
    try {
        State.Delete_State(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// ============================================================
// COMPANY DETAILS — DISTRICT
// ============================================================

router.post('/company_details/district/Save', function (req, res) {
    try {
        District.Save_District(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/district/Search', function (req, res) {
    try {
        var stateId = req.query.State_Id || null;
        District.Search_District(req.query.search || '', stateId, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/district/Get/:id', function (req, res) {
    try {
        District.Get_District(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/district/Delete/:id', function (req, res) {
    try {
        District.Delete_District(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// ============================================================
// COMPANY DETAILS — COMPANY SIZE
// ============================================================

router.post('/company_details/company_size/Save', function (req, res) {
    try {
        CompanySize.Save_CompanySize(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/company_size/Search', function (req, res) {
    try {
        CompanySize.Search_CompanySize(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/company_size/Get/:id', function (req, res) {
    try {
        CompanySize.Get_CompanySize(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/company_size/Delete/:id', function (req, res) {
    try {
        CompanySize.Delete_CompanySize(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// ============================================================
// COMPANY DETAILS — SOURCE
// ============================================================

router.post('/company_details/source/Save', function (req, res) {
    try {
        Source.Save_Source(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/source/Search', function (req, res) {
    try {
        Source.Search_Source(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/source/Get/:id', function (req, res) {
    try {
        Source.Get_Source(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/company_details/source/Delete/:id', function (req, res) {
    try {
        Source.Delete_Source(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
