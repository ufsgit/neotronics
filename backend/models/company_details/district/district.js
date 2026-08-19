var db = require('../../../dbconnection');

var District = {

    Save_District: function (body, callback) {
        var districtId   = Number(body.District_Id || 0);
        var districtName = (body.District_Name || '').trim();
        var stateId      = Number(body.State_Id || 0);

        return db.query(
            'CALL LC_District_Save(?, ?, ?)',
            [districtId || null, districtName, stateId || null],
            callback
        );
    },

    Search_District: function (search, stateId, callback) {
        return db.query(
            'CALL LC_District_Search(?, ?)',
            [search || null, stateId || null],
            callback
        );
    },

    Get_District: function (districtId, callback) {
        return db.query(
            'CALL LC_District_Get(?)',
            [districtId],
            callback
        );
    },

    Delete_District: function (districtId, callback) {
        return db.query(
            'CALL LC_District_Delete(?)',
            [districtId],
            callback
        );
    }
};

module.exports = District;
