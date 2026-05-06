 var express = require('express');
 var router = express.Router();
 var General_Settings=require('../models/General_Settings');
 router.post('/Save_General_Settings/',function(req,res,next)
 { 
 try 
 {
General_Settings.Save_General_Settings(req.body, function (err, rows) 
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
 router.get('/Search_General_Settings/:General_Settings_Name_?',function(req,res,next)
 { 
 try 
 {
General_Settings.Search_General_Settings(req.params.General_Settings_Name_, function (err, rows) 
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
 router.get('/Get_General_Settings/:General_Settings_Id_?',function(req,res,next)
 { 
 try 
 {
General_Settings.Get_General_Settings(req.params.General_Settings_Id_, function (err, rows) 
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
 router.get('/Delete_General_Settings/:General_Settings_Id_?',function(req,res,next)
 { 
 try 
 {
General_Settings.Delete_General_Settings(req.params.General_Settings_Id_, function (err, rows) 
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

