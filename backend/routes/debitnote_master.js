 var express = require('express');
 var router = express.Router();
 var debitnote_master=require('../models/debitnote_master');
//  router.post('/Save_debitnote_master/',function(req,res,next)
//  { 
//  try 
//  {
// debitnote_master.Save_debitnote_master(req.body, function (err, rows) 
//  {
//   if (err) 
//   {
//   res.json(err);
//   }
//   else 
//   {
//     res.json(rows);
//   }
//   });
//   }
//  catch (e) 
//  {
//  }
//  finally 
//  {
//  }
//   });
  router.post('/Save_debitnote_master/',async function(req,res,next)
      { 
      try 
      {
          const resp=await debitnote_master.Save_debitnote_master(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      }); 






router.get('/Search_debitnote_master',function(req,res,next)
      { 
      try 
      {

        debitnote_master.Search_debitnote_master
      (
        req.query.Is_Date_Check, 
        req.query.FromDate, 
        req.query.ToDate, 
        req.query.Customer,
        req.query.QuotNo,
        req.query.partNo,
        req.query.Item_Group_Id_,
        req.query.CurrencyDetails_Id_,
        req.query.AccountType_Id_,
        req.query.User_Details_Id_,
        req.query.User_Type,
        req.query.Login_User_Id,
         function (err, rows) 
      {
      if (err) {
        console.log(err);
        res.json(err);
      }
      else {res.json(rows);}});}
      catch (e) {
        console.log(e);

      }
      finally {}
      });
 router.get('/Get_debitnote_master/:debitnote_master_Id_?',function(req,res,next)
 { 
 try 
 {
debitnote_master.Get_debitnote_master(req.params.debitnote_master_Id_, function (err, rows) 
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
 router.get('/Delete_debitnote_master/:debitnote_master_Id_?',function(req,res,next)
 { 
 try 
 {
debitnote_master.Delete_debitnote_master(req.params.debitnote_master_Id_, function (err, rows) 
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
  router.get('/Get_debitnote_details/:DebitNote_Master_Id_?',function(req,res,next)
      { 
      try 
      {
        debitnote_master.Get_debitnote_details(req.params.DebitNote_Master_Id_, function (err, rows) 
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

