 var express = require('express');
 var router = express.Router();
 var performainvoicemaster=require('../models/performainvoicemaster');
 router.post('/Save_performainvoicemaster/',function(req,res,next)
 { 
 try 
 {
performainvoicemaster.Save_performainvoicemaster(req.body, function (err, rows) 
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
 router.get('/Search_performainvoicemaster/',function(req,res,next)
 { 
 try 
 {
performainvoicemaster.Search_performainvoicemaster(req.query.performainvoicemaster_Name, function (err, rows) 
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
 router.get('/Get_performainvoicemaster/:performainvoicemaster_Id_?',function(req,res,next)
 { 
 try 
 {
performainvoicemaster.Get_performainvoicemaster(req.params.performainvoicemaster_Id_, function (err, rows) 
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
 router.get('/Delete_performainvoicemaster/:performainvoicemaster_Id_?',function(req,res,next)
 { 
 try 
 {
performainvoicemaster.Delete_performainvoicemaster(req.params.performainvoicemaster_Id_, function (err, rows) 
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

