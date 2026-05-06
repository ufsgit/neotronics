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
res.json(err);
}
else 
{
res.json(rows);
}
});
}
catch (e) 
{
}
finally 
{
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
res.json(err);
}
else 
{
res.json(rows);
}
});
}
catch (e) 
{
}
finally 
{
}
});

module.exports = router;

