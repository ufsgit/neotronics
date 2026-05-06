 var express = require('express');
 var router = express.Router();
 var Purchase_Details=require('../models/Purchase_Details');
 router.post('/Save_Purchase_Details/',function(req,res,next)
 { 
 try 
 {
Purchase_Details.Save_Purchase_Details(req.body, function (err, rows) 
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
 router.get('/Search_Purchase_Details/:Purchase_Details_Name_?',function(req,res,next)
 { 
 try 
 {
Purchase_Details.Search_Purchase_Details(req.params.Purchase_Details_Name_, function (err, rows) 
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
 router.get('/Get_Purchase_Details/:Purchase_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Purchase_Details.Get_Purchase_Details(req.params.Purchase_Details_Id_, function (err, rows) 
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
 router.get('/Delete_Purchase_Details/:Purchase_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Purchase_Details.Delete_Purchase_Details(req.params.Purchase_Details_Id_, function (err, rows) 
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

