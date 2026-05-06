 var express = require('express');
 var router = express.Router();
 var creditnote_master=require('../models/creditnote_master');

//  router.post('/Save_creditnote_master/',function(req,res,next)
//  { 
//  try 
//  {
// creditnote_master.Save_creditnote_master(req.body, function (err, rows) 
//  {
//   if (err) 
//   {
//     console.log(err);
//   res.json(err);
//   }
//   else 
//   {
//     console.log(rows);
//     res.json(rows);
//   }
//   });
//   }
//  catch (e) 
//  {
//   console.log(e);
//  }
//  finally 
//  {
//  }
//   });

router.post('/Save_creditnote_master/',async function(req,res,next)
      { 
      console.log(req.body);
      try 
      {
          const resp=await creditnote_master.Save_creditnote_master(req.body);
          console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e);
      return res.send(e);
      }
      }); 

 router.get('/Search_creditnote_master/',function(req,res,next)
 { 
   console.log(req.query);
 try 
 {
creditnote_master.Search_creditnote_master(req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
    req.query.Account_Party_Id_,req.query.QuotNo_,req.query.partNo_,
    req.query.Search_Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.AccountType_Id_,req.query.User_Details_Id_,
    req.query.User_Type, req.query.Login_User_Id, function (err, rows) 
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

 router.get('/Get_creditnote_master/:creditnote_master_Id_?',function(req,res,next)
 { 
 try 
 {
creditnote_master.Get_creditnote_master(req.params.creditnote_master_Id_, function (err, rows) 
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


    
 router.get('/Get_creditnote_details/:CreditNote_Master_Id_?',function(req,res,next)
 { 
 try 
 {
creditnote_master.Get_creditnote_details(req.params.CreditNote_Master_Id_, function (err, rows) 
 {
  console.log(req.params.CreditNote_Master_Id_);
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


 router.get('/Delete_creditnote_master/:creditnote_master_Id_?',function(req,res,next)
 { 
 try 
 {
creditnote_master.Delete_creditnote_master(req.params.creditnote_master_Id_, function (err, rows) 
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

