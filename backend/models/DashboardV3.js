var db = require('../dbconnection');

var DashboardV3 = require('../models/DashboardV3');

var DashboardV3 = {
    getDashboardV3Data: function (userId, userTypeId, callback) {
        const queries = [
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_KPIs(?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] ? rows[0][0] : {});
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('Pipeline', ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('FollowUp', ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] ? rows[0][0] : {});
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Day', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Week', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Month', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Day', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Week', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Month', NULL, NULL, ?, ?)", [userId, userTypeId], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            })
        ];

        Promise.all(queries)
            .then(results => {
                const response = {
                    kpi: results[0] || {},
                    pipeline: results[1] || [],
                    followUpSummary: results[2] || {},
                    activityDay: results[3] || [],
                    activityWeek: results[4] || [],
                    activityMonth: results[5] || [],
                    chartDay: results[6] || [],
                    chartWeek: results[7] || [],
                    chartMonth: results[8] || []
                };
                callback(null, response);
            })
            .catch(err => {
                callback(err, null);
            });
    },
    getKPIs: function(userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_KPIs(?, ?)", [userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] ? rows[0][0] : {});
        });
    },
    getPipeline: function(userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('Pipeline', ?, ?)", [userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] || []);
        });
    },
    getFollowUp: function(userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('FollowUp', ?, ?)", [userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] ? rows[0][0] : {});
        });
    },
    getActivityDay: function(fromDate, toDate, userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Day', ?, ?, ?, ?)", [fromDate, toDate, userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] || []);
        });
    },
    getActivityWeek: function(fromDate, toDate, userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Week', ?, ?, ?, ?)", [fromDate, toDate, userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] || []);
        });
    },
    getActivityMonth: function(fromDate, toDate, userId, userTypeId, callback) {
        db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Month', ?, ?, ?, ?)", [fromDate, toDate, userId, userTypeId], (err, rows) => {
            if (err) callback(err, null); else callback(null, rows[0] || []);
        });
    }
};

module.exports = DashboardV3;
