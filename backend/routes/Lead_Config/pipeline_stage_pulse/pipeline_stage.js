var express = require('express');
var router  = express.Router();
var PipelineStage = require('../../../models/Lead_Config/pipeline_stage_pulse/pipeline_stage');

router.post('/Save', function (req, res) {
    try {
        PipelineStage.Save_Pipeline_Stage(req.body, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Search', function (req, res) {
    try {
        PipelineStage.Search_Pipeline_Stage(req.query.search || '', function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Get/:id', function (req, res) {
    try {
        PipelineStage.Get_Pipeline_Stage(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

router.get('/Delete/:id', function (req, res) {
    try {
        PipelineStage.Delete_Pipeline_Stage(req.params.id, function (err, rows) {
            if (err) return res.json(err);
            res.json(rows[0]);
        });
    } catch (e) { res.json(e); }
});

module.exports = router;
