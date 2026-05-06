
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'neotronics_db'
});

connection.connect();

const queries = [
  "ALTER TABLE requirementmaster MODIFY COLUMN RequirementMaster_Id INT AUTO_INCREMENT",
  "ALTER TABLE requirementdetails MODIFY COLUMN RequirementDetails_Id INT AUTO_INCREMENT"
];

let completed = 0;
queries.forEach(query => {
  connection.query(query, (err, results) => {
    if (err) {
      console.error(`Error executing "${query}":`, err.message);
    } else {
      console.log(`Successfully executed: "${query}"`);
    }
    completed++;
    if (completed === queries.length) {
      connection.end();
    }
  });
});
