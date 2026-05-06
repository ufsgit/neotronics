 var express = require('express');
 var router = express.Router();
 var Purchase_Type=require('../models/Purchase_Type');

 router.post('/Save_Purchase_Type/',function(req,res,next)
 { 
 try 
 {
   
  Purchase_Type.Save_Purchase_Type(req.body, function (err, rows) 
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

  
 router.get('/Search_Purchase_Type/:Purchase_Type_Name_?',function(req,res,next)
 { 
 try 
 { 
  Purchase_Type.Search_Purchase_Type(req.params.Purchase_Type_Name_,function (err, rows) 
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


  router.get('/Delete_Purchase_Type/:Purchase_Type_Id_?',function(req,res,next)
    { 
    try 
    {
      Purchase_Type.Delete_Purchase_Type(req.params.Purchase_Type_Id_, function (err, rows) 
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

    router.get('/Load_Purchase_type/',function(req,res,next)
    { 
    try 
    {
      Purchase_Type.Load_Purchase_type(function (err, rows) 
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

