 var express = require('express');
 var router = express.Router();
 var Working_Status=require('../models/Working_Status');
 router.post('/Save_Working_Status/',function(req,res,next)
 { 
 try 
 {
Working_Status.Save_Working_Status(req.body, function (err, rows) 
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
 router.get('/Search_Working_Status/',function(req,res,next)
 { 
 try 
 {
Working_Status.Search_Working_Status(req.query.Working_Status_Name, function (err, rows) 
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
 router.get('/Get_Working_Status/:Working_Status_Id_?',function(req,res,next)
 { 
 try 
 {
Working_Status.Get_Working_Status(req.params.Working_Status_Id_, function (err, rows) 
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
 router.get('/Delete_Working_Status/:Working_Status_Id_?',function(req,res,next)
 { 
 try 
 {
Working_Status.Delete_Working_Status(req.params.Working_Status_Id_, function (err, rows) 
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

