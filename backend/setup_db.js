const db = require('./dbconnection');

const queries = [
    `CREATE TABLE IF NOT EXISTS User_Role (
        User_Role_Id INT AUTO_INCREMENT PRIMARY KEY,
        User_Role_Name VARCHAR(255) NOT NULL,
        User_Type_Id INT DEFAULT 1,
        Working_Status_Id INT DEFAULT 1,
        DeleteStatus INT DEFAULT 0
    );`
];

async function setup() {
    for (const query of queries) {
        try {
            await db.promise().query(query);
            console.log('Database setup successful for User_Role');
        } catch (err) {
            console.error('Database setup error:', err);
        }
    }
    process.exit();
}

setup();
