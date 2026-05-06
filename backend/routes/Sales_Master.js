var express = require('express');
var router = express.Router();
var Sales_Master=require('../models/Sales_Master');
var request = require('request');

router.get('/Get_Location', function(req, res, next) {
  request.get({
    "headers": { "content-type": "application/json" },
    "url": "http://geolocation-db.com/json",
    "body":""
  }, (error, response, body) => {
    if(error) 
    {
        return console.dir(error);
    }
    //console.log(JSON.parse(body).city);
    res.json(body);
    //console.dir(JSON.parse(body));
  });
  });
  
router.post('/Save_Sales_Master/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Sales_Master(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.status(500).json({ message: 'Error Occured', error: (e && e.message) ? e.message : String(e) });
      }
      });      

 router.post('/Save_Sales_Master_Mobile/',async function(req,res,next)
      { 
      try 
      {
      const resp=await Sales_Master.Save_Sales_Master_Mobile(req.body);
      return res.send(resp);
      }
      catch(e){
      return res.status(500).json({ message: 'Error Occured', error: (e && e.message) ? e.message : String(e) });
      }
      });




      router.get('/Search_Sales_Master',function(req,res,next)
{ 
try 
{
	Sales_Master.Search_Sales_Master( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
    req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
    req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.AccountType_Id_,req.query.User_Details_Id_,
    req.query.User_Type, req.query.Login_User_Id,
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


      router.get('/Get_Sales_Details/:Sales_Master_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_Sales_Details(req.params.Sales_Master_Id_, function (err, rows) 
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
router.get('/Change_Bill_Status/:Sales_Master_Id_?/:BillType_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Change_Bill_Status(req.params.Sales_Master_Id_,req.params.BillType_, function (err, rows) 
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

// Quotation workflow status + reference helpers
router.get('/Get_ReferenceId_ByQuotation/:SalesQuotationMaster_Id_?', function (req, res, next) {
  try {
    Sales_Master.Get_ReferenceId_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) {
      if (err) return res.json(err);
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.get('/Get_Proforma_History_ByReference/:ReferenceID_?', function (req, res, next) {
  try {
    Sales_Master.Get_Proforma_History_ByReference(req.params.ReferenceID_, function (err, rows) {
      if (err) return res.json(err);
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.get('/Update_Quotation_Workflow_Status/:SalesQuotationMaster_Id_?/:StatusCode_?', function (req, res, next) {
  try {
    Sales_Master.Update_Quotation_Workflow_Status(req.params.SalesQuotationMaster_Id_, req.params.StatusCode_, function (err, rows) {
      if (err) return res.json(err);
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});
 router.get('/Search_Sales_Master_Mobile/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Invoice_No_?/:Employee_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Search_Sales_Master_Mobile(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.Account_Party_Id_,req.params.Invoice_No_,req.params.Employee_Id_, function (err, rows) 
      {
      if (err) 
      {
      res.json(err);
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
        console.log(e)
      }
      finally 
      {
      }
      });
router.get('/Get_Sales_Master_Mobile/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Sales_Master_Mobile(req.params.Sales_Master_Id_, function (err, rows) 
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
  router.get('/Get_Sales_Details_forprint/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Sales_Details_forprint(req.params.Sales_Master_Id_, function (err, rows) 
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
  router.get('/Selected_Delete/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Selected_Delete(req.params.Sales_Master_Id_, function (err, rows) 
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
  router.get('/Get_Store_Details/:Store_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Store_Details(req.params.Store_Id_, function (err, rows) 
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
router.get('/Get_Receipt_Voucher_Mobile/:Sales_Master_Id_?',function(req,res,next)
    { 
    try 
    {
    Sales_Master.Get_Receipt_Voucher_Mobile(req.params.Sales_Master_Id_, function (err, rows) 
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
router.get('/Search_Key_Value/:Key_Value_Name_?',function(req,res,next)
    { 
    try 
    {
    Sales_Master.Search_Key_Value(req.params.Key_Value_Name_, function (err, rows) 
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
router.get('/Get_Sales_Master/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Sales_Master(req.params.Sales_Master_Id_, function (err, rows) 
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
router.get('/Delete_Sales_Master/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Delete_Sales_Master(req.params.Sales_Master_Id_, function (err, rows) 
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
router.get('/Delete_Sales_Master_Mobile/:Sales_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Delete_Sales_Master_Mobile(req.params.Sales_Master_Id_, function (err, rows) 
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
router.get('/Get_Bill_Type/:Group_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Bill_Type(req.params.Group_Id_, function (err, rows) 
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
  router.get('/Load_Cess/',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Load_Cess( function (err, rows) 
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
  router.get('/Load_Bill_Mode/',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Load_Bill_Mode( function (err, rows) 
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

  router.get('/Load_Company/',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Load_Company( function (err, rows) 
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


  router.get('/Load_currencydetails/',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Load_currencydetails( function (err, rows) 
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


  
router.get('/Search_Customer_Typeahead/:Account_Group_Id_?/:Client_Accounts_Name_?',function(req,res,next)
{ 
  console.log(req);
try 
{
  Sales_Master.Search_Customer_Typeahead(req.params.Account_Group_Id_,req.params.Client_Accounts_Name_, function (err, rows) 
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




router.post('/Save_Prodution_Master/', async function (req, res, next) {
  try {
    const resp = await Sales_Master.Save_Prodution_Master(req.body);
    //console.log(resp);
    return res.send(resp);
  }
  catch (e) {
    //console.log(e)
    return res.send(e);
  }
});

router.get('/Search_Prodution_Master',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Search_Prodution_Master(req.query.Is_Date_Check_, req.query.FromDate_, req.query.ToDate_,
          req.query.Production_No_,function (err, rows)
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
      
router.get('/Delete_Prodution_Master/:Prodution_Master_Id_?',function(req,res,next)
  { 
  try 
  {
    Sales_Master.Delete_Prodution_Master(req.params.Prodution_Master_Id_, function (err, rows)
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
router.get('/Get_Prodution_Master/:Prodution_Master_Id_?',function(req,res,next)
  { 
  try 
  {
    Sales_Master.Get_Prodution_Master(req.params.Prodution_Master_Id_, function (err, rows)
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
  
router.get('/Load_Hsn_Sales_Report',function(req,res,next)
{
    try
    {
      Sales_Master.Load_Hsn_Sales_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_Hsn_Sales_Return_Report',function(req,res,next)
{
    try
    {
      Sales_Master.Load_Hsn_Sales_Return_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_B2B_SaleTax_Report',function(req,res,next)
{
    try
    {
      Sales_Master.Load_B2B_SaleTax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_B2C_SaleTax_Report',function(req,res,next)
{
    try
    {
      Sales_Master.Load_B2C_SaleTax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
  
router.get('/Load_Sales_Return_Tax_Report',function(req,res,next)
{
    try
    {
      Sales_Master.Load_Sales_Return_Tax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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


  router.get('/Load_Hsn_Sales_Report',function(req,res,next)
  {
      try
      {
        Sales_Master.Load_Hsn_Sales_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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

  router.post('/Save_Quotation/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Quotation(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      });
      
      // router.get('/Search_Quotation/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Quot_No_?/:Part_No_?/:Item_Group_Id_?/:CurrencyDetails_Id_?/:User_Details_Id_?',function(req,res,next)
      // { 
      // try 
      // {
      // Sales_Master.Search_Quotation(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,
      //   req.params.Account_Party_Id_,req.params.Quot_No_,req.params.Part_No_,req.params.Item_Group_Id_,req.params.CurrencyDetails_Id_,req.params.User_Details_Id_,function (err, rows) 
      // {
      // if (err) 
      // {
      //   console.log(err);
      // res.json(err);
      // }
      // else 
      // {
      // res.json(rows);
      // }
      // });
      // }
      // catch (e) 
      // {
      //   console.log(e);
      // }
      // finally 
      // {
      // }
      // });


      router.get('/Search_Quotation',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Search_Quotation( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
          req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
          req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.User_Details_Id_,
          req.query.User_Type_, req.query.Login_User_Id_, 
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
      router.get('/Get_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Get_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) 
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

  router.get('/Delete_Quotation_Master/:SalesQuotationMaster_Id_?',function(req,res,next)
  { 
  try 
  {
    Sales_Master.Delete_Quotation_Master(req.params.SalesQuotationMaster_Id_, function (err, rows)
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

      router.post('/Save_PerformaInvoice/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_PerformaInvoice(req.body);
          console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      });


      

router.get('/Search_PerformaInvoice',function(req,res,next)
{ 
try 
{
  console.log('Search_PerformaInvoice - req.query: ', req.query);
	Sales_Master.Search_PerformaInvoice( 
                            req.query.look_In_Date_Value,
                            req.query.From_Date, 
                            req.query.To_Date, 
                            req.query.Customer, 
                            req.query.InvoiceNo, 
                            req.query.partNo, 
                            req.query.Item_Group_Id_, 
                            req.query.CurrencyDetails_Id_, 
                            req.query.AccountType_Id_, 
                            req.query.User_Type,
                            req.query.Login_User_Id,
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


      router.get('/Load_StatementofAccount_Report/:Client_Id_?/:FromDate_?/:ToDate_?/:Voucher_?/:CurrencyId_?/:TypeId_?/:User_Type?/:Login_User?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Load_StatementofAccount_Report(req.params.Client_Id_,req.params.FromDate_,req.params.ToDate_,
        req.params.Voucher_,req.params.CurrencyId_,req.params.TypeId_, req.params.User_Type, req.params.Login_User,
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


      router.get('/Delete_Performa_Invoice_Master/:PerformaInvoiceMaster_Id_?',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Delete_Performa_Invoice_Master(req.params.PerformaInvoiceMaster_Id_, function (err, rows)
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




      router.post('/Save_Purchase_order/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Purchase_order(req.body);
          console.log(resp);
          return res.send(resp);     
        }
        catch(e){
          console.log(e)
        return res.send(e);
        }
        });
      /*** Added on 18-09-2024 */

      router.post('/Save_Delivery_Order/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Delivery_Order(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      });



      

     

      router.get('/Search_PurchaseOrder',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Search_PurchaseOrder( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
          req.query.Customer_,req.query.orderNo_,req.query.partNo_,
          req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,
          req.query.AccountType_Id_,
          req.query.User_Type,
          req.query.Login_User_Id,
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
      
      router.get('/Search_Delivery_Order',function(req,res,next)
{ 
try 
{
	Sales_Master.Search_Delivery_Order( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
    req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
    req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.User_Details_Id_,
    req.query.Account_Type_Id_, req.query.User_Type, req.query.Login_User_Id,
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

      // router.get('/Search_Delivery_Order/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Quot_No_?/:Part_No_?/:Item_Group_Id_?/:CurrencyDetails_Id_?/:User_Details_Id_?/:Account_Type_Id_?',function(req,res,next)
      // { 
      // try 
      // {
      // Sales_Master.Search_Delivery_Order(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,
      //   req.params.Account_Party_Id_,req.params.Quot_No_,req.params.Part_No_,req.params.Item_Group_Id_,req.params.CurrencyDetails_Id_,req.params.User_Details_Id_,req.params.Account_Type_Id_,function (err, rows) 
      // {
      // if (err) 
      // {
      //   console.log(err);
      // res.json(err);
      // }
      // else 
      // {
      // res.json(rows);
      // }
      // });
      // }
      // catch (e) 
      // {
      //   console.log(e);
      // }
      // finally 
      // {
      // }
      // });
  


      router.get('/Search_Delivery_Order',function(req,res,next)
{ 
try 
{
	Sales_Master.Search_Delivery_Order( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
    req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
    req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.User_Details_Id_,
    req.query.Account_Type_Id_,
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


      router.get('/Get_PurchaseOrder_Details/:Purchase_OrderMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_PurchaseOrder_Details(req.params.Purchase_OrderMaster_Id_, function (err, rows) 
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

      router.get('/Delete_Delivery_Order/:DeliveryOrderMaster_Id?',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Delete_Delivery_Order(req.params.DeliveryOrderMaster_Id, function (err, rows)
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



      router.get('/Delete_Purchase_Order/:Purchase_OrderMaster_Id_?',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Delete_Purchase_Order(req.params.Purchase_OrderMaster_Id_, function (err, rows)
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




      router.get('/Search_PackingDEtail',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Search_PackingDEtail( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
          req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
          req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.User_Details_Id_,
          req.query.User_Type, req.query.Login_User_Id,
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
      

      router.get('/Get_Delivery_Order_Details/:DeliveryOrderMaster_Id?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_Delivery_Order_Details(req.params.DeliveryOrderMaster_Id, function (err, rows) 
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


      router.get('/Get_Performa_invoice_Details/:PerformaInvoiceMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_Performa_invoice_Details(req.params.PerformaInvoiceMaster_Id_, function (err, rows) 
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


      /*** Added on 19-09-2024 */

      router.get('/Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo/:DeliveryOrderMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(req.params.DeliveryOrderMaster_Id_, function (err, rows) 
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

      router.post('/Save_PackingDetails/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_PackingDetails(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      });

      router.get('/Search_PackingDEtails/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Quot_No_?/:Part_No_?/:Item_Group_Id_?/:CurrencyDetails_Id_?/:User_Details_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Search_PackingDEtails(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,
        req.params.Quot_No_,req.params.Part_No_,function (err, rows) 
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


      router.get('/Get_Packing_Details/:PackingList_Master_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_Packing_Details(req.params.PackingList_Master_Id_, function (err, rows) 
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


      router.get('/Load_Profoma_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Load_Profoma_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) 
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

      router.get('/Load_Invoice_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Load_Invoice_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) 
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

      router.get('/Load_Delivery_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Load_Delivery_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) 
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

      router.get('/Load_Purchase_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Load_Purchase_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) 
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


      router.get('/Delete_Packing_Master/:PackingList_Master_Id_?',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Delete_Packing_Master(req.params.PackingList_Master_Id_, function (err, rows)
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
    
      

      router.post('/Save_Sales_Returns_Master/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Sales_Returns_Master(req.body);
          // console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      });  








      router.get('/Get_SalesReturn_Details/:Sales_Return_Master_Id_?',function(req,res,next)
      { 
      try 
      {
      Sales_Master.Get_SalesReturn_Details(req.params.Sales_Return_Master_Id_, function (err, rows) 
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



      router.get('/Delete_SalesReturn_Master/:Sales_Return_Master_Id_?',function(req,res,next)
  { 
  try 
  {
  Sales_Master.Delete_SalesReturn_Master(req.params.Sales_Return_Master_Id_, function (err, rows) 
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


router.post('/Save_AddStock/',async function(req,res,next)
{ 
try 
{
    const resp=await Sales_Master.Save_AddStock(req.body);
    //console.log(resp);
   return res.send(resp);     
}
catch(e){
  console.log(e)
return res.send(e);
}
});


router.get('/Search_AddStock/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:User_Type?/:Login_User_Id?',function(req,res,next)
{ 
try 
{
Sales_Master.Search_AddStock(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,req.params.User_Type,
                             req.params.Login_User_Id,function (err, rows) 
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


router.get('/Get_AddStock_Details/:Stock_Add_Master_Id_?',function(req,res,next)
{ 
try 
{
Sales_Master.Get_AddStock_Details(req.params.Stock_Add_Master_Id_, function (err, rows) 
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


router.get('/Delete_AddStock_Master/:Stock_Add_Master_Id_?',function(req,res,next)
{ 
try 
{
  Sales_Master.Delete_AddStock_Master(req.params.Stock_Add_Master_Id_, function (err, rows)
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

router.get('/Load_GRn_Pending_List_ByPurchaseOrder/:Purchase_OrderMaster_Id_?',function(req,res,next)
{ 
try 
{
Sales_Master.Load_GRn_Pending_List_ByPurchaseOrder(req.params.Purchase_OrderMaster_Id_, function (err, rows) 
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


router.get('/Search_GRN_Order/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Quot_No_?/:Part_No_?/:Item_Group_Id_?/:CurrencyDetails_Id_?/:User_Details_Id_?/:Account_Type_Id_?',function(req,res,next)
{ 
try 
{
Sales_Master.Search_GRN_Order(req.params.Is_Date_Check_,req.params.FromDate_,req.params.ToDate_,
  req.params.Account_Party_Id_,req.params.Quot_No_,req.params.Part_No_,req.params.Item_Group_Id_,req.params.CurrencyDetails_Id_,req.params.User_Details_Id_,req.params.Account_Type_Id_,function (err, rows) 
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


/*** Added on 14-10-2024 */

router.get('/Load_Delivery_Order_Master/:DeliveryOrderMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Load_Delivery_Order_Master(req.params.DeliveryOrderMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });

 /**** */


/*** Added on 15-10-2024 */

router.get('/Load_SalesQuotationMaster/:SalesQuotationMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Load_SalesQuotationMaster(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });
 

/*** */

/*** Added on 16-10-2024 */

router.get('/Get_Proforma_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Get_Proforma_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });

 router.get('/Load_PerformaInvoiceMaster/:PerformaInvoiceMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Load_PerformaInvoiceMaster(req.params.PerformaInvoiceMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });
 

/*** */




/*** Added on 17-10-2024 */

router.get('/Get_Salesmaster_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Get_Salesmaster_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });

 router.get('/Get_Proforma_InvoiceClick_Details/:PerformaInvoiceMaster_Id_Edit_?',function(req,res,next)
{ 
try 
{ Sales_Master.Get_Proforma_InvoiceClick_Details(req.params.PerformaInvoiceMaster_Id_Edit_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });

 router.get('/Load_SalesMaster/:Sales_Master_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Load_SalesMaster(req.params.Sales_Master_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });


 router.get('/Get_Proforma_DOClick_Details/:PerformaInvoiceMaster_Id_Edit_?',function(req,res,next)
 { 
 try 
 { Sales_Master.Get_Proforma_DOClick_Details(req.params.PerformaInvoiceMaster_Id_Edit_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
 catch (e) {console.log(e);}
 finally {}
  });
 router.get('/Get_DeliveryOrder_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Get_DeliveryOrder_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });


  router.get('/Get_Purchase_order_GRNClick_Details/:Purchase_OrderMaster_Id_Edit_?',function(req,res,next)
  { 
  try 
  { Sales_Master.Get_Purchase_order_GRNClick_Details(req.params.Purchase_OrderMaster_Id_Edit_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
  catch (e) {console.log(e);}
  finally {}
   });

   router.get('/Get_PurchaseOrder_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
   { 
   try 
   { Sales_Master.Get_PurchaseOrder_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
   catch (e) {console.log(e);}
   finally {}
    });


    router.get('/Get_PackingList_Quotation_Details/:SalesQuotationMaster_Id_?',function(req,res,next)
    { 
    try 
    { Sales_Master.Get_PackingList_Quotation_Details(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
    catch (e) {console.log(e);}
    finally {}
     });


     /** Added on 19-10-2024 */

     router.get('/Load_PackingList_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?',function(req,res,next)
     { try { Sales_Master.Load_PackingList_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_, function (err, rows) { if (err) {res.json(err);} else { res.json(rows);}}); }catch (e) {} finally {} });
     /**** */

     /*** Added on 23-10-2024 */

     router.get('/Get_Delivery_Salesmaster/:DeliveryOrderMaster_Id_?',function(req,res,next)
{ 
try 
{ Sales_Master.Get_Delivery_Salesmaster(req.params.DeliveryOrderMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
catch (e) {console.log(e);}
finally {}
 });

 /*** Added on 24-10-2024 */

 router.get('/Load_Vat_Percentage/',function(req,res,next) { try { Sales_Master.Load_Vat_Percentage( function (err, rows) { if (err) { res.json(err); } else { res.json(rows); } }); } catch (e){} finally{} });
 
 /*** */

 /*** Added on 26-10-2024 */


/*** Added on 28-10-2024 */

router.get('/Get_Item_Code_Typeahead_For_Purchase_Return/:Purchase_Master_Id_?/:Item_Code_?', function (req, res, next) {
  try {
    Sales_Master.Get_Item_Code_Typeahead_For_Purchase_Return(req.params.Purchase_Master_Id_,req.params.Item_Code_, function (err, rows) {
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


router.post('/Get_Item_Name_Typeahead_For_Purchase_Return', async function (req, res, next) {
  try {
    console.log('req.body: ',req.body)
    Sales_Master.Get_Item_Name_Typeahead_For_Purchase_Return(req.body.Purchase_Master_Id_,req.body.Item_Name_, function (err, rows) {
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



router.get('/Get_Item_Code_Typeahead_For_Sales_Return/:Sales_Master_Id_?/:Item_Code_?', function (req, res, next) {
  try {
    Sales_Master.Get_Item_Code_Typeahead_For_Sales_Return(req.params.Sales_Master_Id_,req.params.Item_Code_, function (err, rows) {
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


router.post('/Get_Item_Name_Typeahead_For_Sales_Return', async function (req, res, next) {
  try {
    console.log('req.body : ',req.body);
    Sales_Master.Get_Item_Name_Typeahead_For_Sales_Return(req.body.Sales_Master_Id_,req.body.Item_Name_, function (err, rows) {
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
 
router.post('/Save_Price_Request/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Price_Request(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      })


router.post('/Save_Price_Request/',async function(req,res,next)
      { 
      try 
      {
          const resp=await Sales_Master.Save_Price_Request(req.body);
          //console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.send(e);
      }
      })
router.get('/Search_Price_Request',function(req,res,next)
      { 
      try 
      {
        Sales_Master.Search_Price_Request( req.query.Is_Date_Check_,req.query.From_Date_,req.query.To_Date_,
          req.query.Customer_,req.query.QuotNo_,req.query.partNo_,
          req.query.Item_Group_Id_,req.query.CurrencyDetails_Id_,req.query.User_Details_Id_,
          req.query.User_Type_, req.query.Login_User_Id_, 
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
      })

router.get('/Get_Price_Request_Details/:PriceRequestMaster_Id_?',function(req,res,next)
{ Sales_Master.Get_Price_Request_Details(req.params.PriceRequestMaster_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
);
router.get('/Delete_Price_Request_Master/:Price_Request_Master_Id_?',function(req,res,next)
{ Sales_Master.Delete_Price_Request_Master(req.params.Price_Request_Master_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
);
router.get('/Load_Price_Request_Master/:Price_Request_Master_Id_?',function(req,res,next)
{ Sales_Master.Load_Price_Request_Master(req.params.Price_Request_Master_Id_, function (err, rows) { if (err) {console.log(err); res.json(err);} else {res.json(rows);} });}
);

module.exports = router;
