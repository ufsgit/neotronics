 var express = require('express');
 var router = express.Router();
 var currencydetails=require('../models/currencydetails');
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
 router.get('/Search_currencydetails/',function(req,res,next)
 { 
 try 
 {
currencydetails.Search_currencydetails(req.query.currencydetails_Name, function (err, rows) 
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

