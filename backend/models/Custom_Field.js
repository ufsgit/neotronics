var db = require('../dbconnection');

var Custom_Field = {
    Save_Custom_Field: function(Custom_Field_, callback) {
        db.query("CALL Save_Custom_Field(" +
            "@Custom_Field_Id_ :=?," +
            "@Field_Name_ :=?," +
            "@Field_Type_ :=?," +
            "@Quotation_Custom_ :=?," +
            "@View_In_Quotation_ :=?," +
            "@Events_ :=?," +
            "@Field_List_ :=?" + ")",
            [
                Custom_Field_.Custom_Field_Id,
                Custom_Field_.Field_Name,
                Custom_Field_.Field_Type,
                Custom_Field_.Quotation_Custom,
                Custom_Field_.View_In_Quotation,
                Custom_Field_.Events,
                Custom_Field_.Field_List
            ], function(err, rows) {
                if (err) return callback(err);

                let cf_id = 0;
                if (rows && rows[0] && rows[0][0] && rows[0][0].Custom_Field_Id_) {
                    cf_id = rows[0][0].Custom_Field_Id_;
                } else if (Custom_Field_.Custom_Field_Id) {
                    cf_id = Custom_Field_.Custom_Field_Id;
                }

                if (!cf_id) return callback(null, rows);

                db.query("DELETE FROM custom_field_sub WHERE Custom_Field_Id = ?", [cf_id], function(err1) {
                    db.query("DELETE FROM customfield_subtable WHERE Custom_Field_Id = ?", [cf_id], function(err2) {
                        
                        if (!Custom_Field_.Field_List) return callback(null, rows);
                        
                        let options = Custom_Field_.Field_List.split(',').map(s => s.trim()).filter(s => s);
                        if (options.length === 0) return callback(null, rows);
                        
                        let tableName = '';
                        if (Custom_Field_.Field_Type === 'Dropdown' || Custom_Field_.Field_Type === 'Radio') {
                            tableName = 'custom_field_sub';
                        } else if (Custom_Field_.Field_Type === 'Checkbox') {
                            tableName = 'customfield_subtable';
                        }
                        
                        if (!tableName) return callback(null, rows);
                        
                        let values = options.map(opt => [cf_id, opt]);
                        db.query(`INSERT INTO ${tableName} (Custom_Field_Id, Option_Name) VALUES ?`, [values], function(err3) {
                            return callback(null, rows);
                        });
                    });
                });
            });
    },
    Delete_Custom_Field: function(Custom_Field_Id_, callback) {
        return db.query("CALL Delete_Custom_Field(@Custom_Field_Id_ :=?)", [Custom_Field_Id_], callback);
    },
    Search_Custom_Field: function(callback) {
        return db.query("CALL Search_Custom_Field()", [], callback);
    },
    Get_Field_Types: function(callback) {
        return db.query("CALL Get_Field_Types()", [], callback);
    }
};

module.exports = Custom_Field;
