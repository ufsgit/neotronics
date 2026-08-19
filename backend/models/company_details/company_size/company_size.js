var db = require('../../../dbconnection');

var CompanySize = {

    Save_CompanySize: function (body, callback) {
        var companySizeId   = Number(body.Company_Size_Id || 0);
        var companySizeName = (body.Company_Size_Name || '').trim();
        var description     = body.Description || '';

        return db.query(
            'CALL LC_CompanySize_Save(?, ?, ?)',
            [companySizeId || null, companySizeName, description],
            callback
        );
    },

    Search_CompanySize: function (search, callback) {
        return db.query(
            'CALL LC_CompanySize_Search(?)',
            [search || null],
            callback
        );
    },

    Get_CompanySize: function (companySizeId, callback) {
        return db.query(
            'CALL LC_CompanySize_Get(?)',
            [companySizeId],
            callback
        );
    },

    Delete_CompanySize: function (companySizeId, callback) {
        return db.query(
            'CALL LC_CompanySize_Delete(?)',
            [companySizeId],
            callback
        );
    }
};

module.exports = CompanySize;
