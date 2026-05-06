 var express = require('express');
 var router = express.Router();
 var sales_delivery=require('../models/sales_delivery');
 router.post('/Save_sales_delivery/',function(req,res,next)
 { 
 try 
 {
sales_delivery.Save_sales_delivery(req.body, function (err, rows) 
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
 router.get('/Search_sales_delivery/',function(req,res,next)
 { 
 try 
 {
sales_delivery.Search_sales_delivery(req.query.sales_delivery_Name, function (err, rows) 
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
 router.get('/Get_sales_delivery/:sales_delivery_Id_?',function(req,res,next)
 { 
 try 
 {
sales_delivery.Get_sales_delivery(req.params.sales_delivery_Id_, function (err, rows) 
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
 router.get('/Delete_sales_delivery/:sales_delivery_Id_?',function(req,res,next)
 { 
 try 
 {
sales_delivery.Delete_sales_delivery(req.params.sales_delivery_Id_, function (err, rows) 
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

