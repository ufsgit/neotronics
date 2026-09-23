var db = require('../dbconnection');

var CalendarFollowUp = {
    GetCalendarFollowUps: function (User_Id, ViewType, CurrentDate, callback) {
        return db.query("CALL Get_Calendar_FollowUps(?, ?, ?)", [User_Id, ViewType, CurrentDate], function (err, rows) {
            if (err) return callback(err);
            
            // SP returns only one result set now: The FollowUp Data
            let followUps = (rows && Array.isArray(rows[0])) ? rows[0] : rows;
            
            callback(null, followUps);
        });
    }
};

module.exports = CalendarFollowUp;
