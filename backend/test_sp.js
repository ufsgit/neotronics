const db = require('./dbconnection');

async function testProcedure() {
    try {
        const [rows] = await db.promise().query("CALL Save_User_Details(0,'test','pass',1,'[]',1,'Working',1,1,0,'test@test.com','123')");
        console.log("✅ Success: Procedure called with 12 params. Result:", rows[0]);
    } catch (error) {
        console.error("❌ Error calling procedure:", error.message);
    }
    process.exit(0);
}

testProcedure();
