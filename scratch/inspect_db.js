const db = require('../backend/dbconnection');

db.query("DESCRIBE requirementmaster;", (err, res) => {
    if (err) {
        console.error("Error describing requirementmaster:", err.message);
    } else {
        const attendCol = res.find(c => c.Field === 'AttendEmployee');
        console.log("AttendEmployee column in DB table:", attendCol);
    }
    process.exit();
});
