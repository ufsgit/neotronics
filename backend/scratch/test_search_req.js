const db = require('../dbconnection');

async function testSearch() {
    try {
        const query = "CALL Search_Requirement(0, '2020-01-01', '2030-01-01', 0, '', '', 0, 0, 0, 0, 0)";
        const [rows] = await db.promise().query(query);
        console.log("Number of results:", rows[0].length);
        if (rows[0].length > 0) {
            console.log("First result:", rows[0][0]);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testSearch();
