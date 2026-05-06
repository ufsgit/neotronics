 var express = require('express');
 var router = express.Router();
 var salesquotationmaster=require('../models/salesquotationmaster');

 router.post('/Save_salesquotationmaster/',function(req,res,next)
 { 
console.log(req,res);
 try 
 {
salesquotationmaster.Save_salesquotationmaster(req.body, function (err, rows) 
 {
  if (err) 
  {
    console.log(req,res);
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
 router.get('/Search_salesquotationmaster/',function(req,res,next)
 { 
 try 
 {
salesquotationmaster.Search_salesquotationmaster(req.query.salesquotationmaster_Name, function (err, rows) 
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
 router.get('/Get_salesquotationmaster/:salesquotationmaster_Id_?',function(req,res,next)
 { 
 try 
 {
salesquotationmaster.Get_salesquotationmaster(req.params.salesquotationmaster_Id_, function (err, rows) 
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
 router.get('/Delete_salesquotationmaster/:salesquotationmaster_Id_?',function(req,res,next)
 { 
 try 
 {
salesquotationmaster.Delete_salesquotationmaster(req.params.salesquotationmaster_Id_, function (err, rows) 
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


  router.get('/Get_salesPerformaInvoicemaster/:PerformaInvoiceId_?',function(req,res,next)
  { 
  try 
  {
 salesquotationmaster.Get_salesPerformaInvoicemaster(req.params.PerformaInvoiceId_, function (err, rows) 
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



   router.get('/Get_salesGRNmaster/:salesquotationmaster_Id_?',function(req,res,next)
   { 
   try 
   {
  salesquotationmaster.Get_salesGRNmaster(req.params.salesquotationmaster_Id_, function (err, rows) 
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

    router.get('/Load_DeliveryOrder/:DeliveryOrderMaster_Id_?',function(req,res,next)
    { try { salesquotationmaster.Load_DeliveryOrder(req.params.DeliveryOrderMaster_Id_, function (err, rows)  { if (err) { console.log(err); res.json(err);}
     else { res.json(rows);}});}
    catch (e) {console.log(e);}
    finally {} });


    router.get('/Load_PurchaseOrder/:PurchaseOrderMaster_Id_?',function(req,res,next)
    { try { salesquotationmaster.Load_PurchaseOrder(req.params.PurchaseOrderMaster_Id_, function (err, rows)  { if (err) { console.log(err); res.json(err);}
     else { res.json(rows);}});}
    catch (e) {console.log(e);}
    finally {} });

    /*** Added on 18-10-2024 */

    router.get('/Load_PackingList/:PackingList_Master_Id_?',function(req,res,next)
    { try { salesquotationmaster.Load_PackingList(req.params.PackingList_Master_Id_, function (err, rows)  { if (err) { console.log(err); res.json(err);}
     else { res.json(rows);}});}
    catch (e) {console.log(e);}
    finally {} });
  module.exports = router;

