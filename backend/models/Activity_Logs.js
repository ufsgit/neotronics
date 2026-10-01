const db = require('../dbconnection');

const ActivityLogs = {
    Get_Activity_Logs_Summary: function (callback) {
        const query = `
            SELECT 
                DATE(Activity_Date) as Date, 
                Activity_Title as Activity_Type, 
                Department_Name,
                Staff_Name,
                Branch_Name,
                COUNT(*) as Count 
            FROM lead_activity_log 
            GROUP BY DATE(Activity_Date), Activity_Title, Department_Name, Staff_Name, Branch_Name 
            ORDER BY DATE(Activity_Date) DESC 
            LIMIT 500`;
        return db.query(query, callback);
    }
};

module.exports = ActivityLogs;
