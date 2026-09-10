var express = require('express');
var router  = express.Router();
var PipelineStage = require('../../../models/Lead_Config/pipeline_stage_pulse/pipeline_stage');

// Save (Insert or Update)
router.post('/Save', function (req, res) {
    try {
        PipelineStage.Save_Pipeline_Stage(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// Search — supports both GET and POST
router.get('/Search', function (req, res) {
    try {
        PipelineStage.Search_Pipeline_Stage(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.post('/Search', function (req, res) {
    try {
        var search = (req.body && req.body.search) ? req.body.search : '';
        PipelineStage.Search_Pipeline_Stage(search, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// Get single record
router.get('/Get/:id', function (req, res) {
    try {
        PipelineStage.Get_Pipeline_Stage(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

// Delete
router.get('/Delete/:id', function (req, res) {
    try {
        PipelineStage.Delete_Pipeline_Stage(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
