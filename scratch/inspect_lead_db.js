const db = require('../backend/dbconnection');

db.query("DESCRIBE `lead`;", (err, res) => {
    if (err) {
        console.error("Error describing lead:", err.message);
    } else {
        console.log(res);
    }
    process.exit();
});
