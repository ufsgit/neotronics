 var express = require('express');
 var router = express.Router();
 var payment_term=require('../models/payment_term');
 router.post('/Save_payment_term/',function(req,res,next)
 { 
 try 
 {
payment_term.Save_payment_term(req.body, function (err, rows) 
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
  console.log(e)
 }
 finally 
 {
 }
  });
 router.get('/Search_payment_term/',function(req,res,next)
 { 
 try 
 {
payment_term.Search_payment_term(req.query.payment_term_Name, function (err, rows) 
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
 router.get('/Get_payment_term/:payment_term_Id_?',function(req,res,next)
 { 
 try 
 {
payment_term.Get_payment_term(req.params.payment_term_Id_, function (err, rows) 
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
 router.get('/Delete_payment_term/:payment_term_Id_?',function(req,res,next)
 { 
 try 
 {
payment_term.Delete_payment_term(req.params.payment_term_Id_, function (err, rows) 
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

  /** Added on 30-10-2024 */
  
  router.get('/Load_Payment_Term/',function(req,res,next)
  { 
  try 
  {
    payment_term.Load_Payment_Term( function (err, rows) 
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

