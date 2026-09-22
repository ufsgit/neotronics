var db = require('../dbconnection');

var DashboardV3 = {
    getDashboardV3Data: function (callback) {
        const queries = [
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_KPIs()", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] ? rows[0][0] : {});
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('Pipeline')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Pipeline_FollowUp('FollowUp')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] ? rows[0][0] : {});
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Day')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Week')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Table('Month')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Day')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Week')", [], (err, rows) => {
                    if (err) reject(err); else resolve(rows[0] || []);
                });
            }),
            new Promise((resolve, reject) => {
                db.query("CALL Get_Lead_Dashboard_V3_Activity_Chart('Month')", [], (err, rows) => {
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
    }
};

module.exports = DashboardV3;
