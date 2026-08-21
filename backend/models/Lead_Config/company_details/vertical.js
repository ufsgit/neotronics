var db = require('../../../dbconnection');

var Vertical = {

    Save_Vertical: function (body, callback) {
        var verticalId   = Number(body.Vertical_Id || 0);
        var verticalName = (body.Vertical_Name || '').trim();
        var description  = body.Description || '';

        return db.query(
            'CALL LC_Vertical_Save(?, ?, ?)',
            [verticalId || null, verticalName, description],
            callback
        );
    },

    Search_Vertical: function (search, callback) {
        return db.query(
            'CALL LC_Vertical_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Vertical: function (verticalId, callback) {
        return db.query(
            'CALL LC_Vertical_Get(?)',
            [verticalId],
            callback
        );
    },

    Delete_Vertical: function (verticalId, callback) {
        return db.query(
            'CALL LC_Vertical_Delete(?)',
            [verticalId],
            callback
        );
    }
};

module.exports = Vertical;
