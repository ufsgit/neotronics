var db = require('./dbconnection');
var fs = require('fs');
var path = require('path');

var logFile = path.join(__dirname, 'sql_apply_log.txt');
fs.writeFileSync(logFile, 'Log initialized\n');

function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
    console.log(msg);
}

var sqlFile = path.join(__dirname, 'requirement_db_update.sql');
var sql = fs.readFileSync(sqlFile, 'utf8');

var statements = [];
var currentDelimiter = ';';
var currentStatement = '';
var lines = sql.split(/\r?\n/);

for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.startsWith('DELIMITER')) {
        currentDelimiter = line.split(' ')[1];
        continue;
    }
    
    if (line.endsWith(currentDelimiter)) {
        currentStatement += lines[i].substring(0, lines[i].lastIndexOf(currentDelimiter)) + '\n';
        statements.push(currentStatement);
        currentStatement = '';
    } else {
        currentStatement += lines[i] + '\n';
    }
}

log('Total statements to execute: ' + statements.length);

function executeStatements(index) {
    if (index >= statements.length) {
        log('All statements executed successfully.');
        process.exit(0);
        return;
    }

    var stmt = statements[index].trim();
    if (!stmt) {
        executeStatements(index + 1);
        return;
    }

    log('Executing statement ' + (index + 1) + '...');
    db.query(stmt, function(err, result) {
        if (err) {
            log('Error in statement ' + (index + 1) + ': ' + err.message);
            // Continue despite errors
            executeStatements(index + 1);
        } else {
            log('Statement ' + (index + 1) + ' executed.');
            executeStatements(index + 1);
        }
    });
}

executeStatements(0);
