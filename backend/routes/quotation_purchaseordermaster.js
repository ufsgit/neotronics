 var express = require('express');
 var router = express.Router();
 var quotation_purchaseordermaster=require('../models/quotation_purchaseordermaster');
 router.post('/Save_quotation_purchaseordermaster/',function(req,res,next)
 { 
 try 
 {
quotation_purchaseordermaster.Save_quotation_purchaseordermaster(req.body, function (err, rows) 
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
 router.get('/Search_quotation_purchaseordermaster/',function(req,res,next)
 { 
 try 
 {
quotation_purchaseordermaster.Search_quotation_purchaseordermaster(req.query.quotation_purchaseordermaster_Name, function (err, rows) 
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
 router.get('/Get_quotation_purchaseordermaster/:quotation_purchaseordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_purchaseordermaster.Get_quotation_purchaseordermaster(req.params.quotation_purchaseordermaster_Id_, function (err, rows) 
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
 router.get('/Delete_quotation_purchaseordermaster/:quotation_purchaseordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_purchaseordermaster.Delete_quotation_purchaseordermaster(req.params.quotation_purchaseordermaster_Id_, function (err, rows) 
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

