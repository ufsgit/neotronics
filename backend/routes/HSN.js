 var express = require('express');
 var router = express.Router();
 var HSN=require('../models/HSN');
 router.post('/Save_HSN/',function(req,res,next)
 { 
 try 
 {
HSN.Save_HSN(req.body, function (err, rows) 
 {
  if (err) 
  {
    console.log(err)
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
 router.get('/Search_HSN/:HSN_CODE_?',function(req,res,next)
 { 
 try 
 {
HSN.Search_HSN( req.params.HSN_CODE_,function (err, rows) 
 {
  if (err) 
  {
    console.log(err)
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
 router.get('/Get_HSN/:HSN_Id_?',function(req,res,next)
 { 
 try 
 {
HSN.Get_HSN(req.params.HSN_Id_, function (err, rows) 
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
 router.get('/Delete_HSN/:HSN_Id_?',function(req,res,next)
 { 
 try 
 {
HSN.Delete_HSN(req.params.HSN_Id_, function (err, rows) 
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

