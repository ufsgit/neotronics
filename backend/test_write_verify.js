const fs = require('fs');
fs.writeFileSync('test_output.txt', 'It works at ' + new Date().toISOString());
console.log('Written to file');
