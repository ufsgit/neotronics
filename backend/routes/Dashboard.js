var express = require('express');
var router = express.Router();
var Dashboard=require('../models/Dashboard');
 
router.get('/Search_Dashboard_Details/:From_Date_?/:To_Date_?/:Is_Date_Check_ ?/:Branch_ ?/:Login_User_ ?',function(req,res,next)
  { 
  try 
  {
    Dashboard.Search_Dashboard_Details(req.params.From_Date_,req.params.To_Date_,req.params.Is_Date_Check_,req.params.Branch_,req.params.Login_User_ , function (err, rows) 
  {
  if (err) 
  {
    console.log(err);
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
    console.log(e);
  }
  finally 
  {
  }
  });

  // :Date_?/:Branch_ ?
  router.get('/Get_Dashboard_New_Count/',function(req,res,next)
  { 
  try 
  {
    console.log(req.query.Date_,req.query.Branch_)
    Dashboard.Get_Dashboard_New_Count(req.query.Date_,req.query.Branch_, function (err, rows) 
  {
  if (err) 
  {
    console.log(err);
  res.json(err);
  }
  else 
  {
  console.log(rows);
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
    console.log(e);
  }
  finally 
  {
  }
  });


  router.get('/Get_Dashboard_Details/',function(req,res,next)
  { 
    try 
    {
      console.log(req.query.Date_,req.query.Branch_Id_,req.query.Account_Name_)
      Dashboard.Get_Dashboard_Details(req.query.Date_,req.query.Branch_,req.query.Account_Name_, function (err, rows) 
    {
    if (err) 
      {
      console.log(err);
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
    console.log(e);
  }
  finally {}
  });
 
  
module.exports = router;

