 var express = require('express');
 var router = express.Router();
 var Receipt_Reference=require('../models/Receipt_Reference');
 router.post('/Save_Receipt_Reference/',function(req,res,next)
 { 
 try 
 {
Receipt_Reference.Save_Receipt_Reference(req.body, function (err, rows) 
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
 router.get('/Search_Receipt_Reference/:Receipt_Reference_Name_?',function(req,res,next)
 { 
 try 
 {
Receipt_Reference.Search_Receipt_Reference(req.params.Receipt_Reference_Name_, function (err, rows) 
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
 router.get('/Get_Receipt_Reference/:Receipt_Reference_Id_?',function(req,res,next)
 { 
 try 
 {
Receipt_Reference.Get_Receipt_Reference(req.params.Receipt_Reference_Id_, function (err, rows) 
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
 router.get('/Delete_Receipt_Reference/:Receipt_Reference_Id_?',function(req,res,next)
 { 
 try 
 {
Receipt_Reference.Delete_Receipt_Reference(req.params.Receipt_Reference_Id_, function (err, rows) 
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

