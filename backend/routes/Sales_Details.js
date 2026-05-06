 var express = require('express');
 var router = express.Router();
 var Sales_Details=require('../models/Sales_Details');
 router.post('/Save_Sales_Details/',function(req,res,next)
 { 
 try 
 {
Sales_Details.Save_Sales_Details(req.body, function (err, rows) 
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
 router.get('/Search_Sales_Details/:Sales_Details_Name_?',function(req,res,next)
 { 
 try 
 {
Sales_Details.Search_Sales_Details(req.params.Sales_Details_Name_, function (err, rows) 
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
 router.get('/Get_Sales_Details/:Sales_Master_Id_?',function(req,res,next)
 { 
 try 
 {
Sales_Details.Get_Sales_Details(req.params.Sales_Master_Id_, function (err, rows) 
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
  
  router.get('/Get_Sales_Details_Mobile/:Sales_Master_Id_?',function(req,res,next)
 { 
 try 
 {
Sales_Details.Get_Sales_Details_Mobile(req.params.Sales_Master_Id_, function (err, rows) 
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
 router.get('/Delete_Sales_Details/:Sales_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Sales_Details.Delete_Sales_Details(req.params.Sales_Details_Id_, function (err, rows) 
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

