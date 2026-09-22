var db = require('../dbconnection');

var New_FollowUp = {

    GetLeadInteractionHistory: function (Lead_Id_, offset, limit, callback) {
        return db.query(
            "CALL GetLeadInteractionHistory(@p_Lead_Id := ?, @p_Offset := ?, @p_Limit := ?)",
            [Lead_Id_, offset, limit],
            callback
        );
    },

    Save_NewFollowUp: function (data, callback) {
        const n = v => (v === '' || v === null || v === undefined) ? null : (isNaN(Number(v)) ? null : Number(v));
        const s = v => (v === '' || v === null || v === undefined) ? null : String(v);

        if (!data.Lead_Id) {
            return callback(new Error("Lead_Id is required for Follow Up"));
        }

        const params = [
            n(data.Lead_Id),
            n(data.Branch_Id),          s(data.Branch_Name),
            n(data.Department_Id),      s(data.Department_Name),
            n(data.Staff_Id),           s(data.Staff_Name),
            s(data.Next_FollowUp_Date) || null,
            s(data.Remark),
            n(data.Followup_Required) !== null ? n(data.Followup_Required) : 1,
            n(data.Pipeline_Stage_Id),  s(data.Pipeline_Stage),
            n(data.Stage_Type) || 0,
            s(data.Color) || '#3b82f6',
            n(data.Pulse_Id),           s(data.Pulse),
            n(data.isGhosting) || 0,
            n(data.Target_Stage_Id),    s(data.Target_Stage_Name),
            n(data.Login_User_Id)
        ];

        // Single SP call — update lead + pipeline history + ghosting history atomically
        const sql = `CALL Save_NewFollowUp(
            ?,        -- p_Lead_Id
            ?, ?,     -- Branch_Id, Branch_Name
            ?, ?,     -- Department_Id, Department_Name
            ?, ?,     -- Staff_Id, Staff_Name
            ?,        -- Next_FollowUp_Date
            ?,        -- Remark
            ?,        -- Followup_Required
            ?, ?,     -- PipelineStage_Id, Pipeline_Stage
            ?,        -- Stage_Type
            ?,        -- Color
            ?, ?,     -- Pulse_Id, Pulse
            ?,        -- isGhosting
            ?, ?,     -- Status_Id, Status_Name
            ?,        -- Login_User_Id
            @p_Success, @p_Message
        )`;

        db.query(sql, params, function (err) {
            if (err) return callback(err);

            db.query("SELECT @p_Success AS success, @p_Message AS message", function (err, rows) {
                if (err) return callback(err);

                const result = rows[0];
                if (result.success === 1) {
                    callback(null, { success: true, message: result.message });
                } else {
                    callback(new Error(result.message || "Save_NewFollowUp failed"));
                }
            });
        });
    }
};

module.exports = New_FollowUp;
