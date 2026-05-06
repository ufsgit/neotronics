 var express = require('express');
 var router = express.Router();
 var debitnote_details=require('../models/debitnote_details');
 router.post('/Save_debitnote_details/',function(req,res,next)
 { 
 try 
 {
debitnote_details.Save_debitnote_details(req.body, function (err, rows) 
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
 router.get('/Search_debitnote_details/',function(req,res,next)
 { 
 try 
 {
debitnote_details.Search_debitnote_details(req.query.debitnote_details_Name, function (err, rows) 
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
 router.get('/Get_debitnote_details/:debitnote_details_Id_?',function(req,res,next)
 { 
 try 
 {
debitnote_details.Get_debitnote_details(req.params.debitnote_details_Id_, function (err, rows) 
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
 router.get('/Delete_debitnote_details/:debitnote_details_Id_?',function(req,res,next)
 { 
 try 
 {
debitnote_details.Delete_debitnote_details(req.params.debitnote_details_Id_, function (err, rows) 
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

