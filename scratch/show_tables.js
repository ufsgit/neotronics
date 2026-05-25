const db = require('../backend/dbconnection');

db.query("SHOW TABLES;", (err, res) => {
    if (err) {
        console.error("Error showing tables:", err.message);
    } else {
        console.log("Tables:", res.map(r => Object.values(r)[0]));
    }
    process.exit();
});
