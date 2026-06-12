const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'neotronics_db'
});

connection.query("SELECT * FROM user_details WHERE User_Details_Name = 'supadmin'", (err, rows) => {
    if (err) {
        console.error("Error querying table:", err.message);
    } else {
        console.log("USER FOUND:");
        console.log(JSON.stringify(rows, null, 2));
    }
    connection.end();
});
