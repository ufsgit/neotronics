var db = require('../../../dbconnection');

var MarketSystem = {

    Save_Market_System: function (body, callback) {
        var id          = Number(body.Market_System_Id || 0);
        var name        = (body.Market_System_Name || '').trim();
        var isActive    = body.IsActive !== undefined ? body.IsActive : 1;

        return db.query(
            'CALL LC_MarketStudyCategory_Save(?, ?, ?)',
            [id || null, name, isActive],
            callback
        );
    },

    Search_Market_System: function (search, callback) {
        return db.query(
            'CALL LC_MarketStudyCategory_Get(?, ?)',
            [search || null, 1],
            function (err, results) {
                if (err) return callback(err, null);
                // The new SP returns Category_Id and Category_Name, but frontend expects Market_System_Id and Market_System_Name
                var mappedData = [];
                if (results && results[0]) {
                    mappedData = results[0].map(function (item) {
                        return {
                            Market_System_Id: item.Category_Id,
                            Market_System_Name: item.Category_Name,
                            IsActive: item.IsActive
                        };
                    });
                }
                callback(null, [mappedData]);
            }
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
            'CALL LC_MarketStudyCategory_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = MarketSystem;
