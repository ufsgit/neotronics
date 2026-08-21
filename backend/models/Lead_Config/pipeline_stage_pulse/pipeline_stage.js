var db = require('../../../dbconnection');

var PipelineStage = {

    Save_Pipeline_Stage: function (body, callback) {
        var id          = Number(body.Pipeline_Stage_Id || 0);
        var name        = (body.Pipeline_Stage_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_PipelineStage_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Pipeline_Stage: function (search, callback) {
        return db.query(
            'CALL LC_PipelineStage_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Pipeline_Stage: function (id, callback) {
        return db.query(
            'CALL LC_PipelineStage_Get(?)',
            [id],
            callback
        );
    },

    Delete_Pipeline_Stage: function (id, callback) {
        return db.query(
            'CALL LC_PipelineStage_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = PipelineStage;
