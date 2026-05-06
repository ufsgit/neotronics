 var express = require('express');
 var router = express.Router();
 var quotation_delivery_order=require('../models/quotation_delivery_order');
 router.post('/Save_quotation_delivery_order/',function(req,res,next)
 { 
 try 
 {
quotation_delivery_order.Save_quotation_delivery_order(req.body, function (err, rows) 
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
 router.get('/Search_quotation_delivery_order/',function(req,res,next)
 { 
 try 
 {
quotation_delivery_order.Search_quotation_delivery_order(req.query.quotation_delivery_order_Name, function (err, rows) 
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
 router.get('/Get_quotation_delivery_order/:quotation_delivery_order_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_delivery_order.Get_quotation_delivery_order(req.params.quotation_delivery_order_Id_, function (err, rows) 
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
 router.get('/Delete_quotation_delivery_order/:quotation_delivery_order_Id_?',function(req,res,next)
 { 
 try 
 {
quotation_delivery_order.Delete_quotation_delivery_order(req.params.quotation_delivery_order_Id_, function (err, rows) 
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

