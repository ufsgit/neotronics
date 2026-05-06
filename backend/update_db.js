var db = require('./dbconnection');
var fs = require('fs');
var path = require('path');

async function updateDatabase() {
    const pool = db.promise();
    var connection = await pool.getConnection();
    try {
        console.log('Connected to database.');
        const sqlFile = path.join(__dirname, 'requirement_db_update.sql');
        if (fs.existsSync(sqlFile)) {
            const sql = fs.readFileSync(sqlFile, 'utf8');
            
            const statements = [];
            let currentDelimiter = ';';
            let currentStatement = '';
            const lines = sql.split(/\r?\n/);
            
            for (let line of lines) {
                let trimmedLine = line.trim();
                if (!trimmedLine || trimmedLine.startsWith('--')) continue;

                if (trimmedLine.toUpperCase().startsWith('DELIMITER')) {
                    currentDelimiter = trimmedLine.split(/\s+/)[1];
                    continue;
                }

                if (trimmedLine.endsWith(currentDelimiter)) {
                    currentStatement += line.substring(0, line.lastIndexOf(currentDelimiter)) + '\n';
                    statements.push(currentStatement);
                    currentStatement = '';
                } else {
                    currentStatement += line + '\n';
                }
            }

            console.log(`Found ${statements.length} statements to execute.`);

            for (const stmt of statements) {
                if (stmt.trim()) {
                    try {
                        await connection.query(stmt);
                        process.stdout.write('.');
                    } catch (stmtErr) {
                        console.error('\nError executing SQL statement:', stmtErr.message);
                        // console.error('Statement:', stmt);
                    }
                }
            }
            console.log('\nDatabase update completed.');
        } else {
            console.error('File not found:', sqlFile);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

updateDatabase();
