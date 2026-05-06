 var express = require('express');
 var router = express.Router();
 var salesorderdetails=require('../models/salesorderdetails');
 router.post('/Save_salesorderdetails/',function(req,res,next)
 { 
 try 
 {
salesorderdetails.Save_salesorderdetails(req.body, function (err, rows) 
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
 router.get('/Search_salesorderdetails/',function(req,res,next)
 { 
 try 
 {
salesorderdetails.Search_salesorderdetails(req.query.salesorderdetails_Name, function (err, rows) 
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
 router.get('/Get_salesorderdetails/:salesorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
salesorderdetails.Get_salesorderdetails(req.params.salesorderdetails_Id_, function (err, rows) 
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
 router.get('/Delete_salesorderdetails/:salesorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
salesorderdetails.Delete_salesorderdetails(req.params.salesorderdetails_Id_, function (err, rows) 
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

