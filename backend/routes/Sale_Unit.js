var express = require('express');
var router = express.Router();
var Sale_Unit=require('../models/Sale_Unit');
router.post('/Save_Sale_Unit/',function(req,res,next)
  { 
  try 
  {
  Sale_Unit.Save_Sale_Unit(req.body, function (err, rows) 
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
router.get('/Search_Sale_Unit/:Sale_Unit_Name_?',function(req,res,next)
  { 
  try 
  {
  Sale_Unit.Search_Sale_Unit(req.params.Sale_Unit_Name_, function (err, rows) 
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
router.get('/Get_Sale_Unit/:Sale_Unit_Id_?',function(req,res,next)
  { 
  try 
  {
  Sale_Unit.Get_Sale_Unit(req.params.Sale_Unit_Id_, function (err, rows) 
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
router.get('/Delete_Sale_Unit/:Sale_Unit_Id_?',function(req,res,next)
  { 
  try 
  {
  Sale_Unit.Delete_Sale_Unit(req.params.Sale_Unit_Id_, function (err, rows) 
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

