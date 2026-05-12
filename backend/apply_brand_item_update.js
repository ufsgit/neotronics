const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Read database configuration
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Create connection
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
});

// Read and execute SQL file
const sqlFile = path.join(__dirname, 'brand_item_db_update.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

console.log('Applying Brand Item database updates...');

connection.query(sql, (error, results) => {
    if (error) {
        console.error('Error applying database updates:', error);
        process.exit(1);
    }
    
    console.log('Brand Item database updates applied successfully!');
    console.log('- Added Item_Id and Item_Name columns to Brand table');
    console.log('- Updated Save_Brand stored procedure');
    console.log('- Updated Search_Brand stored procedure');
    
    connection.end();
});