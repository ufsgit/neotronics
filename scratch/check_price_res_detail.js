const db = require('../backend/dbconnection');

db.query("DESCRIBE price_response_details;", (err, res) => {
    if (err) {
        console.error("Error describing price_response_details:", err.message);
    } else {
        console.log("price_response_details columns:", res.map(r => r.Field));
    }
    process.exit();
});
