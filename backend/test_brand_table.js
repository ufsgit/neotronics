const mysql = require('mysql2');

// Database connection using the same config as your app
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "root123",
    database: "neotronics_db"
});

console.log('Testing Brand table structure and queries...');

// Test 1: Check table structure
connection.query(`DESCRIBE Brand`, (error, results) => {
    if (error) {
        console.error('Error describing Brand table:', error.message);
    } else {
        console.log('✓ Brand table structure:');
        results.forEach(column => {
            console.log(`  - ${column.Field}: ${column.Type} (${column.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });
    }
    
    // Test 2: Test search query
    connection.query(`
        SELECT Brand_Id, Brand_Name, COALESCE(Item_Id, 0) as Item_Id, COALESCE(Item_Name, '') as Item_Name 
        FROM Brand 
        WHERE DeleteStatus = 0 
        ORDER BY Brand_Name 
        LIMIT 5
    `, (error, results) => {
        if (error) {
            console.error('Error in search query:', error.message);
        } else {
            console.log('✓ Search query test results:');
            console.log(results);
        }
        
        // Test 3: Test stored procedure
        connection.query(`CALL Save_Brand(0, 'TEST_BRAND')`, (error, results) => {
            if (error) {
                console.error('Error testing Save_Brand procedure:', error.message);
            } else {
                console.log('✓ Save_Brand procedure test results:');
                console.log(results);
                
                // Clean up test data
                if (results && results[0] && results[0][0] && results[0][0].Brand_Id_ > 0) {
                    const testId = results[0][0].Brand_Id_;
                    connection.query(`DELETE FROM Brand WHERE Brand_Id = ?`, [testId], (error) => {
                        if (error) {
                            console.log('Note: Could not clean up test data');
                        } else {
                            console.log('✓ Test data cleaned up');
                        }
                        connection.end();
                    });
                } else {
                    connection.end();
                }
            }
        });
    });
});