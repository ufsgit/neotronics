 var express = require('express');
 var router = express.Router();
 var Stock_Details=require('../models/Stock_Details');
 router.post('/Save_Stock_Details/',function(req,res,next)
 { 
 try 
 {
Stock_Details.Save_Stock_Details(req.body, function (err, rows) 
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
 router.get('/Search_Stock_Details/:Stock_Details_Name_?',function(req,res,next)
 { 
 try 
 {
Stock_Details.Search_Stock_Details(req.params.Stock_Details_Name_, function (err, rows) 
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
 router.get('/Get_Stock_Details/:Stock_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Stock_Details.Get_Stock_Details(req.params.Stock_Details_Id_, function (err, rows) 
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
 router.get('/Delete_Stock_Details/:Stock_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Stock_Details.Delete_Stock_Details(req.params.Stock_Details_Id_, function (err, rows) 
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

