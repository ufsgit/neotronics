var express = require('express');
var router = express.Router();
var Account_Group=require('../models/Account_Group');
router.post('/Save_Account_Group/',function(req,res,next)
  { 
  try 
  {
  Account_Group.Save_Account_Group(req.body, function (err, rows) 
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
  router.post('/Save_Store/',function(req,res,next)
  { 
  try 
  {
  Account_Group.Save_Store(req.body, function (err, rows) 
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
router.get('/Search_Account_Group/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  Account_Group.Search_Account_Group(req.params.Group_Name_, function (err, rows) 
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
  router.get('/Search_Store/:Store_Name_?',function(req,res,next)
    { 
    try 
    {
    Account_Group.Search_Store(req.params.Store_Name_, function (err, rows) 
    {
    if (err) 
    {
    res.json(err);
console.log(err)
    }
    else 
    {
      console.log(rows)
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
  router.get('/Search_Account_Group_Typeahead/:Group_Name_?',function(req,res,next)
    { 
    try 
    {
    Account_Group.Search_Account_Group_Typeahead(req.params.Group_Name_, function (err, rows) 
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
router.get('/Get_Account_Group/:Account_Group_Id_?',function(req,res,next)
  { 
  try 
  {
  Account_Group.Get_Account_Group(req.params.Account_Group_Id_, function (err, rows) 
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
  router.get('/Delete_Store/:Store_Id_?',function(req,res,next)
    { 
    try 
    {
    Account_Group.Delete_Store(req.params.Store_Id_, function (err, rows) 
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
router.get('/Delete_Account_Group/:Account_Group_Id_?',function(req,res,next)
  { 
  try 
  {
  Account_Group.Delete_Account_Group(req.params.Account_Group_Id_, function (err, rows) 
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
router.get('/AccountGroup_Typeahead/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  Account_Group.AccountGroup_Typeahead(req.params.Group_Name_, function (err, rows) 
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
router.get('/Load_Account_Group/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  Account_Group.Load_Account_Group(req.params.Group_Name_, function (err, rows) 
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

