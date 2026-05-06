 var express = require('express');
 var router = express.Router();
 var country=require('../models/country');
 router.post('/Save_country/',function(req,res,next)
 { 
 try 
 {
country.Save_country(req.body, function (err, rows) 
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
  router.get('/Load_Country/',function(req,res,next)
  { 
  try 
  {
 country.Load_Country( function (err, rows) 
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

 router.get('/Search_country/',function(req,res,next)
 { 
 try 
 {
country.Search_country(req.query.country_Name, function (err, rows) 
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
 router.get('/Get_country/:country_Id_?',function(req,res,next)
 { 
 try 
 {
country.Get_country(req.params.country_Id_, function (err, rows) 
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
 router.get('/Delete_country/:country_Id_?',function(req,res,next)
 { 
 try 
 {
country.Delete_country(req.params.country_Id_, function (err, rows) 
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

