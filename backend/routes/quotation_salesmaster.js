 var express = require('express');
 var router = express.Router();
 var quotation_salesmaster=require('../models/quotation_salesmaster');
 router.post('/Save_quotation_salesmaster/',function(req,res,next)
 { 
 try 
 {
quotation_salesmaster.Save_quotation_salesmaster(req.body, function (err, rows) 
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
 router.get('/Search_quotation_salesmaster/',function(req,res,next)
 { 
 try 
 {
quotation_salesmaster.Search_quotation_salesmaster(req.query.quotation_salesmaster_Name, function (err, rows) 
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
 router.get('/Get_quotation_salesmaster/:quotation_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_salesmaster.Get_quotation_salesmaster(req.params.quotation_salesmaster_Id_, function (err, rows) 
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
 router.get('/Delete_quotation_salesmaster/:quotation_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_salesmaster.Delete_quotation_salesmaster(req.params.quotation_salesmaster_Id_, function (err, rows) 
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

