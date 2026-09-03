var db = require('../../../dbconnection');

var MarketStudyField = {
    Get_Fields_By_Category: function (categoryId, search, page, limit, callback) {
        return db.query(
            'CALL LC_MarketStudyField_Get_By_Category(?, ?, ?, ?)',
            [categoryId || null, search || null, page || 1, limit || 10],
            function (err, results) {
                if (err) return callback(err, null);
                
                var mappedData = [];
                var totalCount = 0;
                
                if (results && results[0]) {
                    mappedData = results[0].map(function (item) {
                        return {
                            Field_Id: item.Field_Id,
                            Category_Id: item.Category_Id,
                            Category_Name: item.Category_Name,
                            Field_Name: item.Field_Name,
                            Field_Type: item.Field_Type,
                            IsRequired: item.IsRequired
                        };
                    });
                }
                
                if (results && results[1] && results[1][0]) {
                    totalCount = results[1][0].TotalCount;
                }
                
                callback(null, { list: mappedData, totalCount: totalCount });
            }
        );
    },

    Save_Field: function (body, callback) {
        var fieldId     = Number(body.Field_Id || 0);
        var categoryId  = Number(body.Category_Id || 0);
        var fieldName   = (body.Field_Name || '').trim();
        var fieldType   = (body.Field_Type || 'Text').trim();
        var isRequired  = Number(body.IsRequired || 0);

        return db.query(
            'CALL LC_MarketStudyField_Save(?, ?, ?, ?, ?)',
            [fieldId || null, categoryId || null, fieldName, fieldType, isRequired],
            callback
        );
    },

    Delete_Field: function (id, callback) {
        return db.query(
            'CALL LC_MarketStudyField_Delete(?)',
            [id],
            callback
        );
    }
};

module.exports = MarketStudyField;
