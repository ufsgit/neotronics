
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'neotronics_db'
});

connection.connect();

const tablesToCheck = ['requirement_master', 'requirementdetails'];

tablesToCheck.forEach(table => {
  connection.query(`DESCRIBE ${table}`, (err, columns) => {
    if (err) {
      console.error(`Error describing ${table}:`, err.message);
    } else {
      console.log(`Structure of ${table}:`);
      console.table(columns);
    }
    
    if (table === tablesToCheck[tablesToCheck.length - 1]) {
        // After describing last table, check SP definition if possible
        // Actually, let's just end for now.
        connection.end();
    }
  });
});
