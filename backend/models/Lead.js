var db = require('../dbconnection');
var Vertical = require('./Vertical');
var Designation = require('./Designation');

const LEAD_STAGE_NAMES = [
    'RAW Lead',
    'Need to call up for first level call',
    'Need to Send Company Profile',
    'Need to Schedule Sales Meeting',
    'Meeting Scheduled',
    'Need Site Visit / Demo / Support',
    'Work / Project Stuck',
    'Need to Send Quote',
    'Immediate Follow-up Required on Quote',
    'Weekly Follow-up (Every Wednesday)',
    'Monthly Follow-up (15th of Every Month)',
    'Final Stage',
    'PO Received',
    'Operations',
    'Payment Follow-up',
    'Lost',
    'Currently No Requirement'
];

function seedLeadStages(callback) {
    let index = 0;

    function insertNext() {
        if (index >= LEAD_STAGE_NAMES.length) {
            return callback(null);
        }

        const stageName = LEAD_STAGE_NAMES[index++];
        db.query(
            "INSERT INTO `Status` (Status_Name, DeleteStatus) SELECT ?, 0 WHERE NOT EXISTS (SELECT 1 FROM `Status` WHERE Status_Name = ? AND IFNULL(DeleteStatus, 0) = 0)",
            [stageName, stageName],
            (err) => {
                if (err) return callback(err);
                insertNext();
            }
        );
    }

    insertNext();
}

function loadLeadStages(callback) {
    seedLeadStages((seedErr) => {
        if (seedErr) return callback(seedErr);

        const placeholders = LEAD_STAGE_NAMES.map(() => '?').join(',');
        const sql =
            "SELECT Status_Id, Status_Name FROM `Status` " +
            "WHERE IFNULL(DeleteStatus, 0) = 0 AND Status_Name IN (" + placeholders + ") " +
            "ORDER BY FIELD(Status_Name, " + placeholders + ")";

        db.query(sql, LEAD_STAGE_NAMES.concat(LEAD_STAGE_NAMES), callback);
    });
}

function ensureLeadActivityTable(callback) {
    const sql =
        "CREATE TABLE IF NOT EXISTS lead_activity_log (" +
        "LeadActivityLog_Id INT NOT NULL AUTO_INCREMENT," +
        "Lead_Id INT NOT NULL," +
        "Activity_Type VARCHAR(50) NOT NULL," +
        "Activity_Title VARCHAR(255) NOT NULL," +
        "Old_Value TEXT NULL," +
        "New_Value TEXT NULL," +
        "Remarks TEXT NULL," +
        "User_Id INT NULL," +
        "Activity_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "DeleteStatus TINYINT DEFAULT 0," +
        "PRIMARY KEY (LeadActivityLog_Id)," +
        "KEY idx_lead_activity_log_lead (Lead_Id)" +
        ")";
    db.query(sql, callback);
}

function ensureLeadMeetingTable(callback) {
    const sql =
        "CREATE TABLE IF NOT EXISTS lead_meeting (" +
        "LeadMeeting_Id INT NOT NULL AUTO_INCREMENT," +
        "Lead_Id INT NOT NULL," +
        "Meeting_Date DATETIME NOT NULL," +
        "Meeting_Type VARCHAR(20) NOT NULL," +
        "Notes TEXT NULL," +
        "Outcome TEXT NULL," +
        "User_Id INT NULL," +
        "Created_At DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "DeleteStatus TINYINT DEFAULT 0," +
        "PRIMARY KEY (LeadMeeting_Id)," +
        "KEY idx_lead_meeting_lead (Lead_Id)" +
        ")";
    db.query(sql, callback);
}

