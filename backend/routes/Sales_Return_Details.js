 var express = require('express');
 var router = express.Router();
 var sales_return_details=require('../models/Sales_Return_Details');
 router.post('/Save_sales_return_details/',function(req,res,next)
 { 
 try 
 {
sales_return_details.Save_sales_return_details(req.body, function (err, rows) 
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
 router.get('/Search_sales_return_details/',function(req,res,next)
 { 
 try 
 {
sales_return_details.Search_sales_return_details(req.query.sales_return_details_Name, function (err, rows) 
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
 router.get('/Get_sales_return_details/:sales_return_details_Id_?',function(req,res,next)
 { 
 try 
 {
sales_return_details.Get_sales_return_details(req.params.sales_return_details_Id_, function (err, rows) 
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
 router.get('/Delete_sales_return_details/:sales_return_details_Id_?',function(req,res,next)
 { 
 try 
 {
sales_return_details.Delete_sales_return_details(req.params.sales_return_details_Id_, function (err, rows) 
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

