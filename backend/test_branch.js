const Branch = require('./models/Lead_Config/assignment/branch');

Branch.Search_Branch('', function(err, rows) {
    if (err) console.error(err);
    console.log(JSON.stringify(rows[0], null, 2));
    process.exit();
});
