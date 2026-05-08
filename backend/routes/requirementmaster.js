var express = require('express');
var router = express.Router();
var requirementmaster = require('../models/requirementmaster');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");

router.post('/Save_Requirement/', asyncHandler(async function(req, res, next) {
    const resp = await requirementmaster.Save_Requirement(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: resp });
}));

router.get('/Search_Requirement/', function (req, res, next) {
    try {
        requirementmaster.Search_Requirement(
            req.query.Is_Date_Check_,
            req.query.From_Date_,
            req.query.To_Date_,
            req.query.Customer_,
            req.query.RequirementNo_,
            req.query.partNo_,
            req.query.Item_Group_Id_,
            req.query.CurrencyDetails_Id_,
            req.query.User_Details_Id_,
            req.query.User_Type_,
            req.query.Login_User_Id_,
            function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(rows);
                }
            });
    }
    catch (e) {
    }
});

router.get('/Get_Requirement_Master/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_requirementmaster(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Get_Requirement_Details/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Delete_Requirement_Master/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Delete_requirementmaster(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Get_Bill_Type/:Group_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_Bill_Type(req.params.Group_Id, function (err, rows)
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
requirementmaster.Load_Company( function (err, rows)
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

router.get('/Load_Vat_Percentage/',function(req,res,next)
{
try
{
requirementmaster.Load_Vat_Percentage( function (err, rows)
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

router.get('/Get_salesPerformaInvoicemaster/:PerformaInvoiceId?',function(req,res,next)
{
try
{
requirementmaster.Get_salesPerformaInvoicemaster(req.params.PerformaInvoiceId, function (err, rows)
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

router.get('/Get_salesGRNmaster/:requirementmaster_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_salesGRNmaster(req.params.requirementmaster_Id, function (err, rows)
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

router.get('/Load_DeliveryOrder/:DeliveryOrderMaster_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_DeliveryOrder(req.params.DeliveryOrderMaster_Id, function (err, rows)
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

router.get('/Load_PurchaseOrder/:PurchaseOrderMaster_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_PurchaseOrder(req.params.PurchaseOrderMaster_Id, function (err, rows)
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

router.get('/Get_requirementmaster_Purchaseordermaster_Checked_RequirementNo/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_requirementmaster_Purchaseordermaster_Checked_RequirementNo(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Get_Requirement_Pending_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Requirement_Pending_List( function (err, rows)
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

router.get('/Get_Requirement_Processed_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Requirement_Processed_List( function (err, rows)
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

router.get('/Update_Requirement_Processed/:Requirement_Details_Id?/:Status?',function(req,res,next)
{
try
{
requirementmaster.Update_Requirement_Processed(req.params.Requirement_Details_Id,req.params.Status, function (err, rows)
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

router.get('/Get_Price_Request_Pending_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Price_Request_Pending_List( function (err, rows)
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

router.get('/Get_Price_Request_Processed_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Price_Request_Processed_List( function (err, rows)
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

router.get('/Get_Quotation_Pending_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Quotation_Pending_List( function (err, rows)
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

router.get('/Get_Quotation_Processed_List/',function(req,res,next)
{
try
{
requirementmaster.Get_Quotation_Processed_List( function (err, rows)
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

router.get('/Get_Price_Request_Master/:Price_Request_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_Price_Request_Master(req.params.Price_Request_Master_Id, function (err, rows)
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

router.get('/Get_Price_Request_Details/:Price_Request_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Get_Price_Request_Details(req.params.Price_Request_Master_Id, function (err, rows)
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

router.get('/Delete_Price_Request_Master/:Price_Request_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Delete_Price_Request_Master(req.params.Price_Request_Master_Id, function (err, rows)
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

router.get('/Load_Profoma_Items_Pending_List_ByRequirement/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Load_Profoma_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Load_Invoice_Items_Pending_List_ByRequirement/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Load_Invoice_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Load_Delivery_Items_Pending_List_ByRequirement/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Load_Delivery_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Load_Purchase_Items_Pending_List_ByRequirement/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Load_Purchase_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_Quotation_Pending_Items/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_Quotation_Pending_Items(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_PriceRequest_Pending_Items/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_PriceRequest_Pending_Items(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Load_RequirementMaster/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_requirementmaster(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

module.exports = router;
