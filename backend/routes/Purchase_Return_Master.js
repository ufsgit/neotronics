 var express = require('express');
 var router = express.Router();
 var purchase_return_master=require('../models/Purchase_Return_Master');
//  router.post('/Save_purchase_return_master/',function(req,res,next)
//  { 
//  try 
//  {
// purchase_return_master.Save_purchase_return_master(req.body, function (err, rows) 
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

router.post('/Save_Purchase_Return_Master', (req, res, next) =>
  {
   try
   {      
      var jsondata1 = JSON.stringify(req.body)
      purchase_return_master.Save_Purchase_Return_Master(jsondata1, function (err, rows)
         {
  
         if (err) 
         {
           console.log(err)
           return 1;
         }
         else
         {
          console.log(rows);
           return res.json(rows);
           
         }
       });
     
   }
  
   catch (err) 
   {
     
     const error = new Error('Please upload a file')
     error.httpStatusCode = 400
     return next(error)
   }
     finally 
     {
     }
   }
  );   



    router.get('/Search_purchase_return_master', function (req, res, next) {
      try {
        console.log('req.query - Search_purchase_return_master: ',req.query);
        purchase_return_master.Search_purchase_return_master(
                                              req.query.Is_Date_Check,
                                              req.query.FromDate,
                                              req.query.ToDate,
                                              req.query.InvoiceNo,
                                              req.query.Customer,
                                              req.query.AccountType_Id_,
                                              req.query.CurrencyDetails_Id_,
                                              req.query.partNo,
                                              req.query.Item_Group_Id_,
                                              req.query.User_Type,
                                              req.query.Login_User_Id,
            function (err, rows) {
          if (err) {
            console.log(err)
            res.json(err);
          }
          else {
            res.json(rows);
          }
        });
      }
      catch (e) {
      }
      finally {
      }
    });

 router.get('/Get_purchase_return_master/:purchase_return_master_Id_?',function(req,res,next)
 { 
 try 
 {
purchase_return_master.Get_purchase_return_master(req.params.purchase_return_master_Id_, function (err, rows) 
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
 router.get('/Delete_purchase_return_master/:purchase_return_master_Id_?',function(req,res,next)
 { 
 try 
 {
purchase_return_master.Delete_purchase_return_master(req.params.purchase_return_master_Id_, function (err, rows) 
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

  


  router.get('/Search_Invoice_By_Supplier_Typeahead', function (req, res, next) {
    try {
      purchase_return_master.Search_Invoice_By_Supplier_Typeahead(
        req.query.Client_Accounts_Id_,
        req.query.InvoiceNo_, function (err, rows) {
        if (err) {
          console.log(err)
          res.json(err);
        }
        else {
          res.json(rows);
        }
      });
    }
    catch (e) {
    }
    finally {
    }
  });

  
router.get('/Get_PurchaseReturn_Item_Code_Typeahead', function (req, res, next) {
  try {
    purchase_return_master.Get_PurchaseReturn_Item_Code_Typeahead(req.query.Purchase_Master_Id,req.query.Item_Code, function (err, rows) {
      if (err) {
        console.log(err)
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {
  }
  finally {
  }
});

router.get('/Get_purchase_return_details/:purchase_return_master_Id?',function(req,res,next)
{ 
try 
{
  purchase_return_master.Get_purchase_return_details(req.params.purchase_return_master_Id, function (err, rows) 
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

