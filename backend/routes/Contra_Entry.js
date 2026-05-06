var express = require('express');
var router = express.Router();
var Contra_Entry=require('../models/Contra_Entry');
router.post('/Save_Contra_Entry/',function(req,res,next)
  { 
  try 
  {
  Contra_Entry.Save_Contra_Entry(req.body, function (err, rows) 
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
router.get('/Search_Contra_Entry/:From_Date_?/:To_Date_?/:To_Account_Id_?/:Voucher_No_?/:Is_Date_Check_?/:User_Type?/:Login_User?',function(req,res,next)
  { 
  try 
  {
  Contra_Entry.Search_Contra_Entry(req.params.From_Date_,req.params.To_Date_, 
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
router.get('/Get_Contra_Entry/:Contra_Entry_Id_?',function(req,res,next)
  { 
  try 
  {
  Contra_Entry.Get_Contra_Entry(req.params.Contra_Entry_Id_, function (err, rows) 
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
router.get('/Delete_Contra_Entry/:Contra_Entry_Id_?',function(req,res,next)
  { 
  try 
  {
  Contra_Entry.Delete_Contra_Entry(req.params.Contra_Entry_Id_, function (err, rows) 
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

