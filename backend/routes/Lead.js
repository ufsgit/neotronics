var express = require('express');
var router = express.Router();
var Lead = require('../models/Lead');

router.post('/Save_Lead/', function (req, res, next) {
    try {
        Lead.Save_Lead(req.body, function (err, rows) {
            if (err) {
                console.error("SQL Error in Save_Lead:", err);
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }
            
            console.log("Save_Lead success. Rows:", JSON.stringify(rows));
            
            // Extract inserted ID or Key_Id
            let leadId = 0;
            if (rows && rows[0] && rows[0][0]) {
                leadId = rows[0][0].Lead_Id || rows[0][0].Lead_Id_ || rows[0][0].Key_Id || 0;
            }
            
            if (!leadId && req.body.Lead_Id) leadId = req.body.Lead_Id;

            let staffIdToSave = (req.body.Is_FollowUp == 1 || req.body.Is_FollowUp == true || req.body.Is_FollowUp == "1") 
                ? req.body.FollowUp_Staff_Id 
                : req.body.Staff_Id;

            const finalizeResponse = () => {
                return res.status(200).json({
                    success: true,
                    message: "Saved Successfully",
                    data: { Key_Id: leadId }
                });
            };

            if (leadId > 0 && staffIdToSave > 0) {
                Lead.Update_Staff_Name_Single(leadId, staffIdToSave, (err2) => {
                    if (err2) console.error("Error updating Staff Name post-save:", err2);
                    
                    if (req.body.Is_FollowUp == 1 || req.body.Is_FollowUp == true || req.body.Is_FollowUp == "1") {
                        Lead.Update_Latest_FollowUp(leadId, staffIdToSave, (err3) => {
                            if (err3) console.error("Error updating Follow_up Staff:", err3);
                            finalizeResponse();
                        });
                    } else {
                        finalizeResponse();
                    }
                });
            } else {
                finalizeResponse();
            }
        });
    } catch (e) {
        console.error("Exception in Save_Lead:", e);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message });
    }
});

router.get('/Get_Leads/', function (req, res, next) {
    try {
        Lead.Get_Leads(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    catch (e) {
        console.error("Exception in Get_Leads:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

    router.get('/Get_Dropdowns_Lead/', function (req, res, next) {
        console.log("API: Get_Dropdowns_Lead called");
        try {
            Lead.Get_Dropdowns_Lead(function (err, rows) {
                if (err) {
                    console.error("API ERROR: Get_Dropdowns_Lead failed:", err);
                    res.json(err);
                }
                else {
                    console.log("API SUCCESS: Get_Dropdowns_Lead returned " + (rows ? rows.length : 0) + " result sets");
                    if (rows && rows.length > 0) {
                        rows.forEach((r, i) => console.log(`Set ${i}: ${r.length} rows`));
                    }
                    res.json(rows);
                }
            });
        }
        catch (e) {
            console.error("API EXCEPTION: Get_Dropdowns_Lead:", e);
        }
    });

router.get('/Delete_Lead/:Lead_Id', function (req, res, next) {
    try {
        Lead.Delete_Lead(req.params.Lead_Id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    catch (e) {
        console.error("Exception in Delete_Lead:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

router.get('/Get_Lead_FollowUp_History/:Lead_Id', function (req, res, next) {
    try {
        Lead.Get_Lead_FollowUp_History(req.params.Lead_Id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    catch (e) {
        console.error("Exception in Get_Lead_FollowUp_History:", e);
        res.status(500).json({ error: e.message || String(e) });
    }
});

router.get('/Force_Fix_Staff_Names', function (req, res, next) {
    const query1 = "UPDATE Lead l JOIN User_Details u ON l.Staff_Id = u.User_Details_Id SET l.Staff_Name = u.User_Details_Name WHERE l.Staff_Name IS NULL OR l.Staff_Name = ''";
    Lead.query(query1, (err, rows) => {
        if (err) return res.send(err);
        res.send("Update attempt finished");
    });
});

module.exports = router;
