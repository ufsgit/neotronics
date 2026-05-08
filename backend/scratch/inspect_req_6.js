const db = require('../dbconnection');

async function testSearch() {
    try {
        const [rows] = await db.promise().query("SELECT * FROM requirementmaster WHERE RequirementMaster_Id = 6");
        console.log("Master 6:", rows[0]);
        
        const [dRows] = await db.promise().query("SELECT * FROM requirementdetails WHERE RequirementMaster_Id = 6");
        console.log("Details 6:", dRows[0]);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testSearch();
