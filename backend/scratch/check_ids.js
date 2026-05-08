const db = require('../dbconnection');

async function testSearch() {
    try {
        const [rows] = await db.promise().query("SELECT RequirementMaster_Id FROM requirementmaster");
        console.log("Master IDs:", rows.map(r => r.RequirementMaster_Id));
        
        const [dRows] = await db.promise().query("SELECT RequirementMaster_Id FROM requirementdetails");
        console.log("Details Master IDs:", dRows.map(r => r.RequirementMaster_Id));

        const [cRows] = await db.promise().query("SELECT Client_Accounts_Id FROM client_accounts");
        console.log("Client Accounts IDs:", cRows.map(r => r.Client_Accounts_Id));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testSearch();
