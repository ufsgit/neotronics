 var express = require('express');
 var router = express.Router();
 var purchaseorder_purchasemaster=require('../models/purchaseorder_purchasemaster');
 router.post('/Save_purchaseorder_purchasemaster/',function(req,res,next)
 { 
 try 
 {
purchaseorder_purchasemaster.Save_purchaseorder_purchasemaster(req.body, function (err, rows) 
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
 router.get('/Search_purchaseorder_purchasemaster/',function(req,res,next)
 { 
 try 
 {
purchaseorder_purchasemaster.Search_purchaseorder_purchasemaster(req.query.purchaseorder_purchasemaster_Name, function (err, rows) 
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
 router.get('/Get_purchaseorder_purchasemaster/:purchaseorder_purchasemaster_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseorder_purchasemaster.Get_purchaseorder_purchasemaster(req.params.purchaseorder_purchasemaster_Id_, function (err, rows) 
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
 router.get('/Delete_purchaseorder_purchasemaster/:purchaseorder_purchasemaster_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseorder_purchasemaster.Delete_purchaseorder_purchasemaster(req.params.purchaseorder_purchasemaster_Id_, function (err, rows) 
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

