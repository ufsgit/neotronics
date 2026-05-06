 var express = require('express');
 var router = express.Router();
 var purchase_return_details=require('../models/purchase_return_details');
 router.post('/Save_purchase_return_details/',function(req,res,next)
 { 
 try 
 {
purchase_return_details.Save_purchase_return_details(req.body, function (err, rows) 
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
 router.get('/Search_purchase_return_details/',function(req,res,next)
 { 
 try 
 {
purchase_return_details.Search_purchase_return_details(req.query.purchase_return_details_Name, function (err, rows) 
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
 router.get('/Get_purchase_return_details/:purchase_return_details_Id_?',function(req,res,next)
 { 
 try 
 {
purchase_return_details.Get_purchase_return_details(req.params.purchase_return_details_Id_, function (err, rows) 
 {
  if (err) 
  {
    console.log(err)
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
 router.get('/Delete_purchase_return_details/:purchase_return_details_Id_?',function(req,res,next)
 { 
 try 
 {
purchase_return_details.Delete_purchase_return_details(req.params.purchase_return_details_Id_, function (err, rows) 
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

