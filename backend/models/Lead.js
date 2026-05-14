var db = require('../dbconnection');

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

                // Persist the new extra fields via a supplementary UPDATE
                if (savedLeadId > 0) {
                    const extraParams = [
                        Lead_.Project_Name || null,
                        Lead_.POC_Name || null,
                        Lead_.Company_Size_Id || 0,
                        Lead_.Next_Call_Action ? 1 : 0,
                        savedLeadId
                    ];
                    db.query(
                        "UPDATE `Lead` SET Project_Name = ?, POC_Name = ?, Company_Size_Id = ?, Next_Call_Action = ? WHERE Lead_Id = ?",
                        extraParams,
                        (err2) => {
                            if (err2) console.error('Error saving extra Lead fields:', err2);
                            return callback(null, rows);
                        }
                    );
                } else {
                    return callback(null, rows);
                }
            });
    },
    Get_Leads: function (callback) {
        return db.query("CALL Get_Leads(?, ?)", [1, 1000000], callback);
    },
    Get_Dropdowns_Lead: function (callback) {
        return db.query("CALL Get_Dropdowns_Lead()", [], (err, rows) => {
            if (err) return callback(err, rows);
            let results = (rows && Array.isArray(rows[0])) ? rows : [rows];
            db.query("SELECT Vertical_Id, Vertical_Name FROM Vertical WHERE DeleteStatus = 0 ORDER BY Vertical_Name", (vErr, vRows) => {
                if (!vErr && vRows) results[3] = vRows;
                db.query("SELECT Designation_Id, Designation_Name FROM Designation WHERE DeleteStatus = 0 ORDER BY Designation_Name", (dErr, dRows) => {
                    if (!dErr && dRows) results[4] = dRows;
                    callback(null, results);
                });
            });
        });
    },
    Delete_Lead: function (Lead_Id, callback) {
        return db.query("CALL Delete_Lead(?)", [Lead_Id], callback);
    },
    Get_Lead_FollowUp_History: function (Lead_Id, callback) {
        return db.query("CALL Get_Lead_FollowUp_History(?)", [Lead_Id], callback);
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
