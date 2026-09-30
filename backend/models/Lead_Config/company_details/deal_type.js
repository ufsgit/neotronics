var db = require('../../../dbconnection');

var DealType = {

    Save_DealType: function (body, callback) {
        var dealTypeId   = Number(body.Deal_Type_Id || 0);
        var dealTypeName = (body.Deal_Type_Name || '').trim();

        return db.query(
            'CALL LC_DealType_Save(?, ?)',
            [dealTypeId || null, dealTypeName],
            callback
        );
    },

    Search_DealType: function (search, page, pageSize, callback) {
        return db.query(
            'CALL LC_DealType_Search(?, ?, ?)',
            [search || null, page || 1, pageSize || 20],
            callback
        );
    },

    Get_DealType: function (dealTypeId, callback) {
        return db.query(
            'CALL LC_DealType_Get(?)',
            [dealTypeId],
            callback
        );
    },

    Delete_DealType: function (dealTypeId, callback) {
        return db.query(
            'CALL LC_DealType_Delete(?)',
            [dealTypeId],
            callback
        );
    }
};

module.exports = DealType;
