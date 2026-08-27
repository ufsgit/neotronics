var db = require('../../../dbconnection');

var Branch = {

    Save_Branch: function (body, callback) {
        var id          = Number(body.Branch_Id || 0);
        var name        = (body.Branch_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Branch_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Branch: function (search, callback) {
        return db.query(
            'CALL LC_Branch_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Branch: function (id, callback) {
        return db.query(
            'CALL LC_Branch_Get(?)',
            [id],
            callback
        );
    },

    Delete_Branch: function (id, callback) {
        return db.query(
            'CALL LC_Branch_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = Branch;
