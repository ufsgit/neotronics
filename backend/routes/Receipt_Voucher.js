var express = require('express');
var router = express.Router();
var Receipt_Voucher=require('../models/Receipt_Voucher');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");

// router.get('/Get_Location', function(req, res, next) {
//   console.log('1')
//   request({
//     uri: 'http://geolocation-db.com/jsonp',
 
//   }).pipe(res
//     );

// });

router.post('/Save_Receipt_Voucher/', asyncHandler(async function (req, res, next) {
    const resp = await Receipt_Voucher.Save_Receipt_Voucher(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));
router.post('/Save_Receipt_Voucher_Mobile/',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Save_Receipt_Voucher_Mobile(req.body, function (err, rows) 
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
  router.get(
    "/Search_Receipt_Voucher/:From_Date_?/:To_Date_?/:To_Account_Id_?/:Is_Date_Check_?/:Voucher_No_?/:Login_User?/:User_Type?/:CurrencyId_?",
    function (req, res, next) {
      try {
        console.log( req.params);
        Receipt_Voucher.Search_Receipt_Voucher(
          req.params.From_Date_,
          req.params.To_Date_,
          req.params.To_Account_Id_,
          req.params.Is_Date_Check_,
          req.params.Voucher_No_,
          req.params.Login_User,
          req.params.User_Type,
          req.params.CurrencyId_,
          function (err, rows) {
            if (err) {
              console.log(err);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  );
router.get('/Get_Receipt_Voucher/:Receipt_Voucher_Id_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Get_Receipt_Voucher(req.params.Receipt_Voucher_Id_, function (err, rows) 
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
  
router.get('/Get_Receipt_Voucher_Mobile/:Receipt_Voucher_Id_?',function(req,res,next)
{ 
try 
{
Receipt_Voucher.Get_Receipt_Voucher_Mobile(req.params.Receipt_Voucher_Id_, function (err, rows) 
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
router.get('/Delete_Receipt_Voucher/:Receipt_Voucher_Id_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Delete_Receipt_Voucher(req.params.Receipt_Voucher_Id_, function (err, rows) 
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
router.get('/Search_Voucher_Type/',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Search_Voucher_Type( function (err, rows) 
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
  router.get('/Search_Voucher_Type_By_Status/:Status_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Search_Voucher_Type_By_Status(req.params.Status_, function (err, rows) 
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
router.get('/Ledger_Report/:FromDate_?/:ToDate_?/:Client_Id_?/:VoucherType_?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.Ledger_Report(req.params.FromDate_,req.params.ToDate_,req.params.Client_Id_,
  req.params.VoucherType_,function (err, rows) 
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
  {    console.log(e)
  }
  finally 
  {
  }
  });

router.get('/DayBook_Report/:FromDate_?/:ToDate_?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.DayBook_Report(req.params.FromDate_,req.params.ToDate_,function (err, rows) 
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
  router.get('/Get_Sales_summary/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Client_Id_?/:VoucherType_?/:Employee_Id?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.Get_Sales_summary(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Client_Id_,
  req.params.VoucherType_,req.params.Employee_Id,function (err, rows) 
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
  }
  finally 
  {
  }
  });
  
  router.get('/Search_Sales_Report_Details/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Employee_Id_?/:Item_Id_?',function(req,res,next)
    { 
    try 
    {
    console.log(req.params)
    Receipt_Voucher.Search_Sales_Report_Details(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Account_Party_Id_,
    req.params.Employee_Id_,req.params.Item_Id_,function (err, rows) 
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
    }
    finally 
    {
    }
    });
router.get('/Customer_Sales_Report/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Item_Id_?',function(req,res,next)
    { 
    try 
    {
    console.log(req.params)
    Receipt_Voucher.Customer_Sales_Report(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Account_Party_Id_,
    req.params.Item_Id_,function (err, rows) 
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
    }
    finally 
    {
    }
    });
router.get('/Employee_Sales_Report/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Employee_Id_?/:Item_Id_?',function(req,res,next)
    { 
    try 
    {
    console.log(req.params)
    Receipt_Voucher.Employee_Sales_Report(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Employee_Id_,
    req.params.Item_Id_,function (err, rows) 
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
    }
    finally 
    {
    }
    });
  router.get('/Search_Sales_Report/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Employee_Id_?/:Item_Id_?',function(req,res,next)
    { 
    try 
    {
    Receipt_Voucher.Search_Sales_Report(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Account_Party_Id_,
    req.params.Employee_Id_,req.params.Item_Id_,function (err, rows) 
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
 router.get('/Search_Sales_Report_Monthly_Items/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Employee_Id_?/:Item_Id_?',function(req,res,next)
    { 
    try 
    {
    Receipt_Voucher.Search_Sales_Report_Monthly_Items(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Account_Party_Id_,
    req.params.Employee_Id_,req.params.Item_Id_,function (err, rows) 
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
  router.get('/Get_Sales_Details_report',function(req,res,next)
  {
  try 
  {
    Receipt_Voucher.Get_Sales_Details_report(req.query.Is_Date_Check_, req.query.FromDate_,
      req.query.ToDate_, req.query.Client_Id_, req.query.VoucherType_, req.query.ItemId_,function (err, rows)
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
    console.log(e)
  }
  finally 
  {
  }
  }); 
  
router.get('/Search_Sales_Return_Details_Report',function(req,res,next)
  {
  try 
  {
    Receipt_Voucher.Search_Sales_Return_Details_Report(req.query.Is_Date_Check_, req.query.FromDate_,
      req.query.ToDate_, req.query.Client_Id_, req.query.VoucherType_, req.query.ItemId_,function (err, rows)
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
    console.log(e)
  }
  finally 
  {
  }
  }); 
router.get('/Item_Expiry_Report/:Is_Date_Check_ ?/:FromDate_?/:ToDate_?/:Barcode_ ?/:ItemId_?/:GroupId_?/:Employee_Id ?',function(req,res,next)
  {
  try 
  {
  Receipt_Voucher.Item_Expiry_Report(req.params.Is_Date_Check_,req.params.FromDate_,  req.params.ToDate_,
    req.params.Barcode_,req.params.ItemId_,req.params.GroupId_,req.params.Employee_Id,
    function (err, rows) 
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
  router.get('/Get_Stock_Report/:Barcode_ ?/:ItemId_?/:GroupId_?/:Employee_Id ?/:Is_Check_ ?',function(req,res,next)
    {
    try 
    {
    Receipt_Voucher.Get_Stock_Report(req.params.Barcode_,req.params.ItemId_,req.params.GroupId_,req.params.Employee_Id,
      req.params.Is_Check_, function (err, rows) 
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
router.get('/Sales_receipt_Bill/:Account_Party_Id_',function(req,res,next)
    {
    try 
    {
      Receipt_Voucher.Sales_receipt_Bill(req.params.Account_Party_Id_,  function (err, rows)
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

    router.get('/Search_Print_Caption/:Print_Caption_Name_?',function(req,res,next)
    {
    try 
    {
      Receipt_Voucher.Search_Print_Caption(req.params.Print_Caption_Name_,  function (err, rows)
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

router.get('/Load_DayBook_Report/:FromDate_ ?/:ToDate_?',function(req,res,next)
    {
    try 
    {
      Receipt_Voucher.Load_DayBook_Report(req.params.FromDate_, req.params.ToDate_, function (err, rows)
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
    router.get('/Client_Accounts_Typeahead/:Client_Accounts_Name_?/:Group_Id_?',function(req,res,next)
    { 
    try 
    {
    Receipt_Voucher.Client_Accounts_Typeahead(req.params.Client_Accounts_Name_,req.params.Group_Id_, function (err, rows) 
    {
  
    if (err) 
    {
    res.json(err);
    }
    else 
    {
      console.log(err);
    res.json(rows);
    }
    });
    }
    catch (e) 
    {
      console.log(e)
    }
    finally 
    {
    }
    }); 
router.get('/Search_Company/',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Search_Company( function (err, rows) 
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
  console.log(e)
  }
  finally 
  
  {
  }
  }); 

  router.get('/Client_Accounts_Branch_Typeahead/:Client_Accounts_Name_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Client_Accounts_Branch_Typeahead(req.params.Client_Accounts_Name_, function (err, rows) 
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



  router.get('/Search_accountgroup/:accountgroup_Name_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Search_accountgroup(req.params.accountgroup_Name_, function (err, rows) 
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

  /** Added on 18-7-24 */

  router.get('/Master_Category_Typeahead/:Client_Accounts_Name_?',function(req,res,next)
  { 
    try 
    {
      Receipt_Voucher.Master_Category_Typeahead(req.params.Client_Accounts_Name_, function (err, rows) 
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
    catch (e) {}
    finally {}
  }); 


  router.get('/Item_Group_Typeahead/:Client_Accounts_Name_?',function(req,res,next)
  { 
      try 
      {
        Receipt_Voucher.Item_Group_Typeahead(req.params.Client_Accounts_Name_, function (err, rows) 
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
      catch (e) {}
      finally {}
  }); 

  /*** */


  router.get('/Get_Client_Accounts_Typeahead_new/:Client_Accounts_Name_?',function(req,res,next)
  { 
  try 
  {
  Receipt_Voucher.Get_Client_Accounts_Typeahead_new(req.params.Client_Accounts_Name_, function (err, rows) 
  {

  if (err) 
  {
  res.json(err);
  }
  else 
  {
    console.log(err);
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
    console.log(e)
  }
  finally 
  {
  }
  }); 





  // router.get('/Search_StockReport/:Item_Id_?/:partNo_?/:User_Type?/:Login_User',function(req,res,next)
  // { 
  // try 
  // { 
  // console.log(req.params)
  // Receipt_Voucher.Search_StockReport(req.params.Item_Id_,
  // req.params.partNo_, req.params.User_Type, req.params.Login_User,function (err, rows) 
  // {
  // if (err) 
  // {
  //   console.log(err)
  // res.json(err);
  // }
  // else 
  // {
  // res.json(rows);
  // }
  // });
  // }
  // catch (e) 
  // {    console.log(e)
  // }
  // finally 
  // {
  // }
  // });

  router.get('/Search_StockReport',function(req,res,next)
  {
  try 
  {
    Receipt_Voucher.Search_StockReport(req.query.Item_Id_, req.query.partNo_,
      req.query.User_Type_, req.query.Login_User_,function (err, rows)
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
    console.log(e)
  }
  finally 
  {
  }
  }); 

  router.get('/Search_ProfitAndLoss/:FromDate_?/:ToDate_?/:User_Type?/:Login_User?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.Search_ProfitAndLoss(req.params.FromDate_,req.params.ToDate_,req.params.User_Type,req.params.Login_User,function (err, rows) 
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
  {    console.log(e)
  }
  finally 
  {
  }
  });


  router.get('/Search_VatReport/:FromDate_?/:ToDate_?/:User_Type?/:Login_User?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.Search_VatReport(req.params.FromDate_,req.params.ToDate_, req.params.User_Type, req.params.Login_User,
    function (err, rows) 
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
  {    console.log(e)
  }
  finally 
  {
  }
  });


  router.get('/Search_GRNVatReport/:FromDate_?/:ToDate_?/:User_Type?/:Login_User?',function(req,res,next)
  { 
  try 
  {
  console.log(req.params)
  Receipt_Voucher.Search_GRNVatReport(req.params.FromDate_,req.params.ToDate_,
    req.params.User_Type,
    req.params.Login_User,
    function (err, rows) 
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
  {    console.log(e)
  }
  finally 
  {
  }
  });


  router.get('/Search_OutstandingReport/:FromDate_ ?/:ToDate_?/:GroupId_?',function(req,res,next)
  {
  try 
  {
  Receipt_Voucher.Search_OutstandingReport(req.params.FromDate_,req.params.ToDate_,req.params.GroupId_,
    function (err, rows) 
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
  }
  finally 
  {
  }
  }); 
module.exports = router;

