const db = require('./dbconnection').promise();
async function run() {
    try {
        await db.query("DROP PROCEDURE IF EXISTS Load_Company");
        await db.query(`
        CREATE PROCEDURE Load_Company()
        BEGIN
            Select * from Company_info where DeleteStatus=false ORDER BY Company_Id DESC; 
            select Client_Accounts_Id,Client_Accounts_Name,Client_Accounts_No,Address1,Address2 from client_accounts where Account_Group_Id in(4,5) and DeleteStatus=0;
        END
        `);
        console.log("Updated Load_Company SP");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
