var express = require('express');
var router = express.Router();
var requirementmaster = require('../models/requirementmaster');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");
const { generatePdf } = require("../helpers/pdf-generator");
const { getRequirementTemplate } = require("../templates/requirement-template");

router.post('/Save_Requirement/', asyncHandler(async function(req, res, next) {
    const resp = await requirementmaster.Save_Requirement(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: resp });
}));

router.get('/Get_Next_Requirement_No', asyncHandler(async function (req, res, next) {
    const rows = await requirementmaster.Get_Next_Requirement_No();
    return sendSuccess(res, { data: rows });
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

router.get('/Get_Quotation_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_Quotation_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_PriceRequest_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_PriceRequest_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_Salesmaster_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_Salesmaster_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_DeliveryOrder_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_DeliveryOrder_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_PackingList_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_PackingList_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_PurchaseOrder_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_PurchaseOrder_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Get_Proforma_Requirement_Details/:Requirement_Master_Id?', function (req, res, next) {
    requirementmaster.Get_Proforma_Requirement_Details(req.params.Requirement_Master_Id, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
});

router.get('/Print_Requirement/:Requirement_Master_Id', asyncHandler(async function (req, res, next) {
    try {
        const requirement_Master_Id = req.params.Requirement_Master_Id;
        
        const db = require('../dbconnection');
        const query = `
            SELECT 
                rm.*,
                DATE_FORMAT(rm.EntryDate, '%d-%m-%Y') AS FormattedEntryDate,
                ca.Client_Accounts_Name AS Customer,
                ca.Address1, ca.Address2, ca.Address3, ca.Address4, ca.PinCode, ca.GSTNo, ca.Phone, ca.Mobile, ca.Email,
                cd.CurrecnyName
            FROM requirementmaster rm
            LEFT JOIN client_accounts ca ON rm.Account_Party_Id = ca.Client_Accounts_Id
            LEFT JOIN currencydetails cd ON rm.CurrencyId = cd.CurrencyDetails_Id
            WHERE rm.RequirementMaster_Id = ? AND rm.DeleteStatus = 0
        `;
        const [masterRows] = await db.promise().query(query, [requirement_Master_Id]);
        const master = (masterRows && masterRows[0]) ? masterRows[0] : null;
        
        if (!master) {
            return res.status(404).send('Requirement not found');
        }

        // Fetch Details Data
        const detailsRows = await requirementmaster.Get_Requirement_Details_Promise(requirement_Master_Id);
        const details = (detailsRows && detailsRows[0]) ? detailsRows[0] : [];

        // Fetch Company and Bank details
        const companyRows = await requirementmaster.Load_Company_Promise();
        const company = (companyRows && companyRows[0] && companyRows[0][0]) ? companyRows[0][0] : {};
        const bank = (companyRows && companyRows[1] && companyRows[1][0]) ? companyRows[1][0] : {};

        // Generate HTML
        const htmlContent = getRequirementTemplate({
            master: master,
            details: details,
            company: company,
            bank: bank
        });

        // Generate PDF
        const pdfBuffer = await generatePdf(htmlContent);
        
        if (!pdfBuffer || pdfBuffer.length === 0) {
            return res.status(500).send({ message: 'Error: Generated PDF buffer is empty' });
        }

        // Send PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.setHeader('Content-Disposition', `inline; filename=Requirement_${master.RequirementNo || requirement_Master_Id}.pdf`);
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('Print Error:', error);
        res.status(500).send({ message: 'Error generating PDF', error: error.message });
    }
}));

module.exports = router;
