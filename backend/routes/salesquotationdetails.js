 var express = require('express');
 var router = express.Router();
 var salesquotationdetails=require('../models/salesquotationdetails');
 router.post('/Save_salesquotationdetails/',function(req,res,next)
 { 
 try 
 {
salesquotationdetails.Save_salesquotationdetails(req.body, function (err, rows) 
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
 router.get('/Search_salesquotationdetails/',function(req,res,next)
 { 
 try 
 {
salesquotationdetails.Search_salesquotationdetails(req.query.salesquotationdetails_Name, function (err, rows) 
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
 router.get('/Get_salesquotationdetails/:salesquotationdetails_Id_?',function(req,res,next)
 { 
 try 
 {
salesquotationdetails.Get_salesquotationdetails(req.params.salesquotationdetails_Id_, function (err, rows) 
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
 router.get('/Delete_salesquotationdetails/:salesquotationdetails_Id_?',function(req,res,next)
 { 
 try 
 {
salesquotationdetails.Delete_salesquotationdetails(req.params.salesquotationdetails_Id_, function (err, rows) 
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

