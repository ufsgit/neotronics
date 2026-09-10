var db = require('../dbconnection');

var Ghosting = {
    Get_Ghosting_KPI: function (callback) {
        return db.query("CALL Get_Ghosting_KPI()", [], callback);
    },
    Get_Ghosting_Stage_Summary: function (limit, offset, callback) {
        limit = parseInt(limit, 10) || 100;
        offset = parseInt(offset, 10) || 0;
        return db.query("CALL Get_Ghosting_Stage_Summary(?, ?)", [limit, offset], callback);
    },
    Get_Ghosting_Charts_Data: function (report_type, callback) {
        return db.query("CALL Get_Ghosting_Charts_Data(?)", [report_type], callback);
    },
    Get_Ghosting_Register: function (limit, offset, search, is_current, callback) {
        limit = parseInt(limit, 10) || 10;
        offset = parseInt(offset, 10) || 0;
        return db.query("CALL Get_Ghosting_Register(?, ?, ?, ?)", [limit, offset, search, is_current], callback);
    }
};

module.exports = Ghosting;
