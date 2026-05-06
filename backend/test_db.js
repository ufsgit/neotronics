const db = require('./dbconnection'); db.query('SHOW TABLES', (e, r) => { console.log(r); process.exit(); })
