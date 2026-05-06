 var express = require('express');
 var router = express.Router();
 var User_Menu_Selection=require('../models/User_Menu_Selection');
 router.post('/Save_User_Menu_Selection/',function(req,res,next)
 { 
 try 
 {
User_Menu_Selection.Save_User_Menu_Selection(req.body, function (err, rows) 
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
 router.get('/Search_User_Menu_Selection/:User_Menu_Selection_Name_?',function(req,res,next)
 { 
 try 
 {
User_Menu_Selection.Search_User_Menu_Selection(req.params.User_Menu_Selection_Name_, function (err, rows) 
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
 router.get('/Get_User_Menu_Selection/:User_Menu_Selection_Id_?',function(req,res,next)
 { 
 try 
 {
User_Menu_Selection.Get_User_Menu_Selection(req.params.User_Menu_Selection_Id_, function (err, rows) 
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
 router.get('/Delete_User_Menu_Selection/:User_Menu_Selection_Id_?',function(req,res,next)
 { 
 try 
 {
User_Menu_Selection.Delete_User_Menu_Selection(req.params.User_Menu_Selection_Id_, function (err, rows) 
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

