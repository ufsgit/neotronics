const db = require('../dbconnection');

const ActivityLogs = {
    Get_Activity_Logs_Summary: function (startDate, endDate, callback) {
        let query = `
            SELECT 
                DATE(Activity_Date) as Date, 
                Activity_Title as Activity_Type, 
                Department_Name,
                Staff_Name,
                Branch_Name,
                COUNT(*) as Count 
            FROM lead_activity_log 
            WHERE 1=1 `;
            
        const params = [];
        if (startDate) {
            query += ` AND DATE(Activity_Date) >= ?`;
            params.push(startDate);
        }
        if (endDate) {
            query += ` AND DATE(Activity_Date) <= ?`;
            params.push(endDate);
        }

        query += `
            GROUP BY DATE(Activity_Date), Activity_Title, Department_Name, Staff_Name, Branch_Name 
            ORDER BY DATE(Activity_Date) DESC 
            LIMIT 500`;
            
        return db.query(query, params, callback);
    },
    Get_Activity_Logs_List: function (startDate, endDate, callback) {
        let query = `
            SELECT 
                LeadActivityLog_Id, Activity_Date, Lead_Id, Lead_Name, Deal_Type,
                Old_Value, New_Value, Action_Taken, Activity_Title, Outcome,
                Next_Follow_Up, Notes, Branch_Name, Department_Name, Staff_Name
            FROM lead_activity_log 
            WHERE 1=1 
        `;
        const params = [];
        if (startDate) {
            query += ` AND DATE(Activity_Date) >= ?`;
            params.push(startDate);
        }
        if (endDate) {
            query += ` AND DATE(Activity_Date) <= ?`;
            params.push(endDate);
        }
        query += ` ORDER BY Activity_Date DESC LIMIT 500`;
        return db.query(query, params, callback);
    }
};

module.exports = ActivityLogs;
