 var express = require('express');
 var router = express.Router();
 var purchaseordermaster=require('../models/purchaseordermaster');
 router.post('/Save_purchaseordermaster/',function(req,res,next)
 { 
 try 
 {
purchaseordermaster.Save_purchaseordermaster(req.body, function (err, rows) 
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
 router.get('/Search_purchaseordermaster/',function(req,res,next)
 { 
 try 
 {
purchaseordermaster.Search_purchaseordermaster(req.query.purchaseordermaster_Name, function (err, rows) 
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
 router.get('/Get_purchaseordermaster/:purchaseordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseordermaster.Get_purchaseordermaster(req.params.purchaseordermaster_Id_, function (err, rows) 
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
 router.get('/Delete_purchaseordermaster/:purchaseordermaster_Id_?',function(req,res,next)
 { 
 try 
 {
purchaseordermaster.Delete_purchaseordermaster(req.params.purchaseordermaster_Id_, function (err, rows) 
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
  router.get('/Search_PurchaseOrderNumber_Typeahead/:InvoiceNo_?',function(req,res,next)
  { 
  try 
  {
 purchaseordermaster.Search_PurchaseOrderNumber_Typeahead(req.params.InvoiceNo_, function (err, rows) 
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

   /*** Added on 20-09-2024 */

   router.get('/Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead/:InvoiceNo_?/:DeliveryOrderMaster_Id_?',function(req,res,next)
   { 
   try 
   {
  purchaseordermaster.Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead(req.params.InvoiceNo_, req.params.DeliveryOrderMaster_Id_, function (err, rows) 
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
  module.exports = router;
