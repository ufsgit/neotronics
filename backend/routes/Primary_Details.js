 var express = require('express');
 var router = express.Router();
 var Primary_Details=require('../models/Primary_Details');
 router.post('/Save_Primary_Details/',function(req,res,next)
 { 
 try 
 {
Primary_Details.Save_Primary_Details(req.body, function (err, rows) 
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
 router.get('/Search_Primary_Details/:Primary_Details_Name_?',function(req,res,next)
 { 
 try 
 {
Primary_Details.Search_Primary_Details(req.params.Primary_Details_Name_, function (err, rows) 
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
 router.get('/Get_Primary_Details/:Primary_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Primary_Details.Get_Primary_Details(req.params.Primary_Details_Id_, function (err, rows) 
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
 router.get('/Delete_Primary_Details/:Primary_Details_Id_?',function(req,res,next)
 { 
 try 
 {
Primary_Details.Delete_Primary_Details(req.params.Primary_Details_Id_, function (err, rows) 
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

