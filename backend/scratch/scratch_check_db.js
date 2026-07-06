const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root123",
        database: "neo"
    });

    try {
        const [tables] = await connection.query("SHOW TABLES");
        console.log("Tables in neo:");
        console.log(tables.map(t => Object.values(t)[0]).join(", "));

        // To see recently modified tables, we can query information_schema
        const [info] = await connection.query(`
            SELECT TABLE_NAME, UPDATE_TIME, CREATE_TIME 
            FROM information_schema.tables 
            WHERE TABLE_SCHEMA = 'neo' 
            ORDER BY UPDATE_TIME DESC, CREATE_TIME DESC
            LIMIT 20
        `);
        console.log("\nRecently updated/created tables:");
        console.table(info);
    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
}
main();
