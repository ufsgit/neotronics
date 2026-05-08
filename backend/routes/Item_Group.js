var express = require('express');
var router = express.Router();
var Item_Group=require('../models/Item_Group');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");

router.post('/Save_Item_Group/',function(req,res,next)
    { 
    try 
    {
    Item_Group.Save_Item_Group(req.body, function (err, rows) 
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
// router.get('/Search_Item_Group/:Item_Group_Name_?',function(req,res,next)
//     { 
//     try 
//     {
//     Item_Group.Search_Item_Group(req.params.Item_Group_Name_, function (err, rows) 
//     {
//     if (err) 
//     {
//     res.json(err);
//     }
//     else 
//     {
//     res.json(rows);
//     }
//     });
//     }
//     catch (e) 
//     {
//     }
//     finally 
//     {
//     }
//     });

    router.get('/Search_Item_Group',function(req,res,next)
{ 
try 
{
	Item_Group.Search_Item_Group( req.query.Item_Group_Name_, function (err, rows)
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
router.get('/Get_Item_Group/:Item_Group_Id_?',function(req,res,next)
    { 
    try 
    {
    Item_Group.Get_Item_Group(req.params.Item_Group_Id_, function (err, rows) 
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
router.get('/Delete_Item_Group/:Item_Group_Id_?',function(req,res,next)
    { 
    try 
    {
    Item_Group.Delete_Item_Group(req.params.Item_Group_Id_, function (err, rows) 
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
router.get('/ItemGroup_Typehead/:Item_Group_Name_?',function(req,res,next)
    { 
    try 
    {
    Item_Group.ItemGroup_Typehead(req.params.Item_Group_Name_, function (err, rows) 
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
router.get('/Load_Item_Group/', asyncHandler(function(req,res,next)
    { 
    req.log && req.log.info("api.request", { handler: "Item_Group.Load_Item_Group" });
    req.log && req.log.info("sql.start", { sp: "Load_Item_Group" });
    Item_Group.Load_Item_Group(function (err, rows) 
    {
      if (err) 
      {
        req.log && req.log.error("sql.error", { sp: "Load_Item_Group", code: err.code, message: err.message });
        return next(err);
      }
      req.log && req.log.info("sql.ok", { sp: "Load_Item_Group" });
      return sendSuccess(res, { message: "OK", data: rows || [] });
    });
    }));


    /** Added on 17-7-24 */

    router.post('/Save_Master_Category/',function(req,res,next)
    { 
        try 
        {
            Item_Group.Save_Master_Category(req.body, function (err, rows) 
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
        {}
        finally 
        {}
    });

    /** */


    /*** Added on 18-7-24 */

    router.get('/Search_Master_Category/:Item_Group_Name_?',function(req,res,next)
    { 
        try 
        {
            Item_Group.Search_Master_Category(req.params.Item_Group_Name_, function (err, rows) 
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

router.get('/Get_Master_Category/:Item_Group_Id_?',function(req,res,next)
    { 
        try 
        {
            Item_Group.Get_Master_Category(req.params.Item_Group_Id_, function (err, rows) 
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
router.get('/Delete_Master_Category/:Item_Group_Id_?',function(req,res,next)
    { 
        try 
        {

            Item_Group.Delete_Master_Category(req.params.Item_Group_Id_, function (err, rows) 
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


    router.get('/Get_Item_Group_DropDown_App/',function(req,res,next)
    { 
        try 
        {
            Item_Group.Get_Item_Group_DropDown_App(function (err, rows) 
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

router.get('/Get_Master_Category_DropDown_App/',function(req,res,next)
    { 
        try 
        {
            Item_Group.Get_Master_Category_DropDown_App(function (err, rows) 
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
module.exports = router;

