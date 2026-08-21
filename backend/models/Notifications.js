var db = require("../dbconnection");

const pool = db.promise();

async function ensureNotificationsTable() {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS notifications (" +
        "id INT AUTO_INCREMENT PRIMARY KEY, " +
        "staff_id INT NOT NULL, " +
        "lead_id INT NOT NULL, " +
        "message TEXT NOT NULL, " +
        "is_read TINYINT(1) DEFAULT 0, " +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
        ")"
    );
    try {
        await pool.query("ALTER TABLE notifications ADD COLUMN assigned_by_id INT NULL");
    } catch (e) {
        if (e.code !== 'ER_DUP_FIELDNAME') console.error(e);
    }
    try {
        await pool.query("ALTER TABLE notifications ADD COLUMN assigned_by_name VARCHAR(255) NULL");
    } catch (e) {
        if (e.code !== 'ER_DUP_FIELDNAME') console.error(e);
    }
}

function buildLeadMessage(lead) {
    const leadName = lead && lead.Lead_Name ? lead.Lead_Name : "Selected lead";
    const contactParts = [
        lead && lead.Contact_Person ? lead.Contact_Person : "",
        lead && lead.Contact_Number ? lead.Contact_Number : "",
        lead && lead.Phone ? lead.Phone : ""
    ].filter(Boolean);
    const contactInfo = contactParts.length > 0 ? contactParts.join(" / ") : "No contact info";
    return "You have been assigned to lead: " + leadName + " - " + contactInfo + ". Please review and take action.";
}

const Notifications = {
    CreateStaffAssignmentNotification: async function (staffId, leadId, assignedById, io, userSockets) {
        const staffIdNumber = Number(staffId || 0);
        const leadIdNumber = Number(leadId || 0);
        const assignedByIdNumber = Number(assignedById || 0);
        if (!staffIdNumber || !leadIdNumber) return { success: false, message: "Invalid staff or lead" };

        await ensureNotificationsTable();

        let assignedByName = "System";
        if (assignedByIdNumber) {
            const [userRows] = await pool.query("SELECT User_Details_Name FROM User_Details WHERE User_Details_Id = ?", [assignedByIdNumber]);
            if (userRows && userRows.length > 0) assignedByName = userRows[0].User_Details_Name;
        }

        const [leadRows] = await pool.query(
            "SELECT Lead_Id, Lead_Name, Contact_Person, Contact_Number, Phone FROM `Lead` WHERE Lead_Id = ? LIMIT 1",
            [leadIdNumber]
        );
        const lead = leadRows && leadRows.length > 0 ? leadRows[0] : { Lead_Id: leadIdNumber };
        const message = buildLeadMessage(lead);

        const [result] = await pool.query(
            "INSERT INTO notifications (staff_id, lead_id, message, is_read, assigned_by_id, assigned_by_name) VALUES (?, ?, ?, 0, ?, ?)",
            [staffIdNumber, leadIdNumber, message, assignedByIdNumber, assignedByName]
        );

        if (io && userSockets) {
            const socketId = userSockets.get(staffIdNumber);
            if (socketId) {
                const [notif] = await pool.query(
                    "SELECT n.id, n.staff_id, n.lead_id, n.message, n.is_read, n.created_at, n.assigned_by_name, " +
                    "l.Lead_Name, l.Contact_Person, l.Contact_Number, l.Phone " +
                    "FROM notifications n " +
                    "LEFT JOIN `Lead` l ON l.Lead_Id = n.lead_id " +
                    "WHERE n.id = ?",
                    [result.insertId]
                );
                if (notif && notif.length > 0) {
                    io.to(socketId).emit('lead_assigned', notif[0]);
                }
            }
        }

        return { success: true, notification_id: result.insertId };
    },

    GetUnreadByStaff: async function (staffId) {
        const staffIdNumber = Number(staffId || 0);
        if (!staffIdNumber) return [];

        await ensureNotificationsTable();

        const [rows] = await pool.query(
            "SELECT n.id, n.staff_id, n.lead_id, n.message, n.is_read, n.created_at, n.assigned_by_name, " +
            "l.Lead_Name, l.POC_Full_Name, l.POC_Direct_Mobile AS Contact_Number, l.POC_Work_Phone AS Phone " +
            "FROM notifications n " +
            "LEFT JOIN `Lead` l ON l.Lead_Id = n.lead_id " +
            "WHERE n.staff_id = ? AND IFNULL(n.is_read, 0) = 0 " +
            "ORDER BY n.created_at DESC, n.id DESC",
            [staffIdNumber]
        );
        return rows;
    },

    MarkAsRead: async function (notificationId) {
        const notificationIdNumber = Number(notificationId || 0);
        if (!notificationIdNumber) return { success: false, message: "Invalid notification" };

        await ensureNotificationsTable();

        const [result] = await pool.query(
            "UPDATE notifications SET is_read = 1 WHERE id = ?",
            [notificationIdNumber]
        );
        return { success: result.affectedRows > 0 };
    }
};

module.exports = Notifications;
