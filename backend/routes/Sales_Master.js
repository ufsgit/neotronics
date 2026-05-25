var express = require('express');
var router = express.Router();
var Sales_Master = require('../models/Sales_Master');
var request = require('request');
const asyncHandler = require("../helpers/async-handler");
const { sendSuccess } = require("../helpers/api-response");
const { generatePdf } = require("../helpers/pdf-generator");
const { getQuotationTemplate } = require("../templates/quotation-template");

router.get('/Get_Location', function (req, res, next) {
    request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://geolocation-db.com/json",
        "body": ""
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        res.json(body);
    });
});

router.post('/Save_Sales_Master/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Sales_Master(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.post('/Save_Sales_Master_Mobile/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Sales_Master_Mobile(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_Sales_Master', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Sales_Master(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.AccountType_Id_, req.query.User_Details_Id_,
        req.query.User_Type, req.query.Login_User_Id
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Sales_Details/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Sales_Details(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Change_Bill_Status/:Sales_Master_Id_?/:BillType_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Change_Bill_Status(req.params.Sales_Master_Id_, req.params.BillType_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_ReferenceId_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_ReferenceId_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Proforma_History_ByReference/:ReferenceID_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Proforma_History_ByReference(req.params.ReferenceID_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Update_Quotation_Workflow_Status/:SalesQuotationMaster_Id_?/:StatusCode_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Update_Quotation_Workflow_Status(req.params.SalesQuotationMaster_Id_, req.params.StatusCode_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Search_Sales_Master_Mobile/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Invoice_No_?/:Employee_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Sales_Master_Mobile(req.params.Is_Date_Check_, req.params.FromDate_, req.params.ToDate_, req.params.Account_Party_Id_, req.params.Invoice_No_, req.params.Employee_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Sales_Master_Mobile/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Sales_Master_Mobile(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Sales_Details_forprint/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Sales_Details_forprint(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Selected_Delete/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Selected_Delete(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Store_Details/:Store_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Store_Details(req.params.Store_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Receipt_Voucher_Mobile/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Receipt_Voucher_Mobile(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Print_Quotation/:Sales_Master_Id', asyncHandler(async function (req, res, next) {
    try {
        const sales_Master_Id = req.params.Sales_Master_Id;
        console.log("Print_Quotation started for ID:", sales_Master_Id);
        
        // Fetch Master Data
        const masterRows = await Sales_Master.Load_SalesQuotationMaster(sales_Master_Id);
        const master = (masterRows && masterRows[0]) ? masterRows[0][0] : null;
        
        if (!master) {
            return res.status(404).send('Quotation not found');
        }

        // Fetch Details Data
        const detailsRows = await Sales_Master.Get_Quotation_Details(sales_Master_Id);
        const details = (detailsRows && detailsRows[0]) ? detailsRows[0] : [];

        // Fetch Company and Bank details
        const companyRows = await Sales_Master.Load_Company();
        const company = (companyRows && companyRows[0] && companyRows[0][0]) ? companyRows[0][0] : {};
        const bank = (companyRows && companyRows[1] && companyRows[1][0]) ? companyRows[1][0] : {};

        // Generate HTML
        const htmlContent = getQuotationTemplate({
            master: master,
            details: details,
            company: company,
            bank: bank
        });

        // Generate PDF
        const pdfBuffer = await generatePdf(htmlContent);
        
        if (!pdfBuffer || pdfBuffer.length === 0) {
            console.error("Error: Generated PDF buffer is empty");
            return res.status(500).send({ message: 'Error: Generated PDF buffer is empty' });
        }

        console.log("PDF generated successfully, buffer size:", pdfBuffer.length);

        // Send PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.setHeader('Content-Disposition', `inline; filename=Quotation_${master.QuotationNo || sales_Master_Id}.pdf`);
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('Print Error:', error);
        res.status(500).send({ 
            message: 'Error generating PDF', 
            error: error.message
        });
    }
}));

router.post('/Print_Quotation_JSON', asyncHandler(async function (req, res, next) {
    try {
        const { master, details } = req.body;
        
        // Fetch Company and Bank details from DB
        const companyRows = await Sales_Master.Load_Company();
        const company = (companyRows && companyRows[0] && companyRows[0][0]) ? companyRows[0][0] : {};
        const bank = (companyRows && companyRows[1] && companyRows[1][0]) ? companyRows[1][0] : {};

        // Generate HTML
        const htmlContent = getQuotationTemplate({
            master: master,
            details: details,
            company: company,
            bank: bank
        });

        // Generate PDF
        const pdfBuffer = await generatePdf(htmlContent);

        if (!pdfBuffer || pdfBuffer.length === 0) {
            console.error("Error: Generated PDF buffer is empty");
            return res.status(500).send({ message: 'Error: Generated PDF buffer is empty' });
        }

        console.log("PDF JSON generated successfully, buffer size:", pdfBuffer.length);

        // Send PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('Print JSON Error:', error);
        res.status(500).send({ message: 'Error generating PDF', error: error.message });
    }
}));

router.get('/Search_Key_Value/:Key_Value_Name_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Key_Value(req.params.Key_Value_Name_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Sales_Master/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Sales_Master(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Sales_Master/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Sales_Master(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Sales_Master_Mobile/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Sales_Master_Mobile(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Bill_Type/:Group_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Bill_Type(req.params.Group_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Cess/', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Cess();
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Bill_Mode/', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Bill_Mode();
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Company/', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Company();
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_currencydetails/', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_currencydetails();
    return sendSuccess(res, { data: rows });
}));

router.get('/Search_Customer_Typeahead/:Account_Group_Id_?/:Client_Accounts_Name_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Customer_Typeahead(req.params.Account_Group_Id_, req.params.Client_Accounts_Name_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_Prodution_Master/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Prodution_Master(req.body);
    return sendSuccess(res, resp);
}));

router.get('/Search_Prodution_Master', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Prodution_Master(req.query.Is_Date_Check_, req.query.FromDate_, req.query.ToDate_, req.query.Production_No_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Prodution_Master/:Prodution_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Prodution_Master(req.params.Prodution_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Prodution_Master/:Prodution_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Prodution_Master(req.params.Prodution_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Hsn_Sales_Report', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Hsn_Sales_Report(req.query.From_Date_, req.query.To_Date_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Hsn_Sales_Return_Report', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Hsn_Sales_Return_Report(req.query.From_Date_, req.query.To_Date_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_B2B_SaleTax_Report', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_B2B_SaleTax_Report(req.query.From_Date_, req.query.To_Date_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_B2C_SaleTax_Report', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_B2C_SaleTax_Report(req.query.From_Date_, req.query.To_Date_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Sales_Return_Tax_Report', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Sales_Return_Tax_Report(req.query.From_Date_, req.query.To_Date_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_Quotation/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Quotation(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_Quotation', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Quotation(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.User_Details_Id_,
        req.query.User_Type_, req.query.Login_User_Id_
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Quotation_Master/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Quotation_Master(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_PerformaInvoice/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_PerformaInvoice(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_PerformaInvoice', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_PerformaInvoice(
        req.query.look_In_Date_Value, req.query.From_Date, req.query.To_Date,
        req.query.Customer, req.query.InvoiceNo, req.query.partNo,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.AccountType_Id_,
        req.query.User_Type, req.query.Login_User_Id
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_StatementofAccount_Report/:Client_Id_?/:FromDate_?/:ToDate_?/:Voucher_?/:CurrencyId_?/:TypeId_?/:User_Type?/:Login_User?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_StatementofAccount_Report(req.params.Client_Id_, req.params.FromDate_, req.params.ToDate_, req.params.Voucher_, req.params.CurrencyId_, req.params.TypeId_, req.params.User_Type, req.params.Login_User);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Performa_Invoice_Master/:PerformaInvoiceMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Performa_Invoice_Master(req.params.PerformaInvoiceMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_Purchase_order/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Purchase_order(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.post('/Save_Delivery_Order/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Delivery_Order(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_PurchaseOrder', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_PurchaseOrder(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.orderNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_,
        req.query.AccountType_Id_,
        req.query.User_Type,
        req.query.Login_User_Id
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Search_Delivery_Order', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Delivery_Order(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.User_Details_Id_,
        req.query.Account_Type_Id_, req.query.User_Type, req.query.Login_User_Id
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_PurchaseOrder_Details/:Purchase_OrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_PurchaseOrder_Details(req.params.Purchase_OrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Delivery_Order/:DeliveryOrderMaster_Id?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Delivery_Order(req.params.DeliveryOrderMaster_Id);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Purchase_Order/:Purchase_OrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Purchase_Order(req.params.Purchase_OrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Search_PackingDEtail', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_PackingDEtail(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.User_Details_Id_,
        req.query.User_Type, req.query.Login_User_Id
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Delivery_Order_Details/:DeliveryOrderMaster_Id?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Delivery_Order_Details(req.params.DeliveryOrderMaster_Id);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Performa_invoice_Details/:PerformaInvoiceMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Performa_invoice_Details(req.params.PerformaInvoiceMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo/:DeliveryOrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(req.params.DeliveryOrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_PackingDetails/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_PackingDetails(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Get_Packing_Details/:PackingList_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Packing_Details(req.params.PackingList_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Profoma_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Profoma_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Invoice_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Invoice_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Delivery_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Delivery_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Purchase_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Purchase_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Packing_Master/:PackingList_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Packing_Master(req.params.PackingList_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_Sales_Returns_Master/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Sales_Returns_Master(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Get_SalesReturn_Details/:Sales_Return_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_SalesReturn_Details(req.params.Sales_Return_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_SalesReturn_Master/:Sales_Return_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_SalesReturn_Master(req.params.Sales_Return_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_AddStock/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_AddStock(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Delete_AddStock_Master/:Stock_Add_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_AddStock_Master(req.params.Stock_Add_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_GRn_Pending_List_ByPurchaseOrder/:Purchase_OrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_GRn_Pending_List_ByPurchaseOrder(req.params.Purchase_OrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Search_GRN_Order/:Is_Date_Check_?/:FromDate_?/:ToDate_?/:Account_Party_Id_?/:Quot_No_?/:Part_No_?/:Item_Group_Id_?/:CurrencyDetails_Id_?/:User_Details_Id_?/:Account_Type_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_GRN_Order(req.params.Is_Date_Check_, req.params.FromDate_, req.params.ToDate_, req.params.Account_Party_Id_, req.params.Quot_No_, req.params.Part_No_, req.params.Item_Group_Id_, req.params.CurrencyDetails_Id_, req.params.User_Details_Id_, req.params.Account_Type_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Delivery_Order_Master/:DeliveryOrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Delivery_Order_Master(req.params.DeliveryOrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_SalesQuotationMaster/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_SalesQuotationMaster(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Proforma_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Proforma_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_PerformaInvoiceMaster/:PerformaInvoiceMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_PerformaInvoiceMaster(req.params.PerformaInvoiceMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Salesmaster_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Salesmaster_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Proforma_InvoiceClick_Details/:PerformaInvoiceMaster_Id_Edit_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Proforma_InvoiceClick_Details(req.params.PerformaInvoiceMaster_Id_Edit_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_SalesMaster/:Sales_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_SalesMaster(req.params.Sales_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Proforma_DOClick_Details/:PerformaInvoiceMaster_Id_Edit_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Proforma_DOClick_Details(req.params.PerformaInvoiceMaster_Id_Edit_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_DeliveryOrder_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_DeliveryOrder_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Purchase_order_GRNClick_Details/:Purchase_OrderMaster_Id_Edit_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Purchase_order_GRNClick_Details(req.params.Purchase_OrderMaster_Id_Edit_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_PurchaseOrder_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_PurchaseOrder_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_PackingList_Quotation_Details/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_PackingList_Quotation_Details(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_PackingList_Items_Pending_List_ByQuotation/:SalesQuotationMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_PackingList_Items_Pending_List_ByQuotation(req.params.SalesQuotationMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Delivery_Salesmaster/:DeliveryOrderMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Delivery_Salesmaster(req.params.DeliveryOrderMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Vat_Percentage/', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Vat_Percentage();
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Item_Code_Typeahead_For_Purchase_Return/:Purchase_Master_Id_?/:Item_Code_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Item_Code_Typeahead_For_Purchase_Return(req.params.Purchase_Master_Id_, req.params.Item_Code_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Get_Item_Name_Typeahead_For_Purchase_Return', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Item_Name_Typeahead_For_Purchase_Return(req.body.Purchase_Master_Id_, req.body.Item_Name_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Item_Code_Typeahead_For_Sales_Return/:Sales_Master_Id_?/:Item_Code_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Item_Code_Typeahead_For_Sales_Return(req.params.Sales_Master_Id_, req.params.Item_Code_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Get_Item_Name_Typeahead_For_Sales_Return', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Item_Name_Typeahead_For_Sales_Return(req.body.Sales_Master_Id_, req.body.Item_Name_);
    return sendSuccess(res, { data: rows });
}));

router.post('/Save_Price_Request/', asyncHandler(async function (req, res, next) {
    const resp = await Sales_Master.Save_Price_Request(req.body, { log: req.log });
    return sendSuccess(res, { message: "Saved", data: Array.isArray(resp) ? resp : [resp] });
}));

router.get('/Search_Price_Request', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Search_Price_Request(
        req.query.Is_Date_Check_, req.query.From_Date_, req.query.To_Date_,
        req.query.Customer_, req.query.QuotNo_, req.query.partNo_,
        req.query.Item_Group_Id_, req.query.CurrencyDetails_Id_, req.query.User_Details_Id_,
        req.query.User_Type_, req.query.Login_User_Id_
    );
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Price_Request_Details/:PriceRequestMaster_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Price_Request_Details(req.params.PriceRequestMaster_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Delete_Price_Request_Master/:Price_Request_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Delete_Price_Request_Master(req.params.Price_Request_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Load_Price_Request_Master/:Price_Request_Master_Id_?', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Load_Price_Request_Master(req.params.Price_Request_Master_Id_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Next_Price_Request_No', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Next_Price_Request_No(req.query.EntryDate_);
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Max_Performa_Invoice_No', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Max_Performa_Invoice_No();
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Max_Quotation_No', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Max_Quotation_No();
    return sendSuccess(res, { data: rows });
}));

router.get('/Get_Max_Sales_Invoice_No', asyncHandler(async function (req, res, next) {
    const rows = await Sales_Master.Get_Max_Sales_Invoice_No();
    return sendSuccess(res, { data: rows });
}));

module.exports = router;

