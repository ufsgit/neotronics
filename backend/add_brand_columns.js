const mysql = require('mysql2');
const fs = require('fs');

// Database connection using the same config as your app
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "root123",
    database: "neotronics_db"
});

console.log('Adding Item columns to Brand table...');

// Check if Item_Id column exists, if not add it
connection.query(`
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'neotronics_db' 
    AND TABLE_NAME = 'Brand' 
    AND COLUMN_NAME = 'Item_Id'
`, (error, results) => {
    if (error) {
        console.error('Error checking Item_Id column:', error.message);
        connection.end();
        return;
    }
    
    if (results.length === 0) {
        // Column doesn't exist, add it
        connection.query(`ALTER TABLE Brand ADD COLUMN Item_Id INT DEFAULT 0`, (error, results) => {
            if (error) {
                console.error('Error adding Item_Id column:', error.message);
            } else {
                console.log('✓ Item_Id column added successfully');
            }
            checkItemNameColumn();
        });
    } else {
        console.log('✓ Item_Id column already exists');
        checkItemNameColumn();
    }
});

function checkItemNameColumn() {
    // Check if Item_Name column exists, if not add it
    connection.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'neotronics_db' 
        AND TABLE_NAME = 'Brand' 
        AND COLUMN_NAME = 'Item_Name'
    `, (error, results) => {
        if (error) {
            console.error('Error checking Item_Name column:', error.message);
            connection.end();
            return;
        }
        
        if (results.length === 0) {
            // Column doesn't exist, add it
            connection.query(`ALTER TABLE Brand ADD COLUMN Item_Name VARCHAR(255) DEFAULT ''`, (error, results) => {
                if (error) {
                    console.error('Error adding Item_Name column:', error.message);
                } else {
                    console.log('✓ Item_Name column added successfully');
                }
                updateExistingRecords();
            });
        } else {
            console.log('✓ Item_Name column already exists');
            updateExistingRecords();
        }
    });
}

function updateExistingRecords() {
    // Update existing records to have default values
    connection.query(`
        UPDATE Brand 
        SET Item_Id = COALESCE(Item_Id, 0), 
            Item_Name = COALESCE(Item_Name, '') 
        WHERE (Item_Id IS NULL OR Item_Name IS NULL OR Item_Name = '')
    `, (error, results) => {
        if (error) {
            console.error('Error updating existing records:', error.message);
        } else {
            console.log('✓ Existing records updated with default values');
            console.log('Database update completed successfully!');
        }
        
        connection.end();
    });
}