const db = require('../dbconnection');

const ActivityLogs = {

    // SP: Activity_Logs_KPIs()
    Activity_Logs_KPIs: function (callback) {
        db.query(`CALL Activity_Logs_KPIs()`, (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows[0][0] || { TotalActivities: 0, ActivitiesToday: 0, TopStaff: 'N/A', TopDept: 'N/A' });
        });
    },

    // SP: Activity_Logs_Type_Chart(startDate, endDate)
    Activity_Logs_Type_Chart: function (startDate, endDate, callback) {
        db.query(`CALL Activity_Logs_Type_Chart(?, ?)`, [startDate || null, endDate || null], (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows[0] || []);
        });
    },

    // SP: Activity_Logs_Dept_Chart(startDate, endDate)
    Activity_Logs_Dept_Chart: function (startDate, endDate, callback) {
        db.query(`CALL Activity_Logs_Dept_Chart(?, ?)`, [startDate || null, endDate || null], (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows[0] || []);
        });
    },

    // SP: Activity_Logs_Staff_Chart(startDate, endDate)
    Activity_Logs_Staff_Chart: function (startDate, endDate, callback) {
        db.query(`CALL Activity_Logs_Staff_Chart(?, ?)`, [startDate || null, endDate || null], (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows[0] || []);
        });
    },

    // SP: Activity_Logs_List_Paginated(startDate, endDate, page, limit)
    Activity_Logs_List_Paginated: function (startDate, endDate, page, limit, callback) {
        const p = [startDate || null, endDate || null, page || 1, limit || 20];
        db.query(`CALL Activity_Logs_List_Paginated(?, ?, ?, ?)`, p, (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows[0] || []);
        });
    }

};

module.exports = ActivityLogs;
