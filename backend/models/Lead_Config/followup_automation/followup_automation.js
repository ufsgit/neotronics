var db = require('../../../dbconnection');

var FollowupAutomation = {

    Save_Followup_Automation: function (body, callback) {
        var id          = Number(body.Followup_Automation_Id || 0);
        var name        = (body.Followup_Automation_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_FollowupAutomation_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Followup_Automation: function (search, callback) {
        return db.query(
            'CALL LC_FollowupAutomation_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Followup_Automation: function (id, callback) {
        return db.query(
            'CALL LC_FollowupAutomation_Get(?)',
            [id],
            callback
        );
    },

    Delete_Followup_Automation: function (id, callback) {
        return db.query(
            'CALL LC_FollowupAutomation_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = FollowupAutomation;
