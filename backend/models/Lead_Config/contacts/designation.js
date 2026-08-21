var db = require('../../../dbconnection');

var Designation = {

    Save_Designation: function (body, callback) {
        var designationId   = Number(body.Designation_Id || 0);
        var designationName = (body.Designation_Name || '').trim();
        var description     = body.Description || '';

        return db.query(
            'CALL LC_Designation_Save(?, ?, ?)',
            [designationId || null, designationName, description],
            callback
        );
    },

    Search_Designation: function (search, callback) {
        return db.query(
            'CALL LC_Designation_Search(?)',
            [search || null],
            callback
        );
    },

    Get_Designation: function (designationId, callback) {
        return db.query(
            'CALL LC_Designation_Get(?)',
            [designationId],
            callback
        );
    },

    Delete_Designation: function (designationId, callback) {
        return db.query(
            'CALL LC_Designation_Delete(?)',
            [designationId],
            callback
        );
    }
};

module.exports = Designation;
