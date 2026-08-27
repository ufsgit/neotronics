var db = require('../../../dbconnection');

var Workflow = {

    Save_Workflow: function (body, callback) {
        var id          = Number(body.Workflow_Id || 0);
        var name        = (body.Workflow_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Workflow_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Workflow: function (search, callback) {
        return db.query(
            'CALL LC_Workflow_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Workflow: function (id, callback) {
        return db.query(
            'CALL LC_Workflow_Get(?)',
            [id],
            callback
        );
    },

    Delete_Workflow: function (id, callback) {
        return db.query(
            'CALL LC_Workflow_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = Workflow;
