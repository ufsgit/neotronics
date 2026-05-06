 var express = require('express');
 var router = express.Router();
 var Country_Of_Orgin=require('../models/Country_Of_Orgin');
 router.post('/Save_Country_Of_Orgin/',function(req,res,next)
 { 
 try 
 {
Country_Of_Orgin.Save_Country_Of_Orgin(req.body, function (err, rows) 
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
 router.get('/Search_Country_Of_Orgin/',function(req,res,next)
 { 
 try 
 {
Country_Of_Orgin.Search_Country_Of_Orgin(req.query.Country_Of_Orgin_Name, function (err, rows) 
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
 router.get('/Get_Country_Of_Orgin/:Country_Of_Orgin_Id_?',function(req,res,next)
 { 
 try 
 {
Country_Of_Orgin.Get_Country_Of_Orgin(req.params.Country_Of_Orgin_Id_, function (err, rows) 
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
 router.get('/Delete_Country_Of_Orgin/:Country_Of_Orgin_Id_?',function(req,res,next)
 { 
 try 
 {
Country_Of_Orgin.Delete_Country_Of_Orgin(req.params.Country_Of_Orgin_Id_, function (err, rows) 
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

