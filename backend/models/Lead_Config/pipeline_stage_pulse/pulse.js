var db = require('../../../dbconnection');

var Pulse = {

    Save_Pulse: function (body, callback) {
        var id          = Number(body.Pulse_Id || 0);
        var name        = (body.Pulse_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_Pulse_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Pulse: function (search, callback) {
        return db.query(
            'CALL LC_Pulse_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Pulse: function (id, callback) {
        return db.query(
            'CALL LC_Pulse_Get(?)',
            [id],
            callback
        );
    },

    Delete_Pulse: function (id, callback) {
        return db.query(
            'CALL LC_Pulse_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = Pulse;