function ensureLeadQuoteTrackingTable(callback) {
    const sql =
        "CREATE TABLE IF NOT EXISTS lead_quote_tracking (" +
        "LeadQuoteTracking_Id INT NOT NULL AUTO_INCREMENT," +
        "Lead_Id INT NOT NULL," +
        "Requirement_Id INT NULL," +
        "Requirement_Name VARCHAR(255) NULL," +
        "Quote_Sent_Date DATE NULL," +
        "Quote_Amount DECIMAL(18,2) DEFAULT 0," +
        "FollowUp_Status_After_Quote VARCHAR(255) NULL," +
        "User_Id INT NULL," +
        "Created_At DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "DeleteStatus TINYINT DEFAULT 0," +
        "PRIMARY KEY (LeadQuoteTracking_Id)," +
        "KEY idx_lead_quote_tracking_lead (Lead_Id)" +
        ")";
    db.query(sql, callback);
}

function ensureLeadLostColumns(callback) {
    const columns = [
        { name: 'Lost_Reason', def: 'VARCHAR(255) NULL' },
        { name: 'Lost_Primary_Issue', def: 'VARCHAR(255) NULL' },
        { name: 'Lost_Competitor_Name', def: 'VARCHAR(255) NULL' },
        { name: 'Lost_Competitor_Price', def: 'DECIMAL(18,2) NULL' },
        { name: 'Lost_Was_Price_Issue', def: 'TINYINT(1) DEFAULT 0' },
        { name: 'Lost_Was_Solution_Issue', def: 'TINYINT(1) DEFAULT 0' },
        { name: 'Lost_Quote_Only_Comparison', def: 'TINYINT(1) DEFAULT 0' },
        { name: 'Lost_Reopen_Possibility', def: 'VARCHAR(20) NULL' },
        { name: 'Lost_Expected_Reconnect_Date', def: 'DATE NULL' },
        { name: 'Lost_Remarks', def: 'TEXT NULL' }
    ];
    let index = 0;

    function addNext() {
        if (index >= columns.length) return callback(null);
        const column = columns[index++];
        db.query("ALTER TABLE `Lead` ADD COLUMN `" + column.name + "` " + column.def, (err) => {
            if (err && err.code !== 'ER_DUP_FIELDNAME') return callback(err);
            addNext();
        });
    }

    addNext();
}

function getUserName(userId, callback) {
    if (!userId) return callback(null, '');
    db.query("SELECT User_Details_Name FROM User_Details WHERE User_Details_Id = ? LIMIT 1", [userId], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows && rows[0] ? rows[0].User_Details_Name : '');
    });
}

function addLeadActivity(activity, callback) {
    ensureLeadActivityTable((tableErr) => {
        if (tableErr) return callback(tableErr);

        const params = [
            activity.Lead_Id,
            activity.Activity_Type || 'GENERAL',
            activity.Activity_Title || 'Activity',
            activity.Old_Value || null,
            activity.New_Value || null,
            activity.Remarks || null,
            activity.User_Id || null
        ];

        db.query(
            "INSERT INTO lead_activity_log (Lead_Id, Activity_Type, Activity_Title, Old_Value, New_Value, Remarks, User_Id, Activity_Date, DeleteStatus) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0)",
            params,
            callback
        );
    });
}

function getLeadSnapshot(leadId, callback) {
    if (!leadId) return callback(null, null);
    db.query("SELECT Lead_Id, Remark, Status_Id, Status_Name FROM `Lead` WHERE Lead_Id = ? LIMIT 1", [leadId], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows && rows[0] ? rows[0] : null);
    });
}

function enrichLeadsWithLatestFollowUp(rows, callback) {
    const leadRows = rows && Array.isArray(rows[0]) ? rows[0] : (Array.isArray(rows) ? rows : []);
    if (!Array.isArray(leadRows) || leadRows.length === 0) {
        return callback(null, rows);
    }

    const leadIds = leadRows
        .map(lead => lead && lead.Lead_Id)
        .filter(leadId => leadId > 0);

    if (leadIds.length === 0) {
        return callback(null, rows);
    }

    const sql =
        "SELECT fu.Lead_Id, fu.FollowUp_Date AS Last_FollowUp_Date, fu.Remark AS Last_FollowUp_Remark " +
        "FROM Follow_up fu " +
        "INNER JOIN (SELECT Lead_Id, MAX(FollowUp_Id) AS FollowUp_Id FROM Follow_up WHERE Lead_Id IN (?) GROUP BY Lead_Id) latest " +
        "ON latest.FollowUp_Id = fu.FollowUp_Id";

    db.query(sql, [leadIds], (err, followUpRows) => {
        if (err) return callback(err, rows);

        const latestByLeadId = {};
        (followUpRows || []).forEach(followUp => {
            latestByLeadId[followUp.Lead_Id] = followUp;
        });

        leadRows.forEach(lead => {
            const latest = latestByLeadId[lead.Lead_Id];
            if (latest) {
                lead.Last_FollowUp_Date = latest.Last_FollowUp_Date;
                lead.Last_FollowUp_Remark = latest.Last_FollowUp_Remark;
            }
        });

        callback(null, rows);
    });
}

