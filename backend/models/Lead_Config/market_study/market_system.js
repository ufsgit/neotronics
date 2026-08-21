var db = require('../../../dbconnection');

var MarketSystem = {

    Save_Market_System: function (body, callback) {
        var id          = Number(body.Market_System_Id || 0);
        var name        = (body.Market_System_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_MarketSystem_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Market_System: function (search, callback) {
        return db.query(
            'CALL LC_MarketSystem_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Market_System: function (id, callback) {
        return db.query(
            'CALL LC_MarketSystem_Get(?)',
            [id],
            callback
        );
    },

    Delete_Market_System: function (id, callback) {
        return db.query(
            'CALL LC_MarketSystem_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = MarketSystem;
