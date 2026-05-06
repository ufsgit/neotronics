 var express = require('express');
 var router = express.Router();
 var sales_quotation_order=require('../models/sales_quotation_order');
 router.post('/Save_sales_quotation_order/',function(req,res,next)
 { 
 try 
 {
sales_quotation_order.Save_sales_quotation_order(req.body, function (err, rows) 
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
 router.get('/Search_sales_quotation_order/',function(req,res,next)
 { 
 try 
 {
sales_quotation_order.Search_sales_quotation_order(req.query.sales_quotation_order_Name, function (err, rows) 
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
 router.get('/Get_sales_quotation_order/:sales_quotation_order_Id_?',function(req,res,next)
 { 
 try 
 {
sales_quotation_order.Get_sales_quotation_order(req.params.sales_quotation_order_Id_, function (err, rows) 
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
 router.get('/Delete_sales_quotation_order/:sales_quotation_order_Id_?',function(req,res,next)
 { 
 try 
 {
sales_quotation_order.Delete_sales_quotation_order(req.params.sales_quotation_order_Id_, function (err, rows) 
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