var Lead = {
    Save_Lead: function (Lead_, callback) {
        const params28 = [
            Lead_.Lead_Id,
            Lead_.Lead_Name,
            Lead_.Phone,
            Lead_.Source,
            Lead_.Contact_Person,
            Lead_.Contact_Number,
            Lead_.Vertical,
            Lead_.Enquiry_For,
            Lead_.Designation,
            Lead_.Email,
            Lead_.Website,
            Lead_.Address,
            Lead_.Review,
            Lead_.Rate,
            Lead_.State,
            Lead_.District,
            Lead_.Department_Id,
            Lead_.Status_Id,
            Lead_.Staff_Id,
            Lead_.Remark,
            Lead_.Is_FollowUp,
            Lead_.FollowUp_Department_Id,
            Lead_.FollowUp_Status_Id,
            Lead_.FollowUp_Staff_Id,
            Lead_.FollowUp_Remark,
            Lead_.FollowUp_Date,
            Lead_.Login_User_Id,
            Lead_.Next_FollowUp_Date
        ].map(p => p === undefined ? null : p);

        const isNewLead = !Lead_.Lead_Id || Number(Lead_.Lead_Id) === 0;
        getLeadSnapshot(Number(Lead_.Lead_Id || 0), (snapshotErr, oldLead) => {
            if (snapshotErr) return callback(snapshotErr);

            return db.query("CALL Save_Lead(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            params28, (err, rows) => {
                if (err) return callback(err, rows);

                // Extract the Lead_Id returned from the SP (for new records) or use the existing one
                let savedLeadId = Lead_.Lead_Id;
                if (!savedLeadId || savedLeadId === 0) {
                    if (rows && rows[0] && rows[0][0]) {
                        savedLeadId = rows[0][0].Lead_Id || rows[0][0].Key_Id || 0;
                    }
                }

                const logActivities = (done) => {
                    if (!savedLeadId) return done();

                    const activities = [];
                    const userId = Number(Lead_.Login_User_Id || 0);
                    if (isNewLead) {
                        activities.push({
                            Lead_Id: savedLeadId,
                            Activity_Type: 'LEAD_CREATED',
                            Activity_Title: 'Lead created',
                            New_Value: Lead_.Lead_Name || '',
                            User_Id: userId
                        });
                    }

                    if ((Lead_.Remark || '') !== ((oldLead && oldLead.Remark) || '')) {
                        activities.push({
                            Lead_Id: savedLeadId,
                            Activity_Type: 'REMARK',
                            Activity_Title: 'Remarks updated',
                            Old_Value: oldLead ? (oldLead.Remark || '') : '',
                            New_Value: Lead_.Remark || '',
                            User_Id: userId
                        });
                    }

                    if (!isNewLead && oldLead && Number(oldLead.Status_Id || 0) !== Number(Lead_.Status_Id || 0)) {
                        activities.push({
                            Lead_Id: savedLeadId,
                            Activity_Type: 'STATUS_CHANGE',
                            Activity_Title: 'Lead stage changed',
                            Old_Value: oldLead.Status_Name || String(oldLead.Status_Id || ''),
                            New_Value: Lead_.Status_Name || String(Lead_.Status_Id || ''),
                            User_Id: userId
                        });
                    }

                    if (Lead_.Is_FollowUp == 1 || Lead_.Is_FollowUp === true || Lead_.Is_FollowUp === '1') {
                        activities.push({
                            Lead_Id: savedLeadId,
                            Activity_Type: 'FOLLOW_UP',
                            Activity_Title: 'Follow-up updated',
                            New_Value: Lead_.FollowUp_Date || Lead_.Next_FollowUp_Date || '',
                            Remarks: Lead_.FollowUp_Remark || '',
                            User_Id: userId
                        });
                    }

                    let index = 0;
                    function addNext() {
                        if (index >= activities.length) return done();
                        addLeadActivity(activities[index++], (activityErr) => {
                            if (activityErr) console.error('Error logging lead activity:', activityErr);
                            addNext();
                        });
                    }
                    addNext();
                };

                const finish = () => logActivities(() => callback(null, rows));

                if (savedLeadId > 0) {
                    const extraParams = [
                        Lead_.Project_Name || null,
                        Lead_.POC_Name || null,
                        Lead_.Company_Size_Id || 0,
                        Lead_.Next_Call_Action ? 1 : 0,
                        Lead_.Lead_Priority || 'Medium',
                        Lead_.Contact_Person_Details ? JSON.stringify(Lead_.Contact_Person_Details) : null,
                        Lead_.Lost_Reason || null,
                        Lead_.Lost_Primary_Issue || null,
                        Lead_.Lost_Competitor_Name || null,
                        Lead_.Lost_Competitor_Price || null,
                        Lead_.Lost_Was_Price_Issue ? 1 : 0,
                        Lead_.Lost_Was_Solution_Issue ? 1 : 0,
                        Lead_.Lost_Quote_Only_Comparison ? 1 : 0,
                        Lead_.Lost_Reopen_Possibility || null,
                        Lead_.Lost_Expected_Reconnect_Date || null,
                        Lead_.Lost_Remarks || null,
                        savedLeadId
                    ];
                    ensureLeadLostColumns((lostColumnErr) => {
                        if (lostColumnErr) console.error('Error ensuring Lost Lead fields:', lostColumnErr);
                        db.query(
                            "UPDATE `Lead` SET Project_Name = ?, POC_Name = ?, Company_Size_Id = ?, Next_Call_Action = ?, Lead_Priority = ?, Contact_Person_Details = ?, Lost_Reason = ?, Lost_Primary_Issue = ?, Lost_Competitor_Name = ?, Lost_Competitor_Price = ?, Lost_Was_Price_Issue = ?, Lost_Was_Solution_Issue = ?, Lost_Quote_Only_Comparison = ?, Lost_Reopen_Possibility = ?, Lost_Expected_Reconnect_Date = ?, Lost_Remarks = ? WHERE Lead_Id = ?",
                            extraParams,
                            (err2) => {
                                if (err2) console.error('Error saving extra Lead fields:', err2);
                                return finish();
                            }
                        );
                    });
                } else {
                    return finish();
                }
            });
        });
    },
    Get_Leads: function (callback) {
        return db.query("CALL Get_Leads(?, ?)", [1, 1000000], (err, rows) => {
            if (err) return callback(err, rows);
            enrichLeadsWithLatestFollowUp(rows, callback);
        });
    },
    Get_Dropdowns_Lead: function (callback) {
        return db.query("CALL Get_Dropdowns_Lead()", [], (err, rows) => {
            if (err) return callback(err, rows);
            let results = (rows && Array.isArray(rows[0])) ? rows : [rows];
            loadLeadStages((stageErr, stageRows) => {
                if (!stageErr && stageRows) {
                    results[1] = stageRows;
                } else {
                    console.warn('Lead stage seed/load skipped:', stageErr && stageErr.message ? stageErr.message : stageErr);
                }

                Vertical.Seed_Industry_Master((industrySeedErr) => {
                    if (industrySeedErr) console.warn('Industry master seed skipped:', industrySeedErr.message || industrySeedErr);

                    db.query("SELECT Vertical_Id, Vertical_Name FROM Vertical WHERE DeleteStatus = 0 ORDER BY Vertical_Name", (vErr, vRows) => {
                        if (!vErr && vRows) results[3] = vRows;

                        Designation.Seed_Designation_Master((designationSeedErr) => {
                            if (designationSeedErr) console.warn('Designation master seed skipped:', designationSeedErr.message || designationSeedErr);

                            db.query("SELECT Designation_Id, Designation_Name FROM Designation WHERE DeleteStatus = 0 ORDER BY Designation_Name", (dErr, dRows) => {
                                if (!dErr && dRows) results[4] = dRows;
                                callback(null, results);
                            });
                        });
                    });
                });
            });
        });
    },
    Delete_Lead: function (Lead_Id, callback) {
        const leadId = Number(Lead_Id || 0);
        if (!leadId) return callback(null, { success: false, message: 'Invalid Lead Id' });

        return db.query("SHOW COLUMNS FROM `Lead` LIKE 'DeleteStatus'", (columnErr, columnRows) => {
            if (columnErr) return callback(columnErr);

            const hasDeleteStatus = Array.isArray(columnRows) && columnRows.length > 0;
            const sql = hasDeleteStatus
                ? "UPDATE `Lead` SET DeleteStatus = 1 WHERE Lead_Id = ?"
                : "DELETE FROM `Lead` WHERE Lead_Id = ?";

            db.query(sql, [leadId], (err, rows) => {
                if (err) return callback(err, rows);
                callback(null, { success: true, affectedRows: rows ? rows.affectedRows : 0 });
            });
        });
    },
    Get_Lead_FollowUp_History: function (Lead_Id, callback) {
        return db.query("CALL Get_Lead_FollowUp_History(?)", [Lead_Id], callback);
    },
    Get_Lead_Activity_Log: function (Lead_Id, callback) {
        ensureLeadActivityTable((tableErr) => {
            if (tableErr) return callback(tableErr);
            const sql =
                "SELECT lal.LeadActivityLog_Id, lal.Lead_Id, lal.Activity_Type, lal.Activity_Title, " +
                "lal.Old_Value, lal.New_Value, lal.Remarks, lal.User_Id, lal.Activity_Date, " +
                "COALESCE(ud.User_Details_Name, '') AS User_Name " +
                "FROM lead_activity_log lal " +
                "LEFT JOIN User_Details ud ON ud.User_Details_Id = lal.User_Id " +
                "WHERE lal.Lead_Id = ? AND IFNULL(lal.DeleteStatus, 0) = 0 " +
                "ORDER BY lal.Activity_Date DESC, lal.LeadActivityLog_Id DESC";
            return db.query(sql, [Lead_Id], (err, rows) => {
                if (err) return callback(err);
                callback(null, [rows]);
            });
        });
    },
    Add_Lead_Activity: addLeadActivity,
    Save_Lead_Meeting: function (meeting, callback) {
        ensureLeadMeetingTable((tableErr) => {
            if (tableErr) return callback(tableErr);
            const meetingType = String(meeting.Meeting_Type || '').toUpperCase() === 'ONLINE' ? 'ONLINE' : 'OFFLINE';
            const params = [
                Number(meeting.Lead_Id || 0),
                meeting.Meeting_Date || new Date(),
                meetingType,
                meeting.Notes || '',
                meeting.Outcome || '',
                Number(meeting.User_Id || 0) || null
            ];
            db.query(
                "INSERT INTO lead_meeting (Lead_Id, Meeting_Date, Meeting_Type, Notes, Outcome, User_Id, Created_At, DeleteStatus) VALUES (?, ?, ?, ?, ?, ?, NOW(), 0)",
                params,
                (err, result) => {
                    if (err) return callback(err);
                    addLeadActivity({
                        Lead_Id: params[0],
                        Activity_Type: 'MEETING_UPDATE',
                        Activity_Title: meetingType === 'ONLINE' ? 'Online meeting added' : 'Offline meeting added',
                        New_Value: meeting.Meeting_Date || '',
                        Remarks: meeting.Outcome || meeting.Notes || '',
                        User_Id: params[5]
                    }, () => {});
                    callback(null, { success: true, LeadMeeting_Id: result.insertId });
                }
            );
        });
    },
    Get_Lead_Meetings: function (Lead_Id, callback) {
        ensureLeadMeetingTable((tableErr) => {
            if (tableErr) return callback(tableErr);
            const sql =
                "SELECT lm.*, COALESCE(ud.User_Details_Name, '') AS User_Name " +
                "FROM lead_meeting lm " +
                "LEFT JOIN User_Details ud ON ud.User_Details_Id = lm.User_Id " +
                "WHERE lm.Lead_Id = ? AND IFNULL(lm.DeleteStatus, 0) = 0 " +
                "ORDER BY lm.Meeting_Date DESC, lm.LeadMeeting_Id DESC";
            db.query(sql, [Lead_Id], (err, rows) => {
                if (err) return callback(err);
                callback(null, [rows]);
            });
        });
    },
    Save_Lead_Quote_Tracking: function (quote, callback) {
        ensureLeadQuoteTrackingTable((tableErr) => {
            if (tableErr) return callback(tableErr);
            const params = [
                Number(quote.Lead_Id || 0),
                Number(quote.Requirement_Id || 0) || null,
                quote.Requirement_Name || '',
                quote.Quote_Sent_Date || null,
                Number(quote.Quote_Amount || 0),
                quote.FollowUp_Status_After_Quote || '',
                Number(quote.User_Id || 0) || null
            ];
            db.query(
                "INSERT INTO lead_quote_tracking (Lead_Id, Requirement_Id, Requirement_Name, Quote_Sent_Date, Quote_Amount, FollowUp_Status_After_Quote, User_Id, Created_At, DeleteStatus) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0)",
                params,
                (err, result) => {
                    if (err) return callback(err);
                    addLeadActivity({
                        Lead_Id: params[0],
                        Activity_Type: 'QUOTE_SENT',
                        Activity_Title: 'Quote sent',
                        New_Value: params[2] || String(result.insertId),
                        Remarks: params[5],
                        User_Id: params[6]
                    }, () => {});
                    callback(null, { success: true, LeadQuoteTracking_Id: result.insertId });
                }
            );
        });
    },
    Get_Lead_Quote_Tracking: function (Lead_Id, callback) {
        ensureLeadQuoteTrackingTable((tableErr) => {
            if (tableErr) return callback(tableErr);
            const sql =
                "SELECT lqt.*, COALESCE(ud.User_Details_Name, '') AS User_Name " +
                "FROM lead_quote_tracking lqt " +
                "LEFT JOIN User_Details ud ON ud.User_Details_Id = lqt.User_Id " +
                "WHERE lqt.Lead_Id = ? AND IFNULL(lqt.DeleteStatus, 0) = 0 " +
                "ORDER BY lqt.Quote_Sent_Date DESC, lqt.LeadQuoteTracking_Id DESC";
            db.query(sql, [Lead_Id], (err, rows) => {
                if (err) return callback(err);
                callback(null, [rows]);
            });
        });
    },
    Update_Staff_Name_Single: function (Lead_Id, Staff_Id, callback) {
        return db.query("UPDATE `Lead` SET Staff_Id = ?, Staff_Name = (SELECT User_Details_Name FROM User_Details WHERE User_Details_Id = ?) WHERE Lead_Id = ?", [Staff_Id, Staff_Id, Lead_Id], callback);
    },
    Update_Latest_FollowUp: function (Lead_Id, Staff_Id, callback) {
        const query = "UPDATE `Follow_up` SET Staff_Id = ?, Staff_Name = (SELECT User_Details_Name FROM User_Details WHERE User_Details_Id = ?) WHERE Lead_Id = ? ORDER BY FollowUp_Id DESC LIMIT 1";
        return db.query(query, [Staff_Id, Staff_Id, Lead_Id], callback);
    }
};

module.exports = Lead;
