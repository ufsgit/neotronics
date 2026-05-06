    var express = require('express');
    var router = express.Router();
    var User_Details=require('../models/User_Details');

router.post('/Save_User_Details/',async function(req,res,next)
      { 
      try 
      {
      const resp=await User_Details.Save_User_Details(req.body);
      return res.send(resp);
      }
      catch(e){
      return res.send(e);
      }
      });
router.get('/Search_User_Details/:User_Type?/:Login_User_Id?/:User_Details_Name_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Search_User_Details(req.params.User_Type, req.params.Login_User_Id, req.params.User_Details_Name_, function (err, rows) 
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
router.get('/Get_User_Details/:User_Details_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Get_User_Details(req.params.User_Details_Id_, function (err, rows) 
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
router.get('/Delete_User_Details/:User_Details_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Delete_User_Details(req.params.User_Details_Id_, function (err, rows) 
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
router.get('/Get_Menu_Permission/:User_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Get_Menu_Permission(req.params.User_Id_, function (err, rows) 
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
 router.get('/User_Employee/:User_Details_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.User_Employee(req.params.User_Details_Id_, function (err, rows) 
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
    router.get('/Get_User_Details_Edit/:User_Details_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Get_User_Details_Edit(req.params.User_Details_Id_, function (err, rows) 
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
    router.get('/Get_Last_Bill_Number/:Store_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Get_Last_Bill_Number(req.params.Store_Id_, function (err, rows) 
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


    
    router.get('/Load_InvoiceType2',function (req, res, next)
        {
        try
        {
         User_Details.Load_InvoiceType2(function (err, rows)
         {
            if (err) 
                {
                    console.log(err)
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

    router.get("/Get_Users_Load_Data",async (req, res, next) =>
        {
        try
        {
        const result = await User_Details.Get_Users_Load_Data();
                    //console.log('result', result);
        res.json(result);
        } 
        catch (e) 
        {
                      // console.log(e)
        res.send(e);
        } 
        finally 
        {
        }
        });


    router.get('/Load_InvoiceType/:AccountType_Name_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Load_InvoiceType(req.params.AccountType_Name_, function (err, rows) 
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

    router.get('/Search_SaleInvoiceNo_Typeahead/:Account_Party_Id_?',function(req,res,next)
    { 
    try 
    {
    User_Details.Search_SaleInvoiceNo_Typeahead(req.params.Account_Party_Id_, function (err, rows) 
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

