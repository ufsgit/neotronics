const mysql = require('mysql2');

const passwords = ['root', 'root123', 'ufs@1234', '1234', 'password', ''];

async function testSingle(password) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: password
    });

    return new Promise((resolve) => {
        connection.connect((err) => {
            if (err) {
                resolve({ success: false, error: err.message });
            } else {
                connection.query("SHOW DATABASES", (err, rows) => {
                    connection.end();
                    if (err) {
                        resolve({ success: true, error: "Connected but failed to list DBs: " + err.message });
                    } else {
                        resolve({ success: true, dbs: rows.map(r => r.Database) });
                    }
                });
            }
        });
    });
}

async function run() {
    for (const p of passwords) {
        const result = await testSingle(p);
        if (result.success) {
            console.log(`WORKED WITH: [${p}]`);
            console.log("ALL DATABASES:");
            console.log(result.dbs.join(', '));
            const neotronicsDBs = result.dbs.filter(db => db.toLowerCase().includes('neotronics'));
            console.log("NEOTRONICS RELATED DBS:");
            console.log(neotronicsDBs.join(', '));
            process.exit(0);
        }
    }
    console.log("NO_PASSWORD_WORKED");
}

run();
