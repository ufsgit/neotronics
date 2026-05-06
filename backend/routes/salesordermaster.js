 var express = require('express');
 var router = express.Router();
 var salesordermaster=require('../models/salesordermaster');
 router.post('/Save_salesordermaster/',function(req,res,next)
 { 
 try 
 {
salesordermaster.Save_salesordermaster(req.body, function (err, rows) 
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
 router.get('/Search_salesordermaster/',function(req,res,next)
 { 
 try 
 {
salesordermaster.Search_salesordermaster(req.query.salesordermaster_Name, function (err, rows) 
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
 router.get('/Get_salesordermaster/:salesordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
salesordermaster.Get_salesordermaster(req.params.salesordermaster_Id_, function (err, rows) 
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
 router.get('/Delete_salesordermaster/:salesordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
salesordermaster.Delete_salesordermaster(req.params.salesordermaster_Id_, function (err, rows) 
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

