var db = require('../dbconnection');

var OperationsDashboard = {
    Get_Operations_Dashboard_Data: function(filters, callback) {
        var promises = [];
        
        var dateFilter = "";
        var params = [];
        
        // 1. Total Requirements
        var qReq = "SELECT COUNT(*) AS total FROM requirementmaster WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qReq, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 2. Total Price Requests (Assuming tracking in Price_Request_Reference or by looking at price_response_master)
        // I will just count unique Reference_No or something from price_response_master for now
        var qPriceReq = "SELECT COUNT(DISTINCT Reference_No) AS total FROM price_response_master WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qPriceReq, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 3. Total Price Responses
        var qPriceResp = "SELECT COUNT(*) AS total FROM price_response_master WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qPriceResp, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 4. Quotation Confirmations
        var qQuotConf = "SELECT COUNT(*) AS total FROM salesquotationmaster WHERE DeleteStatus = 0 AND Status = 'Confirmed'";
        promises.push(new Promise((resolve, reject) => {
            db.query(qQuotConf, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 5. Total Quotations
        var qQuot = "SELECT COUNT(*) AS total FROM salesquotationmaster WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qQuot, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 6. Proforma Invoices
        var qProf = "SELECT COUNT(*) AS total FROM proforma_invoice_master WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qProf, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 7. Invoices
        var qInv = "SELECT COUNT(*) AS total FROM sales_master WHERE DeleteStatus = 0";
        promises.push(new Promise((resolve, reject) => {
            db.query(qInv, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 8. Pending Workflow
        var qPending = "SELECT COUNT(*) AS total FROM requirementmaster r LEFT JOIN price_response_master p ON r.RequirementMaster_Id = p.Reference_No WHERE r.DeleteStatus = 0 AND p.Price_Response_Master_Id IS NULL";
        promises.push(new Promise((resolve, reject) => {
            db.query(qPending, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 9. Completed Operations
        promises.push(new Promise((resolve, reject) => {
            db.query(qInv, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 10. Cancelled / Rejected
        var qRej = "SELECT COUNT(*) AS total FROM salesquotationmaster WHERE Status = 'Rejected'";
        promises.push(new Promise((resolve, reject) => {
            db.query(qRej, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 11. In Progress
        var qProg = "SELECT COUNT(*) AS total FROM requirementmaster r LEFT JOIN sales_master s ON r.Account_Party_Id = s.Customer_Id WHERE r.DeleteStatus = 0 AND s.Sales_Master_Id IS NULL";
        promises.push(new Promise((resolve, reject) => {
            db.query(qProg, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 12. Today's Activities
        var qToday = "SELECT COUNT(*) AS total FROM requirementmaster WHERE DeleteStatus = 0 AND DATE(EntryDate) = CURDATE()";
        promises.push(new Promise((resolve, reject) => {
            db.query(qToday, [], (err, rows) => { if (err) resolve({total:0}); else resolve(rows[0] || {total:0}); });
        }));

        // 13. Trend
        var qTrend = "SELECT DATE_FORMAT(EntryDate, '%Y-%m') as month, COUNT(*) as count FROM requirementmaster WHERE DeleteStatus = 0 AND EntryDate IS NOT NULL GROUP BY month ORDER BY month";
        promises.push(new Promise((resolve, reject) => {
            db.query(qTrend, [], (err, rows) => { if (err) resolve([]); else resolve(rows || []); });
        }));

        // 14. Recent Stage Tracking Table
        var qRecent = `
            SELECT 
                r.RequirementNo as Number, 
                r.EntryDate as Date, 
                COALESCE(c.Client_Accounts_Name, 'Unknown') as Customer,
                COALESCE(c.Client_Accounts_Name, 'Unknown') as Company,
                COALESCE(u.User_Details_Name, 'System') as Staff,
                NULL as Quotation_No,
                NULL as Invoice_No,
                'Pending' AS Current_Stage,
                'Pending' AS Status
            FROM requirementmaster r 
            LEFT JOIN client_accounts c ON r.Account_Party_Id = c.Client_Accounts_Id
            LEFT JOIN user_details u ON r.User_Id = u.User_Details_Id
            WHERE r.DeleteStatus=0 
            ORDER BY r.EntryDate DESC LIMIT 20
        `;
        promises.push(new Promise((resolve, reject) => {
            db.query(qRecent, [], (err, rows) => { if (err) resolve([]); else resolve(rows || []); });
        }));

        // 15. Staff Performance Leaderboard
        var qStaff = `
            SELECT 
                u.User_Details_Name as name,
                (SELECT COUNT(*) FROM requirementmaster r WHERE r.User_Id = u.User_Details_Id AND r.DeleteStatus = 0) as reqs,
                (SELECT COUNT(*) FROM salesquotationmaster q WHERE q.User_Id = u.User_Details_Id AND q.DeleteStatus = 0) as quotes,
                (SELECT COUNT(*) FROM sales_master s WHERE s.User_Id = u.User_Details_Id AND s.DeleteStatus = 0) as invoices,
                CASE 
                    WHEN (SELECT COUNT(*) FROM requirementmaster r WHERE r.User_Id = u.User_Details_Id AND r.DeleteStatus = 0) = 0 THEN '0%'
                    ELSE CONCAT(ROUND(((SELECT COUNT(*) FROM sales_master s WHERE s.User_Id = u.User_Details_Id AND s.DeleteStatus = 0) / (SELECT COUNT(*) FROM requirementmaster r WHERE r.User_Id = u.User_Details_Id AND r.DeleteStatus = 0)) * 100), '%')
                END AS conversionRate
            FROM user_details u
            WHERE u.DeleteStatus = 0 AND (
                (SELECT COUNT(*) FROM requirementmaster r WHERE r.User_Id = u.User_Details_Id AND r.DeleteStatus = 0) > 0 OR
                (SELECT COUNT(*) FROM salesquotationmaster q WHERE q.User_Id = u.User_Details_Id AND q.DeleteStatus = 0) > 0 OR
                (SELECT COUNT(*) FROM sales_master s WHERE s.User_Id = u.User_Details_Id AND s.DeleteStatus = 0) > 0
            )
            ORDER BY invoices DESC, reqs DESC
            LIMIT 10
        `;
        promises.push(new Promise((resolve, reject) => {
            db.query(qStaff, [], (err, rows) => { if (err) resolve([]); else resolve(rows || []); });
        }));

        Promise.all(promises).then(results => {
            var data = {
                requirement: results[0],
                priceRequest: results[1],
                priceResponse: results[2],
                quotationConfirmation: results[3],
                quotation: results[4],
                proformaInvoice: results[5],
                invoice: results[6],
                pendingWorkflow: results[7],
                completedOperations: results[8],
                cancelledRejected: results[9],
                inProgress: results[10],
                todaysActivities: results[11],
                monthlyTrend: results[12],
                recentActivities: results[13],
                staffPerformance: results[14]
            };
            callback(null, data);
        }).catch(err => {
            callback(err, null);
        });
    }
};

module.exports = OperationsDashboard;
