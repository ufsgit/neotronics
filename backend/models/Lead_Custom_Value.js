var db = require('../dbconnection');

var Lead_Custom_Value = {
    Save_Lead_Custom_Value: function(Lead_Custom_Value_, callback) {
        return db.query("CALL Save_Lead_Custom_Value(" +
            "@Lead_Id_ :=?," +
            "@Custom_Field_Id_ :=?," +
            "@Field_Value_ :=?" + ")",
            [
                Lead_Custom_Value_.Lead_Id,
                Lead_Custom_Value_.Custom_Field_Id,
                Lead_Custom_Value_.Field_Value
            ], callback);
    },
    Get_Lead_Custom_Values: function(Lead_Id_, callback) {
        return db.query("CALL Get_Lead_Custom_Values(@Lead_Id_ :=?)", [Lead_Id_], callback);
    }
};

module.exports = Lead_Custom_Value;
