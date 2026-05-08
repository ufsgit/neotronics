 var express = require('express');
 var router = express.Router();
 var payment_term=require('../models/payment_term');
 const asyncHandler = require("../helpers/async-handler");
 const { sendSuccess } = require("../helpers/api-response");
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
  
  router.get('/Load_Payment_Term/', asyncHandler(function(req,res,next)
  { 
    req.log && req.log.info("api.request", { handler: "payment_term.Load_Payment_Term" });
    req.log && req.log.info("sql.start", { sp: "Load_Payment_Term" });
    payment_term.Load_Payment_Term(function (err, rows) 
    {
      if (err) 
      {
        req.log && req.log.error("sql.error", { sp: "Load_Payment_Term", code: err.code, message: err.message });
        return next(err);
      }
      req.log && req.log.info("sql.ok", { sp: "Load_Payment_Term" });
      return sendSuccess(res, { message: "OK", data: rows || [] });
    });
  }));
  /*
  finally 
  {
  }
   });
   */
  module.exports = router;

