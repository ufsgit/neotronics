const db = require('./dbconnection');
db.query("ALTER TABLE user_details ADD COLUMN Department_Id INT DEFAULT 0, ADD COLUMN Branch_Id INT DEFAULT 0", (err, result) => {
    if (err) console.error(err);
    console.log("alter table:", result);
    process.exit();
});
