 var express = require('express');
 var router = express.Router();
 var quotation_performa=require('../models/quotation_performa');
 router.post('/Save_quotation_performa/',function(req,res,next)
 { 
 try 
 {
quotation_performa.Save_quotation_performa(req.body, function (err, rows) 
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
 router.get('/Search_quotation_performa/',function(req,res,next)
 { 
 try 
 {
quotation_performa.Search_quotation_performa(req.query.quotation_performa_Name, function (err, rows) 
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
 router.get('/Get_quotation_performa/:quotation_performa_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_performa.Get_quotation_performa(req.params.quotation_performa_Id_, function (err, rows) 
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
 router.get('/Delete_quotation_performa/:quotation_performa_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_performa.Delete_quotation_performa(req.params.quotation_performa_Id_, function (err, rows) 
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

