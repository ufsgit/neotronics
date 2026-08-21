var db = require('../../../dbconnection');

var TargetStage = {

    Save_Target_Stage: function (body, callback) {
        var id          = Number(body.Target_Stage_Id || 0);
        var name        = (body.Target_Stage_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_TargetStage_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Target_Stage: function (search, callback) {
        return db.query(
            'CALL LC_TargetStage_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Target_Stage: function (id, callback) {
        return db.query(
            'CALL LC_TargetStage_Get(?)',
            [id],
            callback
        );
    },

    Delete_Target_Stage: function (id, callback) {
        return db.query(
            'CALL LC_TargetStage_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = TargetStage;
