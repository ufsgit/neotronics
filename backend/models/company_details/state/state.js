var db = require('../../../dbconnection');

var State = {

    Save_State: function (body, callback) {
        var stateId   = Number(body.State_Id || 0);
        var stateName = (body.State_Name || '').trim();

        return db.query(
            'CALL LC_State_Save(?, ?)',
            [stateId || null, stateName],
            callback
        );
    },

    Search_State: function (search, callback) {
        return db.query(
            'CALL LC_State_Search(?)',
            [search || null],
            callback
        );
    },

    Get_State: function (stateId, callback) {
        return db.query(
            'CALL LC_State_Get(?)',
            [stateId],
            callback
        );
    },

    Delete_State: function (stateId, callback) {
        return db.query(
            'CALL LC_State_Delete(?)',
            [stateId],
            callback
        );
    }
};

module.exports = State;
