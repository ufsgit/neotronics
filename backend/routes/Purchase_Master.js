 var express = require('express');
 var router = express.Router();
 var Purchase_Master=require('../models/Purchase_Master');
 const upload = require('../helpers/multer-helper');
 const asyncHandler = require("../helpers/async-handler");
 const { sendSuccess } = require("../helpers/api-response");
//  router.post('/Save_Purchase_Master/',async function(req,res,next)
//         { 
//         try 
//         {
//         const resp=await Purchase_Master.Save_Purchase_Master(req.body);
//         return res.send(resp);
//         }
//         catch(e){
//         return res.send(e);
//         }
//       });


      router.post('/Save_Purchase_Master', asyncHandler(async (req, res, next) =>
      {
       try
       {
      //    const file = req.files
      // var Doc_Image = ""
      //    var Photo_ = [];
      //    if (!file) 
      //    {
      //    }
      //    else
      //    {           
      //     for (var i = 0; i < req.body.Document_File_Array; i++) {
      //       if (i == req.body.ImageFile_Doc) 
      //       Doc_Image = file[i].filename;
      //     }
      //     // console.log(Doc_Image);      
      //    }
      //    var Image_Detail="";
      //    var Original_Name="";
      //    if (Photo_.length>0)
      //    {
      //      Image_Detail=Photo_[0].File_name;
      //     Original_Name=Photo_[0].Orignal_Name;
      //    }
      //      var Photo_json = JSON.stringify(Photo_)



          //  console.log('req.body:', req.body);
          //  var Purchase_D       
          //  Purchase_D =
          //  {
          //     "Purchase_Master_Id": req.body.Purchase_Master_Id,
          //    "Account_Party_Id":req.body.Account_Party_Id,
          //    "Entry_Date":req.body.Entry_Date,
          //    "PurchaseDate":req.body.PurchaseDate,
          //    "InvoiceNo":req.body.InvoiceNo,
          //    "Discount":req.body.Discount,
          //    "Roundoff":req.body.Roundoff,
          //    "TotalAmount":req.body.TotalAmount,
          //    "TotalDiscount":req.body.TotalDiscount,
          //    "TaxableAmount":req.body.TaxableAmount,
          //    "TotalCGST":req.body.TotalCGST,
          //    "TotalSGST":req.body.TotalSGST,             
          //    "Other_Charges":req.body.Other_Charges,
          //    "GrossTotal":req.body.GrossTotal,
          //    "NetTotal":req.body.NetTotal,
          //    "BillType":req.body.BillType,
          //    "Bill_Type_Name":req.body.Bill_Type_Name,
          //    "User_Id":req.body.User_Id,
          //    "Description":req.body.Description,
          //     "Purchase_Details":req.body.Purchase_Details,
          //     "Document_Name": req.body.Document_Name,
          //     // "File_Name": Doc_Image,
          //     "Item_Group_Id": req.body.Item_Group_Id,
          //     "Item_Group_Name": req.body.Item_Group_Name,
          //     "File_Path": req.body.File_Path,
          //     "Branch_Id": req.body.Branch_Id,
          //     "Branch_Name": req.body.Branch_Name
          
          //  };
  
          
          var jsondata1 = JSON.stringify(req.body)
       
      
        //  var Purchase_Data=
        //  {
        //    "Purchase": jsondata1,
        //    "Purchase_document":Photo_json,
      
        //  };


//  console.log(Purchase_Data);


         const rows = await new Promise((resolve, reject) => {
           Purchase_Master.Save_Purchase_Master(jsondata1, function (err, rows) {
             if (err) return reject(err);
             resolve(rows);
           });
         });
         return sendSuccess(res, { message: "Saved", data: Array.isArray(rows) ? rows : [rows] });
         
       }
      
       catch (err) 
       {
         throw err;
       }
         finally 
         {
         }
       }
      ));   


