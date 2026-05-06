const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'neotronics_db'
});

connection.connect();

connection.query("SHOW TABLES", (err, tables) => {
  if (err) {
    console.error('Error connecting or showing tables:', err.message);
    connection.end();
    return;
  }
  console.log('Tables in neotronics_db:', tables.map(t => Object.values(t)[0]).join(', '));

  connection.query("SHOW PROCEDURE STATUS WHERE Db = 'neotronics_db'", (err, procs) => {
    if (err) {
      console.error('Error showing procedures:', err.message);
    } else {
      console.log('Procedures in neotronics_db:', procs.map(p => p.Name).join(', '));
    }

    connection.query("SELECT * FROM User_Details", (err, users) => {
        if (err) {
          console.error('Error fetching users:', err.message);
        } else {
          console.log('Users found:', users.length);
          if (users.length > 0) {
            console.log('First user:', users[0]);
          }
        }
        connection.end();
    });
  });
});
