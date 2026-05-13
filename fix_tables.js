const db = require('./backend/dbconnection');

function queryAsync(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                console.error("Query Error:", sql, err.message);
                resolve(err); // Resolve anyway to continue
            } else {
                console.log("Query Success:", sql);
                resolve(res);
            }
        });
    });
}

async function fixTables() {
    console.log("Starting table fix...");
    await queryAsync("ALTER TABLE Vertical ADD COLUMN Description TEXT");
    await queryAsync("ALTER TABLE Vertical ADD COLUMN DeleteStatus TINYINT DEFAULT 0");
    await queryAsync("ALTER TABLE Designation ADD COLUMN Description TEXT");
    await queryAsync("ALTER TABLE Designation ADD COLUMN DeleteStatus TINYINT DEFAULT 0");
    console.log("Fix attempt complete.");
    process.exit();
}

fixTables();
