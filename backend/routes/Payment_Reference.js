 var express = require('express');
 var router = express.Router();
 var Payment_Reference=require('../models/Payment_Reference');
 router.post('/Save_Payment_Reference/',function(req,res,next)
 { 
 try 
 {
Payment_Reference.Save_Payment_Reference(req.body, function (err, rows) 
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
 router.get('/Search_Payment_Reference/:Payment_Reference_Name_?',function(req,res,next)
 { 
 try 
 {
Payment_Reference.Search_Payment_Reference(req.params.Payment_Reference_Name_, function (err, rows) 
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
 router.get('/Get_Payment_Reference/:Payment_Voucher_Id_?',function(req,res,next)
 { 
 try 
 {
Payment_Reference.Get_Payment_Reference(req.params.Payment_Voucher_Id_, function (err, rows) 
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
 router.get('/Delete_Payment_Reference/:Payment_Reference_Id_?',function(req,res,next)
 { 
 try 
 {
Payment_Reference.Delete_Payment_Reference(req.params.Payment_Reference_Id_, function (err, rows) 
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

