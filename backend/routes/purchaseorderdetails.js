 var express = require('express');
 var router = express.Router();
 var purchaseorderdetails=require('../models/purchaseorderdetails');
 router.post('/Save_purchaseorderdetails/',function(req,res,next)
 { 
 try 
 {
purchaseorderdetails.Save_purchaseorderdetails(req.body, function (err, rows) 
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
 router.get('/Search_purchaseorderdetails/',function(req,res,next)
 { 
 try 
 {
purchaseorderdetails.Search_purchaseorderdetails(req.query.purchaseorderdetails_Name, function (err, rows) 
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
 router.get('/Get_purchaseorderdetails/:purchaseorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseorderdetails.Get_purchaseorderdetails(req.params.purchaseorderdetails_Id_, function (err, rows) 
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
 router.get('/Delete_purchaseorderdetails/:purchaseorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseorderdetails.Delete_purchaseorderdetails(req.params.purchaseorderdetails_Id_, function (err, rows) 
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

