 var express = require('express');
 var router = express.Router();
 var performa_salesmaster=require('../models/performa_salesmaster');
 router.post('/Save_performa_salesmaster/',function(req,res,next)
 { 
 try 
 {
performa_salesmaster.Save_performa_salesmaster(req.body, function (err, rows) 
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
 router.get('/Search_performa_salesmaster/',function(req,res,next)
 { 
 try 
 {
performa_salesmaster.Search_performa_salesmaster(req.query.performa_salesmaster_Name, function (err, rows) 
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
 router.get('/Get_performa_salesmaster/:performa_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
performa_salesmaster.Get_performa_salesmaster(req.params.performa_salesmaster_Id_, function (err, rows) 
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
 router.get('/Delete_performa_salesmaster/:performa_salesmaster_Id_?',function(req,res,next)
 { 
 try 
 {
performa_salesmaster.Delete_performa_salesmaster(req.params.performa_salesmaster_Id_, function (err, rows) 
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

