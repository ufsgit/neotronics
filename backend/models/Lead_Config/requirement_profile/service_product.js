var db = require('../../../dbconnection');

var ServiceProduct = {

    Save_Service_Product: function (body, callback) {
        var id          = Number(body.Service_Product_Id || 0);
        var name        = (body.Service_Product_Name || '').trim();
        var description = body.Description || '';

        return db.query(
            'CALL LC_ServiceProduct_Save(?, ?, ?)',
            [id || null, name, description],
            callback
        );
    },

    Search_Service_Product: function (search, callback) {
        return db.query(
            'CALL LC_ServiceProduct_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Service_Product: function (id, callback) {
        return db.query(
            'CALL LC_ServiceProduct_Get(?)',
            [id],
            callback
        );
    },

    Delete_Service_Product: function (id, callback) {
        return db.query(
            'CALL LC_ServiceProduct_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = ServiceProduct;
