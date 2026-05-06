var express = require('express');
var router = express.Router();
var requirementmaster = require('../models/requirementmaster');


router.post('/Save_Requirement/',async function(req,res,next)
      { 
 console.log(req,res);
      try 
      {
          const resp=await requirementmaster.Save_Requirement(req.body);
          console.log(resp);
         return res.send(resp);     
      }
      catch(e){
        console.log(e)
      return res.status(500).json({ message: 'Error Occured', error: (e && e.message) ? e.message : String(e) });
      }
      });

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

router.get('/Get_Salesmaster_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_Salesmaster_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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

router.get('/Get_DeliveryOrder_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_DeliveryOrder_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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

router.get('/Get_PackingList_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_PackingList_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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

router.get('/Get_PurchaseOrder_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_PurchaseOrder_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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

router.get('/Load_Profoma_Items_Pending_List_ByRequirement/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_Profoma_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Load_Invoice_Items_Pending_List_ByRequirement/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_Invoice_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Load_Delivery_Items_Pending_List_ByRequirement/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_Delivery_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Load_Purchase_Items_Pending_List_ByRequirement/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_Purchase_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Load_PackingList_Items_Pending_List_ByRequirement/:Requirement_Master_Id?',function(req,res,next)
{
try
{
requirementmaster.Load_PackingList_Items_Pending_List_ByRequirement(req.params.Requirement_Master_Id, function (err, rows)
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

router.get('/Get_Proforma_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_Proforma_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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
requirementmaster.Get_Bill_Type(req.params.Group_Id_, function (err, rows)
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
requirementmaster.Load_Company(function (err, rows)
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
requirementmaster.Load_Vat_Percentage(function (err, rows)
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

router.get('/Get_Quotation_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_Quotation_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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
});

router.get('/Get_PriceRequest_Requirement_Details/:Requirement_Master_Id_Edit?',function(req,res,next)
{
try
{
requirementmaster.Get_PriceRequest_Requirement_Details(req.params.Requirement_Master_Id_Edit, function (err, rows)
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
});

router.get('/Get_Quotation_Pending_Items/:Requirement_Master_Id?', function (req, res, next) {
    try {
        requirementmaster.Get_Quotation_Pending_Items(req.params.Requirement_Master_Id, function (err, rows) {
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

router.get('/Get_PriceRequest_Pending_Items/:Requirement_Master_Id?', function (req, res, next) {
    try {
        requirementmaster.Get_PriceRequest_Pending_Items(req.params.Requirement_Master_Id, function (err, rows) {
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

module.exports = router;
