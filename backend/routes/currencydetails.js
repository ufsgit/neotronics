 var express = require('express');
 var router = express.Router();
 var currencydetails=require('../models/currencydetails');
 const asyncHandler = require("../helpers/async-handler");
 const { sendSuccess } = require("../helpers/api-response");
 router.post('/Save_currencydetails/',function(req,res,next)
 { 
 try 
 {
currencydetails.Save_currencydetails(req.body, function (err, rows) 
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
 router.get('/Search_currencydetails/', asyncHandler(function(req,res,next)
 { 
  req.log && req.log.info("api.request", { handler: "currencydetails.Search_currencydetails" });
  req.log && req.log.info("sql.start", { sp: "Search_currencydetails" });
  currencydetails.Search_currencydetails(req.query.currencydetails_Name, function (err, rows) 
  {
    if (err) 
    {
      req.log && req.log.error("sql.error", { sp: "Search_currencydetails", code: err.code, message: err.message });
      return next(err);
    }
    req.log && req.log.info("sql.ok", { sp: "Search_currencydetails" });
    return sendSuccess(res, { message: "OK", data: rows || [] });
  });
 }));
 router.get('/Get_currencydetails/:currencydetails_Id_?',function(req,res,next)
 { 
 try 
 {
currencydetails.Get_currencydetails(req.params.currencydetails_Id_, function (err, rows) 
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
 router.get('/Delete_currencydetails/:currencydetails_Id_?',function(req,res,next)
 { 
 try 
 {
currencydetails.Delete_currencydetails(req.params.currencydetails_Id_, function (err, rows) 
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

  router.get('/Load_All_Account_Type/',function(req,res,next)
  { 
  try 
  {
 currencydetails.Load_All_Account_Type(req.query.currencydetails_Name, function (err, rows) 
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


   router.get('/Load_InvoiceType/',function(req,res,next)
   { 
   try 
   {
  currencydetails.Load_InvoiceType(req.query.InvoiceType_Name, function (err, rows) 
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

