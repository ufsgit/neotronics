const db = require('../backend/dbconnection');

db.query("SHOW CREATE PROCEDURE Save_Lead;", (err, res) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log(res[0]['Create Procedure']);
    }
    process.exit();
});
