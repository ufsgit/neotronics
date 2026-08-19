var db = require('../../../dbconnection');

var Source = {

    Save_Source: function (body, callback) {
        var sourceId   = Number(body.Source_Id || 0);
        var sourceName = (body.Source_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Source_Save(?, ?, ?)',
            [sourceId || null, sourceName, description],
            callback
        );
    },

    Search_Source: function (search, callback) {
        return db.query(
            'CALL LC_Source_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Source: function (sourceId, callback) {
        return db.query(
            'CALL LC_Source_Get(?)',
            [sourceId],
            callback
        );
    },

    Delete_Source: function (sourceId, callback) {
        return db.query(
            'CALL LC_Source_Delete(?)',
            [sourceId],
            callback
        );
    }
};

module.exports = Source;
