 var express = require('express');
 var router = express.Router();
 var sales_return_master=require('../models/Sales_Return_Master');
 router.post('/Save_sales_return_master/',function(req,res,next)
 { 
 try 
 {
sales_return_master.Save_sales_return_master(req.body, function (err, rows) 
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
       
        router.get('/Search_SalesReturn_Master',function(req,res,next)
        { 
        try 
        {
          sales_return_master.Search_SalesReturn_Master( req.query.Is_Date_Check,req.query.FromDate,req.query.ToDate,
            req.query.Customer,req.query.QuotNo,req.query.partNo,req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,
            req.query.AccountType_Id_,req.query.User_Type, req.query.Login_User_Id,
             function (err, rows)
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

        router.get(
          "/Search_SaleInvoice_By_Supplier_Typeahead/:Client_Accounts_Id_?/:InvoiceNo_?",
          function (req, res, next) {
            try {
              sales_return_master.Search_SaleInvoice_By_Supplier_Typeahead(
                req.params.Client_Accounts_Id_,
                req.params.InvoiceNo_,
                function (err, rows) {
                  if (err) {
                    res.json(err);
                  } else {
                    res.json(rows);
                  }
                }
              );
            } catch (e) {
            } finally {
            }
          }
        );
  
//  router.get('/Search_SalesReturn_Master/',function(req,res,next)
//  { req.query.User_Details_Id_,
//  try 
//  {
// sales_return_master.Search_SalesReturn_Master(req.query.sales_return_master_Name, function (err, rows) 
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
 router.get('/Get_sales_return_master/:sales_return_master_Id_?',function(req,res,next)
 { 
 try 
 {
sales_return_master.Get_sales_return_master(req.params.sales_return_master_Id_, function (err, rows) 
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
 router.get('/Delete_sales_return_master/:sales_return_master_Id_?',function(req,res,next)
 { 
 try 
 {
sales_return_master.Delete_sales_return_master(req.params.sales_return_master_Id_, function (err, rows) 
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

