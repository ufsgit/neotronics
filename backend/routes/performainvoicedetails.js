 var express = require('express');
 var router = express.Router();
 var performainvoicedetails=require('../models/performainvoicedetails');
 router.post('/Save_performainvoicedetails/',function(req,res,next)
 { 
 try 
 {
performainvoicedetails.Save_performainvoicedetails(req.body, function (err, rows) 
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
 router.get('/Search_performainvoicedetails/',function(req,res,next)
 { 
 try 
 {
performainvoicedetails.Search_performainvoicedetails(req.query.performainvoicedetails_Name, function (err, rows) 
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
 router.get('/Get_performainvoicedetails/:performainvoicedetails_Id_?',function(req,res,next)
 { 
 try 
 {
performainvoicedetails.Get_performainvoicedetails(req.params.performainvoicedetails_Id_, function (err, rows) 
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
 router.get('/Delete_performainvoicedetails/:performainvoicedetails_Id_?',function(req,res,next)
 { 
 try 
 {
performainvoicedetails.Delete_performainvoicedetails(req.params.performainvoicedetails_Id_, function (err, rows) 
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

