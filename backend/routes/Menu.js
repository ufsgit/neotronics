 var express = require('express');
 var router = express.Router();
 var Menu=require('../models/Menu');
 router.post('/Save_Menu/',function(req,res,next)
 { 
 try 
 {
Menu.Save_Menu(req.body, function (err, rows) 
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
 router.get('/Search_Menu/:Menu_Name_?',function(req,res,next)
 { 
 try 
 {
Menu.Search_Menu(req.params.Menu_Name_, function (err, rows) 
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
 router.get('/Get_Menu/:Menu_Id_?',function(req,res,next)
 { 
 try 
 {
Menu.Get_Menu(req.params.Menu_Id_, function (err, rows) 
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
 router.get('/Delete_Menu/:Menu_Id_?',function(req,res,next)
 { 
 try 
 {
Menu.Delete_Menu(req.params.Menu_Id_, function (err, rows) 
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

