const db = require('./dbconnection');
db.query("SHOW CREATE PROCEDURE Search_User_Details", (err, res) => {
    if (err) console.error(err);
    if(res && res.length > 0) console.log(res[0]['Create Procedure']);
    process.exit();
});
