 var express = require('express');
 var router = express.Router();
 var Account_Years=require('../models/Account_Years');
 router.post('/Save_Account_Years/',function(req,res,next)
 { 
 try 
 {
Account_Years.Save_Account_Years(req.body, function (err, rows) 
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
 router.get('/Search_Account_Years/:Account_Years_Name_?',function(req,res,next)
 { 
 try 
 {
Account_Years.Search_Account_Years(req.params.Account_Years_Name_, function (err, rows) 
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
 router.get('/Get_Account_Years/:Account_Years_Id_?',function(req,res,next)
 { 
 try 
 {
Account_Years.Get_Account_Years(req.params.Account_Years_Id_, function (err, rows) 
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
 router.get('/Delete_Account_Years/:Account_Years_Id_?',function(req,res,next)
 { 
 try 
 {
Account_Years.Delete_Account_Years(req.params.Account_Years_Id_, function (err, rows) 
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

