var express = require('express');
var router = express.Router();
var Model=require('../models/Model');
router.post('/Save_Model/',function(req,res,next)
{ 
    try 
    {
        Model.Save_Model(req.body, function (err, rows) 
        {
            if (err) 
            {
                console.error('Model.Save_Model error:', err);
                res.status(500).json({ error: 'Model save failed', details: err });
            }
            else 
            {
                res.json(rows);
            }
        });
    }
    catch (e) 
    {
        console.error('Model.Save_Model exception:', e);
        res.status(500).json({ error: 'Model save exception', details: e });
    }
});
router.get('/Search_Model/',function(req,res,next)
{ 
    try 
    {
        Model.Search_Model(req.query.Model_Name, function (err, rows) 
        {
            if (err) 
            {
                console.error('Model.Search_Model error:', err);
                res.status(500).json({ error: 'Model search failed', details: err });
            }
            else 
            {
                res.json(rows);
            }
        });
    }
    catch (e) 
    {
        console.error('Model.Search_Model exception:', e);
        res.status(500).json({ error: 'Model search exception', details: e });
    }
});
router.get('/Delete_Model/:Model_Id_',function(req,res,next)
{ 
    try 
    {
        Model.Delete_Model(req.params.Model_Id_, function (err, rows) 
        {
            if (err) 
            {
                console.error('Model.Delete_Model error:', err);
                res.status(500).json({ error: 'Model delete failed', details: err });
            }
            else 
            {
                res.json(rows);
            }
        });
    }
    catch (e) 
    {
        console.error('Model.Delete_Model exception:', e);
        res.status(500).json({ error: 'Model delete exception', details: e });
    }
});

module.exports = router;

