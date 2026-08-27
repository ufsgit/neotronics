var db = require('../../../dbconnection');

var Department = {

    Save_Department: function (body, callback) {
        var id          = Number(body.Department_Id || 0);
        var name        = (body.Department_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Department_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Department: function (search, callback) {
        return db.query(
            'CALL LC_Department_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Department: function (id, callback) {
        return db.query(
            'CALL LC_Department_Get(?)',
            [id],
            callback
        );
    },

    Delete_Department: function (id, callback) {
        return db.query(
            'CALL LC_Department_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = Department;
