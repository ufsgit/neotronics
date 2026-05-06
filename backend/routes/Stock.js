var express = require('express');
var router = express.Router();
var Stock=require('../models/Stock');
router.post('/Save_Stock/',function(req,res,next)
    { 
    try 
    {
    Stock.Save_Stock(req.body, function (err, rows) 
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
router.post('/Save_Stock_InStockReport/',function(req,res,next)
    { 
    try 
    {
    Stock.Save_Stock_InStockReport(req.body, function (err, rows) 
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

router.get('/Search_Stock/:Stock_Name_?',function(req,res,next)
    { 
    try 
    {
    Stock.Search_Stock(req.params.Stock_Name_, function (err, rows) 
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
router.get('/Get_Stock_Item_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Get_Stock_Item_Typeahead(req.query.Item_Name, function (err, rows)
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

    router.get('/Get_Stock_Item_Code_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Get_Stock_Item_Code_Typeahead(req.query.Item_Code, function (err, rows)
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

    router.get('/Get_Stock_Details_By_Item_Code_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Get_Stock_Details_By_Item_Code_Typeahead(req.query.Item_Code, function (err, rows)
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

router.get('/Get_Sales_Barcode_Typeahead/',function(req,res,next)
    { 
    try 
    {
        Stock.Get_Sales_Barcode_Typeahead(req.query.Barcode_, function (err, rows)
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
    
router.get('/Get_Sales_Item_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Get_Sales_Item_Typeahead(req.query.Item_Name, function (err, rows)
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

    router.get('/Get_ItemsforSalesReturn_Item_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Get_ItemsforSalesReturn_Item_Typeahead(req.query.Item_Name, function (err, rows)
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


router.get('/Get_Barcode_Typeahead/:Barcode_?',function(req,res,next)
    { 
    try 
    {
        console.log(req.params.Barcode_);
    Stock.Get_Barcode_Typeahead(req.params.Barcode_, function (err, rows) 
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
router.get('/Get_Stock/:Stock_Id_?',function(req,res,next)
    { 
    try 
    {
    Stock.Get_Stock(req.params.Stock_Id_, function (err, rows) 
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
router.get('/Delete_Stock/:Stock_Id_?',function(req,res,next)
    { 
    try 
    {
    Stock.Delete_Stock(req.params.Stock_Id_, function (err, rows) 
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
router.get('/Load_Full_Stock/:To_Employee_Id_ ?/:Barcode_?',function(req,res,next)
    { 
    try 
    {
    Stock.Load_Full_Stock(req.params.To_Employee_Id_,req.params.Barcode_, function (err, rows) 
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
router.get('/Load_ItemDetails_MobileSales/:To_Employee_Id_ ?',function(req,res,next)
        { 
        try 
        {
        Stock.Load_ItemDetails_MobileSales(req.params.To_Employee_Id_,function (err, rows) 
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

        // router.get('/Get_Purchase_Item_Code_Typeahead',function(req,res,next)
        // { 
        // try 
        // {
        //     // console.log('req.query.Item_Code: ', req.query.Item_Code);   
        //     // console.log('req._parsedUrl.Url: ', req._parsedUrl.Url);
        //     // console.log('req.query: ', req.query);
        //     Stock.Get_Purchase_Item_Code_Typeahead(req.query.Item_Code, function (err, rows)
        // {
        // if (err) 
        // {
        //     console.log(err)
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
        // }
        // finally 
        // {
        // }
        // });

        // router.get('/Get_Purchase_Item_Code_Typeahead', function(req, res, next) {
        //     try {
        //         // Manually decode the Item_Code query parameter if necessary
        //         let itemCode = req.query.Item_Code;
        
        //         // Decode again to handle any potential double encoding
        //         if (itemCode) {
        //             itemCode = decodeURIComponent(itemCode);
        //         }
        
        //         console.log('Decoded Item_Code: ', itemCode);
        
        //         // Pass the decoded Item_Code to your Stock method
        //         Stock.Get_Purchase_Item_Code_Typeahead(itemCode, function(err, rows) {
        //             if (err) {
        //                 console.log(err);
        //                 return res.json(err);
        //             } else {
        //                 return res.json(rows);
        //             }
        //         });
        //     } catch (e) {
        //         console.error(e);
        //         return res.status(500).send("An error occurred.");
        //     } finally {
        //         // Any necessary clean-up can go here
        //     }
        // });

        router.get('/Get_Purchase_Item_Code_Typeahead',function(req,res,next)
        { 
        try 
        {
            Stock.Get_Purchase_Item_Code_Typeahead(req.query.Item_Code, function (err, rows)
        {
            console.log('req.query.Item_Name: ', req.query.Item_Code);
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

    router.get('/Search_Stock_Details_Item_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Search_Stock_Details_Item_Typeahead(req.query.Item_Name, function (err, rows)
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
    
    router.get('/Search_PurchaseItem_Typeahead',function(req,res,next)
    { 
    try 
    {
        Stock.Search_PurchaseItem_Typeahead(req.query.Item_Name, function (err, rows)
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

