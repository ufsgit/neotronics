 var express = require('express');
 var router = express.Router();
 var creditnote_details=require('../models/creditnote_details');
 router.post('/Save_creditnote_details/',function(req,res,next)
 { 
 try 
 {
creditnote_details.Save_creditnote_details(req.body, function (err, rows) 
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
 router.get('/Search_creditnote_details/',function(req,res,next)
 { 
 try 
 {
creditnote_details.Search_creditnote_details(req.query.creditnote_details_Name, function (err, rows) 
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
 router.get('/Get_creditnote_details/:creditnote_details_Id_?',function(req,res,next)
 { 
 try 
 {
creditnote_details.Get_creditnote_details(req.params.creditnote_details_Id_, function (err, rows) 
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
 router.get('/Delete_creditnote_details/:creditnote_details_Id_?',function(req,res,next)
 { 
 try 
 {
creditnote_details.Delete_creditnote_details(req.params.creditnote_details_Id_, function (err, rows) 
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

