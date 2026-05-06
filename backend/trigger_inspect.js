const http = require('http');
http.get('http://127.0.0.1:3502/Requirement_Master/InspectDB/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('SCHEMA_RESULT_START');
    console.log(data);
    console.log('SCHEMA_RESULT_END');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
