const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'neotronics_new',
    multipleStatements: true
});

const sql = fs.readFileSync('./update_save_sales_order_sp.sql', 'utf8');

connection.connect((err) => {
    if (err) { console.error('Connect error:', err.message); process.exit(1); }
    console.log('Connected to MySQL');
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating SP:', err.message);
        } else {
            console.log('SP updated successfully!', result);
        }
        connection.end();
    });
});
