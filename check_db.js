const db = require('./backend/dbconnection');

async function checkDB() {
    db.query("SHOW TABLES", (err, tables) => {
        console.log("TABLES:", tables);
        db.query("SELECT * FROM Vertical", (err, rows) => {
            console.log("VERTICAL ROWS:", rows);
            db.query("SELECT * FROM Designation", (err, drows) => {
                console.log("DESIGNATION ROWS:", drows);
                process.exit();
            });
        });
    });
}

checkDB();
