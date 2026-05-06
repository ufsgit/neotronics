 var express = require('express');
 var router = express.Router();
 var deliveryordermaster=require('../models/deliveryordermaster');
 router.post('/Save_deliveryordermaster/',function(req,res,next)
 { 
 try 
 {
deliveryordermaster.Save_deliveryordermaster(req.body, function (err, rows) 
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
 router.get('/Search_deliveryordermaster/',function(req,res,next)
 { 
 try 
 {
deliveryordermaster.Search_deliveryordermaster(req.query.deliveryordermaster_Name, function (err, rows) 
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
 router.get('/Get_deliveryordermaster/:deliveryordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
deliveryordermaster.Get_deliveryordermaster(req.params.deliveryordermaster_Id_, function (err, rows) 
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
 router.get('/Delete_deliveryordermaster/:deliveryordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
deliveryordermaster.Delete_deliveryordermaster(req.params.deliveryordermaster_Id_, function (err, rows) 
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

