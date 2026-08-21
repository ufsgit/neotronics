var db = require('../../../dbconnection');

var Assignment = {

    Save_Assignment: function (body, callback) {
        var id          = Number(body.Assignment_Id || 0);
        var name        = (body.Assignment_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Assignment_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Assignment: function (search, callback) {
        return db.query(
            'CALL LC_Assignment_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Assignment: function (id, callback) {
        return db.query(
            'CALL LC_Assignment_Get(?)',
            [id],
            callback
        );
    },

    Delete_Assignment: function (id, callback) {
        return db.query(
            'CALL LC_Assignment_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = Assignment;
