const mysql = require('mysql2');

const passwords = ['root', 'root123', 'ufs@1234', '1234', 'password', ''];

async function testPasswords() {
    for (const password of passwords) {
        console.log(`Testing password: "${password}"...`);
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: password
        });

        try {
            await new Promise((resolve, reject) => {
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            console.log(`SUCCESS: Password "${password}" works!`);
            
            // If success, list databases
            const [rows] = await connection.promise().query("SHOW DATABASES");
            console.log("Databases found:", rows.map(r => r.Database).join(', '));

            connection.end();
            return;
        } catch (err) {
            console.log(`FAILED: Password "${password}" failed with error: ${err.message}`);
        }
    }
    console.log("None of the passwords worked.");
}

testPasswords();
