const db = require('../backend/dbconnection');

db.query("UPDATE salesquotationmaster SET Status_Id = 1, Status_Name = 'Pending' WHERE Status_Id IS NULL OR Status_Id = 0", (err, res) => {
    if (err) {
        console.error("Error updating existing records:", err);
        process.exit(1);
    }
    console.log("Updated existing records count:", res.affectedRows);
    process.exit(0);
});
