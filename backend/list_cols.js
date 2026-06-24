const db = require('./dbconnection');
db.query("DESC requirementmaster", (err, rows) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(rows.map(r => r.Field), null, 2));
    process.exit(0);
});
