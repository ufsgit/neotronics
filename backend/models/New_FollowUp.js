var db = require('../dbconnection');

function ensureNewFollowUpTable(callback) {
    const sql =
        "CREATE TABLE IF NOT EXISTS new_follow_up (" +
        "  New_FollowUp_Id   INT NOT NULL AUTO_INCREMENT," +
        "  Lead_Id           INT NOT NULL," +
        "  Branch_Id         INT NULL," +
        "  Branch_Name       VARCHAR(255) NULL," +
        "  Department_Id     INT NULL," +
        "  Department_Name   VARCHAR(255) NULL," +
        "  Staff_Id          INT NULL," +
        "  Staff_Name        VARCHAR(255) NULL," +
        "  Target_Stage_Id   INT NULL," +
        "  Target_Stage_Name VARCHAR(255) NULL," +
        "  Next_FollowUp_Date DATE NULL," +
        "  Remark            TEXT NULL," +
        "  Pipeline_Stage_Id INT NULL," +
        "  Pipeline_Stage    VARCHAR(255) NULL," +
        "  Stage_Type        TINYINT DEFAULT 0," +
        "  Followup_Required TINYINT DEFAULT 1," +
        "  Color             VARCHAR(50) DEFAULT '#3b82f6'," +
        "  Pulse_Id          INT NULL," +
        "  Pulse             VARCHAR(255) NULL," +
        "  Login_User_Id     INT NULL," +
        "  Created_At        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "  DeleteStatus      TINYINT DEFAULT 0," +
        "  PRIMARY KEY (New_FollowUp_Id)," +
        "  KEY idx_new_follow_up_lead (Lead_Id)" +
        ")";
    db.query(sql, callback);
}

var New_FollowUp = {

    Save_New_FollowUp: function (data, callback) {
        ensureNewFollowUpTable(function (tableErr) {
            if (tableErr) return callback(tableErr);

            const n = v => (v === '' || v === null || v === undefined) ? null : (isNaN(Number(v)) ? null : Number(v));
            const s = v => (v === '' || v === null || v === undefined) ? null : String(v);

            const sql =
                "INSERT INTO new_follow_up " +
                "(Lead_Id, Branch_Id, Branch_Name, Department_Id, Department_Name, " +
                " Staff_Id, Staff_Name, Target_Stage_Id, Target_Stage_Name, " +
                " Next_FollowUp_Date, Remark, Pipeline_Stage_Id, Pipeline_Stage, " +
                " Stage_Type, Followup_Required, Color, " +
                " Pulse_Id, Pulse, Login_User_Id, Created_At, DeleteStatus) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)";

            const params = [
                n(data.Lead_Id), n(data.Branch_Id), s(data.Branch_Name),
                n(data.Department_Id), s(data.Department_Name),
                n(data.Staff_Id), s(data.Staff_Name),
                n(data.Target_Stage_Id), s(data.Target_Stage_Name),
                s(data.Next_FollowUp_Date) || null, s(data.Remark),
                n(data.Pipeline_Stage_Id), s(data.Pipeline_Stage),
                n(data.Stage_Type) || 0, (data.Followup_Required !== undefined && data.Followup_Required !== null) ? Number(data.Followup_Required) : 1, s(data.Color) || '#3b82f6',
                n(data.Pulse_Id), s(data.Pulse),
                n(data.Login_User_Id)
            ];

            db.query(sql, params, function (err, result) {
                if (err) return callback(err);
                callback(null, { success: true, New_FollowUp_Id: result.insertId });
            });
        });
    },

    Get_FollowUps_By_Lead: function (Lead_Id, callback) {
        ensureNewFollowUpTable(function (tableErr) {
            if (tableErr) return callback(tableErr);

            const sql =
                "SELECT nf.*, COALESCE(ud.User_Details_Name, nf.Staff_Name, '') AS Assigned_Staff_Name " +
                "FROM new_follow_up nf " +
                "LEFT JOIN User_Details ud ON ud.User_Details_Id = nf.Staff_Id " +
                "WHERE nf.Lead_Id = ? AND IFNULL(nf.DeleteStatus, 0) = 0 " +
                "ORDER BY nf.Created_At DESC, nf.New_FollowUp_Id DESC";

            db.query(sql, [Number(Lead_Id)], function (err, rows) {
                if (err) return callback(err);
                callback(null, [rows]);
            });
        });
    }
};

module.exports = New_FollowUp;
