var express = require('express');
var router = express.Router();
var requirementdetails = require('../models/requirementdetails');

router.post('/Save_requirementdetails/',function(req,res,next)
{
try
{
requirementdetails.Save_requirementdetails(req.body, function (err, rows)
{
 if (err)
 {
  console.error('Save_requirementdetails failed:', err);
  return res.status(500).json({ message: 'Save_requirementdetails failed', error: err.message || err });
 }
 else
 {
  return res.json(rows);
 }
});
}
catch (e)
{
  console.error('Save_requirementdetails error:', e);
  return res.status(500).json({ message: 'Save_requirementdetails exception', error: e.message || e });
}
});

router.get('/Search_requirementdetails/',function(req,res,next)
{
try
{
requirementdetails.Search_requirementdetails(req.query.requirementdetails_Name, function (err, rows)
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

router.get('/Get_requirementdetails/:requirementdetails_Id_?',function(req,res,next)
{
try
{
requirementdetails.Get_requirementdetails(req.params.requirementdetails_Id_, function (err, rows)
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

router.get('/Delete_requirementdetails/:requirementdetails_Id_?',function(req,res,next)
{
try
{
requirementdetails.Delete_requirementdetails(req.params.requirementdetails_Id_, function (err, rows)
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
