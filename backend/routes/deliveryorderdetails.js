 var express = require('express');
 var router = express.Router();
 var deliveryorderdetails=require('../models/deliveryorderdetails');
 router.post('/Save_deliveryorderdetails/',function(req,res,next)
 { 
 try 
 {
deliveryorderdetails.Save_deliveryorderdetails(req.body, function (err, rows) 
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
 router.get('/Search_deliveryorderdetails/',function(req,res,next)
 { 
 try 
 {
deliveryorderdetails.Search_deliveryorderdetails(req.query.deliveryorderdetails_Name, function (err, rows) 
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
 router.get('/Get_deliveryorderdetails/:deliveryorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
deliveryorderdetails.Get_deliveryorderdetails(req.params.deliveryorderdetails_Id_, function (err, rows) 
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
 router.get('/Delete_deliveryorderdetails/:deliveryorderdetails_Id_?',function(req,res,next)
 { 
 try 
 {
deliveryorderdetails.Delete_deliveryorderdetails(req.params.deliveryorderdetails_Id_, function (err, rows) 
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

