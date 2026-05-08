const db = require("../dbconnection");
const pool = db.promise();

async function test() {
    const conn = await pool.getConnection();
    console.log("Promise Connection keys:", Object.keys(conn));
    console.log("Underlying connection:", conn.connection ? "exists" : "missing");
    conn.release();
    process.exit(0);
}

test().catch(err => {
    console.error(err);
    process.exit(1);
});
