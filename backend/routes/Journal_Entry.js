var express = require('express');
var router = express.Router();
var Journal_Entry=require('../models/Journal_Entry');
router.post('/Save_Journal_Entry/',function(req,res,next)
  { 
  try 
  {
  Journal_Entry.Save_Journal_Entry(req.body, function (err, rows) 
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
    console.log(e);
  }
  finally 
  {
  }
  });
router.get('/Search_Journal_Entry/:From_Date_?/:To_Date_?/:From_Account_Id_?/:To_Account_Id_?/:Voucher_No_?/:Is_Date_Check_?/:User_Type?/:Login_User?',function(req,res,next)
  { 
  try 
  {
  Journal_Entry.Search_Journal_Entry(req.params.From_Date_,req.params.To_Date_,  req.params.From_Account_Id_,
  req.params.To_Account_Id_, req.params.Voucher_No_,req.params.Is_Date_Check_,
  req.params.User_Type, req.params.Login_User,function (err, rows) 
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
router.get('/Get_Journal_Entry/:Journal_Entry_Id_?',function(req,res,next)
  { 
  try 
  {
  Journal_Entry.Get_Journal_Entry(req.params.Journal_Entry_Id_, function (err, rows) 
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
router.get('/Delete_Journal_Entry/:Journal_Entry_Id_?',function(req,res,next)
  { 
  try 
  {
  Journal_Entry.Delete_Journal_Entry(req.params.Journal_Entry_Id_, function (err, rows) 
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

