const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root123",
        database: "neo"
    });

    try {
        const [info] = await connection.query(`
            SELECT TABLE_NAME, CREATE_TIME 
            FROM information_schema.tables 
            WHERE TABLE_SCHEMA = 'neo' 
              AND CREATE_TIME >= '2026-07-04 11:00:00'
            ORDER BY CREATE_TIME DESC
        `);
        console.log("Tables created after 2026-07-04 11:00:00:");
        console.log(info.map(r => r.TABLE_NAME).join(", "));
    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
}
main();
