const http = require('http');

http.get('http://localhost:3502/Requirement_Master/RunUpdateSQL/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Response:', data);
    const fs = require('fs');
    fs.writeFileSync('D:\\Afsal_projects\\neotronics\\neotronics_backend\\sql_trigger_result.txt', data);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
