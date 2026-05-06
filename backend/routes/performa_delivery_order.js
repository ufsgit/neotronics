 var express = require('express');
 var router = express.Router();
 var performa_delivery_order=require('../models/performa_delivery_order');
 router.post('/Save_performa_delivery_order/',function(req,res,next)
 { 
 try 
 {
performa_delivery_order.Save_performa_delivery_order(req.body, function (err, rows) 
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
 router.get('/Search_performa_delivery_order/',function(req,res,next)
 { 
 try 
 {
performa_delivery_order.Search_performa_delivery_order(req.query.performa_delivery_order_Name, function (err, rows) 
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
 router.get('/Get_performa_delivery_order/:performa_delivery_order_Id_?',function(req,res,next)
 { 
 try 
 {
performa_delivery_order.Get_performa_delivery_order(req.params.performa_delivery_order_Id_, function (err, rows) 
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
 router.get('/Delete_performa_delivery_order/:performa_delivery_order_Id_?',function(req,res,next)
 { 
 try 
 {
performa_delivery_order.Delete_performa_delivery_order(req.params.performa_delivery_order_Id_, function (err, rows) 
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