router.get('/Search_Item_Typeahead/:Item_Name_?',function(req,res,next)
    { 
    try 
    {
    Purchase_Master.Search_Item_Typeahead(req.params.Item_Name_, function (err, rows) 
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

    

    router.get('/Search_Purchase_Master',function(req,res,next)
{ 
try 
{
  console.log('Search_Purchase_Master - req.query: ', req.query);
	Purchase_Master.Search_Purchase_Master( 
                            req.query.look_In_Date_Value,
                            req.query.From_Date, 
                            req.query.To_Date, 
                            req.query.Customer, 
                            req.query.InvoiceNo, 
                            req.query.partNo, 
                            req.query.User_Details_Id_,
                            req.query.Item_Group_Id_, 
                            req.query.CurrencyDetails_Id_, 
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
}
finally 
{
}
});


router.get('/Get_Purchase_Master/:Purchase_Master_Id_?',function(req,res,next)
    { 
    try 
    {
    Purchase_Master.Get_Purchase_Master(req.params.Purchase_Master_Id_, function (err, rows) 
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
router.get('/Delete_Purchase_Master/:Purchase_Master_Id_?',function(req,res,next)
    { 
    try 
    {
    Purchase_Master.Delete_Purchase_Master(req.params.Purchase_Master_Id_, function (err, rows) 
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

router.get('/Get_Purchase_Typeahead/:ItemName_?',function(req,res,next)
  { 
  try 
  {
    Purchase_Master.Get_Purchase_Typeahead(req.params.ItemName_, function (err, rows)
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
router.get('/Get_Purchase_Item_Typeahead/:ItemName_?',function(req,res,next)
  { 
  try 
  {
    Purchase_Master.Get_Purchase_Item_Typeahead(req.params.ItemName_, function (err, rows) 
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
  
  router.get('/Get_Barcode_Purchase/:Barcode_?',function(req,res,next)
  { 
  try 
  {
    Purchase_Master.Get_Barcode_Purchase(req.params.Barcode_, function (err, rows) 
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

  
  
router.get('/Search_Service_Type_Typeahead',function(req,res,next)
  { 
  try 
  {
    Purchase_Master.Search_Service_Type_Typeahead(req.query.Service_Type_Name_, function (err, rows)
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

router.get('/Get_Purchase_Details/:Purchase_Master_Id_?',function(req,res,next)
{ 
try 
{
Purchase_Master.Get_Purchase_Details(req.params.Purchase_Master_Id_, function (err, rows) 
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

router.get('/Search_Purchase_Report/:Is_Date_Check_?/:From_Date_?/:To_Date_?/:Account_Party_Id_?/:Branch_Id_?/:Voucher_No_?',function(req,res,next)
{
    try
    {
      console.log('req.query: ', req.params);
      Purchase_Master.Search_Purchase_Report(req.params.Is_Date_Check_, req.params.From_Date_, req.params.To_Date_, req.params.Account_Party_Id_,req.params.Branch_Id_,req.params.Voucher_No_,function(err,rows)
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
router.get('/Search_Purchase_Details_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Search_Purchase_Details_Report(req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_, req.query.Account_Party_Id_,
        req.query.Voucher_No, req.query.Item_Id,function(err,rows)
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

router.get('/Load_Hsn_Purchase_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Hsn_Purchase_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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

router.get('/Load_Hsn_Service_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Hsn_Service_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_Hsn_Purchase_Return_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Hsn_Purchase_Return_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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

router.get('/Load_Purchase_SaleTax_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Purchase_SaleTax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_Purchase_Return_Tax_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Purchase_Return_Tax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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
router.get('/Load_Service_Tax_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Load_Service_Tax_Report(req.query.From_Date_, req.query.To_Date_, function(err,rows)
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


router.get('/Search_Purchase_Return_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Search_Purchase_Return_Report(req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_, req.query.Account_Party_Id_,
        req.query.Voucher_No,function(err,rows)
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
  

router.get('/Search_Purchase_Return_Details_Report',function(req,res,next)
{
    try
    {
      Purchase_Master.Search_Purchase_Return_Details_Report(req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_, req.query.Account_Party_Id_,
        req.query.Voucher_No, req.query.Item_Id,function(err,rows)
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
  router.post('/Save_Service/',async function(req,res,next)
        { 
        try 
        {
        const resp=await Purchase_Master.Save_Service(req.body);
        return res.send(resp);
        }
        catch(e){
        return res.send(e);
        }
      });
      
router.get('/Search_Service/',function(req,res,next)
    { 
    try 
    {
      Purchase_Master.Search_Service(req.query.Is_Date_Check_, req.query.FromDate_, req.query.ToDate_, req.query.Account_Party_Id_, req.query.InvoiceNo_, function (err, rows)
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

      
router.get('/Search_Service_Details_Report/',function(req,res,next)
    { 
    try 
    {
      Purchase_Master.Search_Service_Details_Report(req.query.Is_Date_Check_, req.query.FromDate_, req.query.ToDate_, req.query.Account_Party_Id_,
        req.query.InvoiceNo_, req.query.Service_Type_Id, function (err, rows)
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
router.get('/Get_Service/:Service_Id_?',function(req,res,next)
    { 
    try 
    {
      Purchase_Master.Get_Service(req.params.Service_Id_, function (err, rows)
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
router.get('/Delete_Service/:Service_Id_?',function(req,res,next)
    { 
    try 
    {
      Purchase_Master.Delete_Service(req.params.Service_Id_, function (err, rows)
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

/****Added on 23-02-2024 */

    router.get('/Get_Item_Name_Get_With_Code/:Item_Code_?/:Item_Group_Id_?',function(req,res,next)
  { 
    try 
    {
      Purchase_Master.Get_Item_Name_Get_With_Code(req.params.Item_Code_,req.params.Item_Group_Id_, function (err, rows) 
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

  
  router.get('/Get_Item_Name_Get_With_Code_App/:Item_Code_?/:Item_Group_Id_?/:Item_Name_?',function(req,res,next)
  { 
    try 
    {
      console.log(req.params.Item_Code_,req.params.Item_Group_Id_);
      Purchase_Master.Get_Item_Name_Get_With_Code_App(req.params.Item_Code_,req.params.Item_Group_Id_,req.params.Item_Name_, function (err, rows) 
      {
        if (err) 
        {
          console.log(err);
          res.json(err);
        }
        else 
        {
          console.log(rows);
          res.json(rows);
        }
      });
    }
    catch (e) {}
    finally {}
  });


/****Added on 24-02-2024 */

//   router.post('/Save_Purchase_Master_App/',async function(req,res,next)
//   { 
//   try 
//   {
//   const resp=await Purchase_Master.Save_Purchase_Master_App(req);
//   return res.send(resp);
//   }
//   catch(e){
//   return res.send(e);
//   }
// });

router.post('/Save_Purchase_Master_App/', asyncHandler(async function(req,res,next)
        { 
        const resp = await Purchase_Master.Save_Purchase_Master_App(req.body, { log: req.log });
        return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
      }));

      /** Added on 22-08-2024 */

  router.get('/Search_Purchase_Master_Report/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:InvoiceNo_?/:Branch_Id_?',function(req,res,next)
      { 
        try 
        {
          console.log('req.params :',req.params);
          Purchase_Master.Search_Purchase_Master_Report(req.params.Is_Date_Check_,
                                                        req.params.FromDate_,
                                                        req.params.ToDate_,
                                                        req.params.InvoiceNo_,
                                                        req.params.Branch_Id_, function (err, rows) 
          {
            if (err) 
              {
                console.log(err);
                res.json(err);
              }
            else 
              {
                console.log(rows);
                res.json(rows);
              }
          });
      }
      catch (e) {}
      finally {}
      });


  router.get('/Get_Purchase_Details_Report/:Purchase_Master_Id_?',function(req,res,next)
    { 
      try 
      {
        Purchase_Master.Get_Purchase_Details_Report(req.params.Purchase_Master_Id_, function (err, rows) 
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

    /**** Added on 24-09-2024 */

    router.post('/Save_CreditNote_Master_1', (req, res, next) =>
      {
       try
       { 
          var jsondata1 = JSON.stringify(req.body)
       
         Purchase_Master.Save_CreditNote_Master_1(jsondata1, function (err, rows)
             {
      
             if (err) 
             {
               console.error('Save_CreditNote_Master_1 failed:', err);
               return res.status(500).json({ message: 'Save_CreditNote_Master_1 failed', error: err.message || err });
             }
             else
             {
              console.log(rows);
               return res.json(rows);
               
             }
           });
         
       }
      
      catch (err) {}
      finally {}
       }
      ); 


      router.get('/Search_CreditNote',function(req,res,next)
      { 
      try 
      {
        console.log('Search_CreditNote - req.query: ', req.query);

      Purchase_Master.Search_CreditNote
      (
        req.query.Is_Date_Check_, 
        req.query.FromDate_, 
        req.query.ToDate_, 
        req.query.InvoiceNo_,
        req.query.partNo_,
        req.query.Item_Group_Id_,
        req.query.CurrencyDetails_Id_,
        req.query.Customer_,
        req.query.AccountType_Id_,
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



    router.get('/Delete_CreditNote/:CreditNote_Master_Id_?',function(req,res,next)
    { 
    try 
    {
    Purchase_Master.Delete_CreditNote(req.params.CreditNote_Master_Id_, function (err, rows) 
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


router.get('/Get_CreditNote_Details_1/:CreditNote_Master_Id_?',function(req,res,next)
{ 
try 
{
Purchase_Master.Get_CreditNote_Details_1(req.params.CreditNote_Master_Id_, function (err, rows) 
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


/*** Added on 23-10-2024 */

router.get('/loadGRN/:GRNId1_?',function(req,res,next)
{ 
  console.log('req.params.GRNId1_ : ',req.params.GRNId1_);
try 
{
  Purchase_Master.loadGRN(req.params.GRNId1_, function (err, rows) 
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

