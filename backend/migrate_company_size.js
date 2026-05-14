/**
 * Database Migration Script
 * Adds Company_Size table and new columns to Lead table
 * Run once: node migrate_company_size.js
 */
const db = require('./dbconnection');

const queries = [
    // 1. Create Company_Size master table
    `CREATE TABLE IF NOT EXISTS Company_Size (
        Company_Size_Id INT AUTO_INCREMENT PRIMARY KEY,
        Company_Size_Name VARCHAR(255) NOT NULL,
        Description VARCHAR(500) DEFAULT NULL,
        DeleteStatus INT DEFAULT 0
    )`,

    // 2. Seed some default Company Size values (optional – safe to run multiple times as INSERT IGNORE)
    `INSERT IGNORE INTO Company_Size (Company_Size_Id, Company_Size_Name, Description, DeleteStatus) VALUES
        (1, '1-10 Employees',   'Small startup or micro business', 0),
        (2, '11-50 Employees',  'Small business', 0),
        (3, '51-200 Employees', 'Medium business', 0),
        (4, '201-500 Employees','Mid-size enterprise', 0),
        (5, '500+ Employees',   'Large enterprise', 0)`,

    // 3. Add Project_Name column to Lead table (safe: IF NOT EXISTS equivalent via IGNORE)
    `ALTER TABLE \`Lead\` ADD COLUMN IF NOT EXISTS Project_Name VARCHAR(255) DEFAULT NULL`,

    // 4. Add POC_Name column to Lead table
    `ALTER TABLE \`Lead\` ADD COLUMN IF NOT EXISTS POC_Name VARCHAR(255) DEFAULT NULL`,

    // 5. Add Company_Size_Id column to Lead table
    `ALTER TABLE \`Lead\` ADD COLUMN IF NOT EXISTS Company_Size_Id INT DEFAULT 0`
];

async function migrate() {
    const pool = db.promise();
    console.log('Running Company Size migration...');

    // Step 1 – Create Company_Size table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Company_Size (
            Company_Size_Id INT AUTO_INCREMENT PRIMARY KEY,
            Company_Size_Name VARCHAR(255) NOT NULL,
            Description VARCHAR(500) DEFAULT NULL,
            DeleteStatus INT DEFAULT 0
        )
    `);
    console.log('OK: Company_Size table ensured.');

    // Step 2 – Seed defaults
    await pool.query(`
        INSERT IGNORE INTO Company_Size (Company_Size_Id, Company_Size_Name, Description, DeleteStatus) VALUES
            (1, '1-10 Employees',    'Small startup or micro business', 0),
            (2, '11-50 Employees',   'Small business', 0),
            (3, '51-200 Employees',  'Medium business', 0),
            (4, '201-500 Employees', 'Mid-size enterprise', 0),
            (5, '500+ Employees',    'Large enterprise', 0)
    `);
    console.log('OK: Default Company Sizes seeded.');

    // Step 3 – Add columns to Lead table (compatible with MySQL 5.7+)
    const alterColumns = [
        { col: 'Project_Name',   def: 'VARCHAR(255) DEFAULT NULL' },
        { col: 'POC_Name',       def: 'VARCHAR(255) DEFAULT NULL' },
        { col: 'Company_Size_Id',def: 'INT DEFAULT 0' },
    ];

    for (const { col, def } of alterColumns) {
        try {
            await pool.query(`ALTER TABLE \`Lead\` ADD COLUMN \`${col}\` ${def}`);
            console.log(`OK: Column ${col} added to Lead table.`);
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.warn(`SKIP: Column ${col} already exists.`);
            } else {
                console.error(`Error adding ${col}:`, err.message);
            }
        }
    }

    console.log('Migration complete.');
    process.exit(0);
}

migrate();
