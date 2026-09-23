const db = require('./dbconnection');

db.query('DESCRIBE `lead`', (err, results) => {
    if (err) throw err;
    console.log(results.map(r => r.Field).join(', '));
    process.exit();
});
