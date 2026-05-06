
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'neotronics_db'
});

connection.connect();

connection.query("SHOW TABLES LIKE '%requirement%'", (err, tables) => {
  if (err) {
    console.error('Error:', err.message);
    connection.end();
    return;
  }
  const tableNames = tables.map(t => Object.values(t)[0]);
  console.log('Requirement related tables:', tableNames);

  tableNames.forEach(table => {
    connection.query(`DESCRIBE ${table}`, (err, columns) => {
      console.log(`Structure of ${table}:`);
      console.table(columns);
      if (table === tableNames[tableNames.length - 1]) {
          connection.end();
      }
    });
  });
});
