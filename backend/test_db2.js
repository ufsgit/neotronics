const db = require('./dbconnection');
db.query("SELECT * FROM company", (err, result) => {
    if (err) console.error(err);
    console.log("company data:", result);
});
db.query("SELECT * FROM client_accounts limit 2", (err, result) => {
    if (err) console.error(err);
    console.log("client accounts data:", result);
});
setTimeout(() => process.exit(), 1000);
