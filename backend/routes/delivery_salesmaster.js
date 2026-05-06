 var express = require('express');
 var router = express.Router();
 var delivery_salesmaster=require('../models/delivery_salesmaster');
 router.post('/Save_delivery_salesmaster/',function(req,res,next)
 { 
 try 
 {
delivery_salesmaster.Save_delivery_salesmaster(req.body, function (err, rows) 
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
 router.get('/Search_delivery_salesmaster/',function(req,res,next)
 { 
 try 
 {
delivery_salesmaster.Search_delivery_salesmaster(req.query.delivery_salesmaster_Name, function (err, rows) 
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
 router.get('/Get_delivery_salesmaster/:delivery_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
delivery_salesmaster.Get_delivery_salesmaster(req.params.delivery_salesmaster_Id_, function (err, rows) 
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
 router.get('/Delete_delivery_salesmaster/:delivery_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
delivery_salesmaster.Delete_delivery_salesmaster(req.params.delivery_salesmaster_Id_, function (err, rows) 
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

