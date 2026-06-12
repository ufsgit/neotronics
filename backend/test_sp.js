const db = require('./dbconnection').promise();
async function run() {
    try {
        const [rows] = await db.query("CALL Search_Company('')");
        console.log(rows[0]);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
